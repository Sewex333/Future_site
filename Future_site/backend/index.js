const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // firebase-admin
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// Istniejące endpointy GET (bez zmian)

function generateSign(sessionId, merchantId, amount, currency, crc) {
  const obj = {
    sessionId: sessionId,
    merchantId: Number(merchantId),
    amount: Number(amount),
    currency: currency,
    crc: crc.trim()
  };

  const jsonString = JSON.stringify(obj);
  const hash = crypto.createHash('sha384').update(jsonString).digest('hex');

  return hash;
}

function generateP24Sign(data, crc) {
  const signString =
    data.merchantId.toString() +
    data.posId.toString() +
    data.sessionId +
    data.amount.toString() +
    data.originAmount.toString() +
    data.currency +
    data.orderId.toString() +
    data.methodId.toString() +
    data.statement +
    crc.trim();

  return crypto.createHash('sha384').update(signString).digest('hex');
}

function generateWebhookSignFromJson(data, crc) {
  const payload = {
    merchantId: Number(data.merchantId),
    posId: Number(data.posId),
    sessionId: data.sessionId,
    amount: Number(data.amount),
    originAmount: Number(data.originAmount || 0),
    currency: data.currency,
    orderId: Number(data.orderId),
    methodId: Number(data.methodId),
    statement: data.statement,
    crc: crc.trim()
  };

  const jsonStr = JSON.stringify(payload)
    .replace(/\\\//g, '/') // JSON_UNESCAPED_SLASHES
    // .replace(/[\u007f-\uffff]/g, c => '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)); // optional

  return crypto.createHash('sha384').update(jsonStr).digest('hex');
}

function generateVerifySign(sessionId, orderId, amount, currency, crc) {
  const obj = {
    sessionId: String(sessionId),
    orderId: Number(orderId),
    amount: Number(amount),
    currency: String(currency),
    crc: String(crc).trim()
  };
  const jsonString = JSON.stringify(obj);
  console.log('Verify sign input:', obj);
  console.log('Verify sign JSON:', jsonString);
  return crypto.createHash('sha384').update(jsonString).digest('hex');
}

//JEBANA PLATNOSC

app.post('/api/p24/pay', async (req, res) => {
  const price = req.body.price || 0;
const description = req.body.description || '';
const email = req.body.email || '';
const productId = req.body.productId || '';
const productName = req.body.productName || '';
const orderId = req.body.orderId || '';
  
  console.log('Received payment request:', { price, description, email, productId, productName, orderId });
  
  if (!price || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  const sessionId = `order_${orderId}_${Date.now()}`;
  const amount = Math.round(parseFloat(price) * 100);
  const currency = 'PLN';
  const crc = process.env.P24_CRC;

  const sign = generateSign(
    sessionId,
    process.env.P24_MERCHANT_ID,
    amount,
    currency,
    crc
  );

  try {
    // Sprawdź czy zamówienie istnieje
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();

    // Zapisz płatność do Firestore
    console.log('Saving payment to Firestore...');
    const paymentRef = db.collection('payments').doc(sessionId);
    await paymentRef.set({
      sessionId,
      amount: amount / 100, // zapisz w złotówkach
      currency,
      description,
      email,
      productId,
      productName,
      orderId,
      customerData: orderData.customerData, // Dodaj dane klienta do płatności
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Payment saved to Firestore successfully');

    // Zaktualizuj zamówienie z sessionId
    await orderRef.update({
      sessionId,
      paymentStatus: 'processing',
      updatedAt: new Date()
    });
    console.log('Order updated with sessionId');

    const payload = {
      merchantId: parseInt(process.env.P24_MERCHANT_ID),
      posId: parseInt(process.env.P24_POS_ID),
      sessionId,
      amount,
      currency,
      description,
      email,
      country: "PL",
      urlStatus: `${process.env.BASE_URL || 'https://future.szczecin.pl'}/api/p24/verify`,
      urlReturn: `${process.env.BASE_URL || 'https://future.szczecin.pl'}/payment/status?sessionId=${sessionId}`,
      sign
    };

    console.log('Final payload:', payload);

    const response = await axios.post(
      'https://secure.przelewy24.pl/api/v1/transaction/register',
      payload,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Przelewy24 response:', response.data);

    if (response.data && response.data.responseCode === 0 && response.data.data.token) {
      res.json({ url: `https://secure.przelewy24.pl/trnRequest/${response.data.data.token}` });
    } else {
      console.error('Invalid response from Przelewy24:', response.data);
      
      // Oznacz płatność jako failed
      await paymentRef.update({
        status: 'failed',
        errorDetails: response.data,
        updatedAt: new Date()
      });

      // Zaktualizuj status zamówienia
      await orderRef.update({
        paymentStatus: 'failed',
        updatedAt: new Date()
      });

      res.status(500).json({ error: 'Invalid response from payment gateway', details: response.data });
    }
  } catch (error) {
    console.error('Payment error:', error.message, error.response?.data);
    
    // Oznacz płatność jako failed jeśli istnieje
    try {
      const paymentRef = db.collection('payments').doc(sessionId);
      const paymentDoc = await paymentRef.get();
      if (paymentDoc.exists) {
        await paymentRef.update({
          status: 'failed',
          errorDetails: error.message,
          updatedAt: new Date()
        });
      }

      // Zaktualizuj status zamówienia
      if (orderId) {
        const orderRef = db.collection('orders').doc(orderId);
        await orderRef.update({
          paymentStatus: 'failed',
          updatedAt: new Date()
        });
      }
    } catch (updateError) {
      console.error('Error updating failure status:', updateError);
    }

    res.status(500).json({ 
      error: 'Payment error',
      details: error.response?.data || error.message 
    });
  }
}); 
app.post('/api/p24/verify', async (req, res) => {
  const notification = req.body;
  const crc = process.env.P24_CRC;

  try {
    const expectedSign = generateWebhookSignFromJson(notification, crc);

    console.log('NOTYFIKACJA:', notification);
    console.log('Wygenerowany sign:', expectedSign);
    console.log('Otrzymany sign:', notification.sign);

    if (expectedSign !== notification.sign) {
      console.error('❌ Nieprawidłowy podpis w notyfikacji!');
      return res.status(403).send('Invalid signature');
    }

    const verifySign = generateVerifySign(
      notification.sessionId,
      notification.orderId,
      notification.amount,
      notification.currency,
      crc
    );

    const verifyPayload = {
      merchantId: Number(notification.merchantId),
      posId: Number(notification.posId),
      sessionId: String(notification.sessionId),
      amount: Number(notification.amount),
      currency: String(notification.currency),
      orderId: Number(notification.orderId),
      sign: verifySign
    };

    console.log('Verify payload:', verifyPayload);

    const verifyResponse = await axios.put(
      'https://secure.przelewy24.pl/api/v1/transaction/verify',
      verifyPayload,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Verify response:', verifyResponse.data);

    if (verifyResponse.data?.data?.status === 'success') {
      // Aktualizuj status płatności na success
      const paymentRef = db.collection('payments').doc(notification.sessionId);
      await paymentRef.update({
        status: 'success',
        updatedAt: new Date(),
        p24OrderId: notification.orderId,
        methodId: notification.methodId,
        statement: notification.statement,
        verifiedAt: new Date()
      });

      // Pobierz dane płatności, żeby znaleźć powiązane zamówienie
      const paymentDoc = await paymentRef.get();
      if (paymentDoc.exists) {
        const paymentData = paymentDoc.data();
        
        // Jeśli płatność ma powiązane zamówienie, zaktualizuj jego status
        if (paymentData.orderId) {
          const orderRef = db.collection('orders').doc(paymentData.orderId);
          await orderRef.update({
            orderStatus: 'success',
            paymentStatus: 'success',
            updatedAt: new Date(),
            completedAt: new Date(),
            p24OrderId: notification.orderId
          });
          console.log('✅ Zamówienie zaktualizowane na success!');
        }
      }

      console.log('✅ Płatność potwierdzona!');
      return res.status(200).send('OK');
    } else {
      console.error('❌ Weryfikacja P24 nie powiodła się:', verifyResponse.data);
      
      // Aktualizuj status płatności na failed
      const paymentRef = db.collection('payments').doc(notification.sessionId);
      await paymentRef.update({
        status: 'failed',
        updatedAt: new Date(),
        verificationError: verifyResponse.data
      });

      // Pobierz dane płatności i zaktualizuj zamówienie
      const paymentDoc = await paymentRef.get();
      if (paymentDoc.exists) {
        const paymentData = paymentDoc.data();
        if (paymentData.orderId) {
          const orderRef = db.collection('orders').doc(paymentData.orderId);
          await orderRef.update({
            orderStatus: 'failed',
            paymentStatus: 'failed',
            updatedAt: new Date()
          });
        }
      }

      return res.status(400).send('Verification failed');
    }
  } catch (error) {
    console.error('Błąd weryfikacji webhooka P24:', error.message, error.response?.data);
    
    // Oznacz płatność jako failed w przypadku błędu
    try {
      const paymentRef = db.collection('payments').doc(notification.sessionId);
      await paymentRef.update({
        status: 'failed',
        updatedAt: new Date(),
        errorDetails: error.message
      });
    } catch (updateError) {
      console.error('Error updating payment status on verification error:', updateError);
    }

    return res.status(500).send('Internal server error');
  }
});
app.get('/api/p24/payment-result', async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ status: 'error', message: 'Session ID is required.' });
  }

  try {
    const paymentRef = db.collection('payments').doc(sessionId);
    const paymentDoc = await paymentRef.get();

    if (!paymentDoc.exists) {
      console.warn('Payment result requested for non-existent session:', sessionId);
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found for this session.',
      });
    }

    const paymentData = paymentDoc.data();
    console.log('Payment Data from Firestore for sessionId', sessionId, ':', paymentData);

    // Pobierz także dane zamówienia jeśli istnieje
    let orderData = null;
    if (paymentData.orderId) {
      const orderRef = db.collection('orders').doc(paymentData.orderId);
      const orderDoc = await orderRef.get();
      if (orderDoc.exists) {
        orderData = orderDoc.data();
      }
    }

    if (paymentData.status === 'success') {
      res.json({
        status: 'success',
        message: 'Płatność zakończona pomyślnie! Dziękujemy za zakupy.',
        sessionId,
        paymentData,
        orderData
      });
    } else if (paymentData.status === 'pending' || paymentData.status === 'processing') {
      res.json({
        status: 'pending',
        message: 'Oczekiwanie na potwierdzenie płatności...',
        sessionId,
        paymentData,
        orderData
      });
    } else {
      res.json({
        status: 'failed',
        message: 'Płatność nie powiodła się lub została anulowana.',
        sessionId,
        paymentData,
        orderData
      });
    }
  } catch (error) {
    console.error('Error fetching payment result:', error);
    res.status(500).json({
      status: 'error',
      message: 'Wystąpił błąd podczas weryfikacji statusu płatności.',
      sessionId,
      details: error.message
    });
  }
});

app.get('/api/p24/test-access', async (req, res) => {
  try {
    const response = await axios.get(
      process.env.P24_SANDBOX === 'true'
        ? 'https://sandbox.przelewy24.pl/api/v1/testAccess'
        : 'https://secure.przelewy24.pl/api/v1/testAccess',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Test access response:', response.data);
    res.status(200).json({
      status: 'success',
      data: response.data,
      message: 'Połączenie z API Przelewy24 działa poprawnie',
    });
  } catch (error) {
    console.error('Test access error:', error.message, error.response?.data);
    res.status(error.response?.status || 500).json({
      status: 'error',
      message: 'Błąd podczas testowania połączenia z API Przelewy24',
      details: error.response?.data || error.message,
    });
  }
});

app.post('/api/p24/checkout', async (req, res) => {
  const { firstName, lastName, email, address, postalCode, city, phone, productId, productName, price } = req.body;
  
  console.log('Received checkout data:', {
    firstName,
    lastName,
    email,
    address,
    postalCode,
    city,
    phone,
    productId,
    productName,
    price
  });

  try {
    // Zapisz zamówienie do Firestore
    const orderRef = db.collection('orders').doc(); // Automatycznie generuje ID
    const orderId = orderRef.id;
    
    await orderRef.set({
      orderId,
      customerData: {
        firstName,
        lastName,
        email,
        address,
        postalCode,
        city,
        phone
      },
      productData: {
        productId,
        productName,
        price: parseFloat(price)
      },
      orderStatus: 'pending', // początkowy status zamówienia
      paymentStatus: 'pending', // początkowy status płatności
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Order saved to Firestore with ID:', orderId);
    
    res.status(200).json({ 
      message: 'Checkout data received and saved successfully',
      orderId: orderId
    });
  } catch (error) {
    console.error('Error processing checkout data:', error);
    res.status(500).json({ error: 'Failed to process checkout data' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const snapshot = await db.collection('shopItems').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error(`Błąd pobierania produktów: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.get('/api/obozy', async (req, res) => {
  try {
    const snapshot = await db.collection('camps').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error(`Błąd pobierania obozów: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const snapshot = await db.collection('eventy').get();
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nazwa: data.nazwa || 'Brak nazwy',
        kategoria: data.kategoria || 'Inne',
        opis: data.opis || '',
        data: data.data || '',
        miejsce: data.miejsce || '',
        uczestnicy: data.uczestnicy || '',
        nagrody: data.nagrody || '',
        features: data.faktura || [], // Poprawiono z "faktura" na "features", jeśli to błąd w bazie to zmień nazwę
        cena: data.cena || data.cens || 'Brak ceny',
        dostepny: data.dostepny || false,
        ikona: data.ikona || '⚽'
      };
    });
    res.json(events);
  } catch (error) {
    console.error(`Błąd pobierania eventów: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania eventów' });
  }
});

app.get('/api/oferty', async (req, res) => {
  try {
    const snapshot = await db.collection('oferty').get();
    const oferty = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nazwa: data.nazwa || 'Brak nazwy',
        opis: data.opis || '',
        cena: data.cena || 'Brak ceny',
        czas: data.czas || '',
        poziom: data.poziom || '',
        ikona: data.ikona || '⚽',
        typ: data.typ || 'inne',
        link: data.link || '/',
        features: data.features || [],
        kolor: data.kolor || 'from-gray-500 to-gray-600',
        dostepny: data.dostepny !== undefined ? data.dostepny : true
      };
    });
    res.json(oferty);
  } catch (error) {
    console.error(`Błąd pobierania ofert: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania ofert' });
  }
});

app.get('/api/aktualnosci', async (req, res) => {
  try {
    const snapshot = await db.collection('aktualnosci').get();
    const aktualnosci = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        tytul: data.tytul || 'Brak tytułu',
        data: data.data || '',
        kategoria: data.kategoria || 'Inne',
        opis: data.opis || '',
        obrazek: data.obrazek || '📰',
        pelnyTekst: data.pelnyTekst || '',
        dostepny: data.dostepny !== undefined ? data.dostepny : true,
        wyrozniany: data.wyrozniany !== undefined ? data.wyrozniany : false
      };
    });

    // Sortowanie od najnowszych

    aktualnosci.sort((a, b) => new Date(b.data) - new Date(a.data));
    res.json(aktualnosci);
  } catch (error) {
    console.error(`Błąd pobierania aktualności: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania aktualności' });
  }
});

app.get('/api/partnerzy', async (req, res) => {
  try {
    const snapshot = await db.collection('partnerzy').get();
    const partnerzy = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nazwa: data.nazwa || 'Brak nazwy',
        opis: data.opis || '',
        kategoria: data.kategoria || 'Inne',
        image: data.image || '/default-partner.jpg',
        link: data.link || '#',
        typ: data.typ || 'partner',
        dostepny: data.dostepny !== undefined ? data.dostepny : true,
        opis_rozszerzony: data.opis_rozszerzony || data.opis || '',
        logo: data.logo || '',
        kolor_karty: data.kolor_karty || 'from-yellow-400 to-yellow-500'
      };
    });
    res.json(partnerzy);
  } catch (error) {
    console.error(`Błąd pobierania partnerów: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania partnerów' });
  }
});

app.get('/api/ebooki', async (req, res) => {
  try {
    const snapshot = await db.collection('ebooki').get();
    const ebooki = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        tytul: data.tytul || 'Brak tytułu',
        opis: data.opis || '',
        ikona: data.ikona || '📚',
        pdfPath: data.pdfPath || '',
        zawiera: data.zawiera || [],
        dostepny: data.dostepny !== undefined ? data.dostepny : true,
        kolejnosc: data.kolejnosc || 0
      };
    });

    // Sortowanie według pola 'kolejnosc'
    ebooki.sort((a, b) => a.kolejnosc - b.kolejnosc);
    res.json(ebooki);
  } catch (error) {
    console.error(`Błąd pobierania e-booków: ${error.message}`);
    res.status(500).json({ error: 'Błąd pobierania e-booków' });
  }
});

app.get('/api/test-connection', (req, res) => {
  res.status(200).json({ message: 'polaczenie z db dziala' });
});

// Nowe endpointy CRUD
const collections = ['aktualnosci', 'eventy', 'oferty', 'obozy', 'partnerzy', 'items'];

collections.forEach(collection => {
  // POST - Dodawanie
  app.post(`/api/${collection}`, async (req, res) => {
    try {
      const data = req.body;
      const docRef = await db.collection(collection).add(data);
      const addedDoc = await docRef.get();
      res.status(201).json({ id: docRef.id, ...addedDoc.data() });
    } catch (error) {
      console.error(`Błąd dodawania do ${collection}:`, error);
      res.status(500).json({ error: `Błąd dodawania do ${collection}` });
    }
  });

  // PUT - Edytowanie
  app.put(`/api/${collection}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await db.collection(collection).doc(id).set(data, { merge: true });
      const updatedDoc = await db.collection(collection).doc(id).get();
      res.json({ id, ...updatedDoc.data() });
    } catch (error) {
      console.error(`Błąd edycji ${collection}:`, error);
      res.status(500).json({ error: `Błąd edycji ${collection}` });
    }
  });

  // DELETE - Usuwanie
  app.delete(`/api/${collection}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = db.collection(collection).doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(404).json({ error: 'Dokument nie istnieje' });
      }
      await docRef.delete();
      res.status(200).json({ message: 'Dokument został usunięty' });
    } catch (error) {
      console.error(`Błąd usuwania z ${collection}:`, error);
      res.status(500).json({ error: `Wystąpił błąd podczas usuwania z ${collection}` });
    }
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Backend działa na porcie ${PORT}`);
});

