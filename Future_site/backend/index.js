const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // firebase-admin
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// const testSign = generateVerifySign(
//   "test_1752320945654",
//   1016459,
//   4000,
//   "PLN",
//   "68d4e143c5b70534"
// );
// console.log('Test SIGN:', testSign);

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

  console.log('\n🔐 [SIGN for /pay]');
  console.log('Input JSON:', jsonString);
  console.log('Generated SIGN:', hash, '\n');

  return hash;
}



function generateVerifySign(notificationData, crc) {
  const obj = {
    merchantId: Number(notificationData.merchantId),
    posId: Number(notificationData.posId),
    sessionId: notificationData.sessionId,
    amount: Number(notificationData.amount),
    originAmount: Number(notificationData.originAmount),
    currency: notificationData.currency,
    orderId: Number(notificationData.orderId),
    methodId: Number(notificationData.methodId),
    statement: notificationData.statement,
    crc: crc.trim()
  };

  const jsonString = JSON.stringify(obj);
  const hash = crypto.createHash('sha384').update(jsonString).digest('hex');

  console.log('\n🛡️ [SIGN for /verify]');
  console.log('Input JSON:', jsonString);
  console.log('Generated SIGN:', hash, '\n');

  return hash;
}


//JEBANA PLATNOSC

app.post('/api/p24/pay', async (req, res) => {
  const { price, description = "Default description", email = "test@test.pl", productId, productName } = req.body;
  
  if (!price || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  const sessionId = `test_${Date.now()}`;
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

  // Zapisz płatność do Firestore przed wysłaniem do P24
  try {
    const paymentRef = db.collection('payments').doc(sessionId);
    await paymentRef.set({
      sessionId,
      amount: amount / 100, // zapisz w złotówkach
      currency,
      description,
      email,
      productId,
      productName,
      status: 'pending', // początkowy status
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving payment to Firestore:', error);
    return res.status(500).json({ error: 'Failed to save payment data' });
  }

  const payload = {
    merchantId: parseInt(process.env.P24_MERCHANT_ID),
    posId: parseInt(process.env.P24_POS_ID),
    sessionId,
    amount,
    currency,
    description,
    email,
    country: "PL",
    urlStatus: 'https://ec2e4c1c9761.ngrok-free.app/api/p24/verify', // Użyj pełnego URL z ngrok
    urlReturn: 'http://localhost:5173/payment/status?sessionId=' + sessionId,
    sign
  };

  console.log('Final payload:', payload);

 try {
    const response = await axios.post(
      'https://sandbox.przelewy24.pl/api/v1/transaction/register',
      payload,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.responseCode === 0 && response.data.data.token) {
      res.json({ url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}` });
    } else {
      res.status(500).json({ error: 'Invalid response from payment gateway' });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      error: 'Payment error',
      details: error.response?.data || error.message 
    });
  }
});

app.post('/api/p24/verify', async (req, res) => {
  console.log('Received verification request:', req.body);
  
  const notificationData = req.body;
  const crc = process.env.P24_CRC;

  // Generuj podpis
  const localSign = generateVerifySign(notificationData, crc);

  console.log('Signature verification:');
  console.log('- Received:', notificationData.sign);
  console.log('- Generated:', localSign);
  console.log('- Match:', localSign === notificationData.sign);

  if (localSign !== notificationData.sign) {
    console.error('Signature mismatch!');
    return res.status(400).send('Invalid signature');
  }

  let originalPayment;
  try {
    const paymentRef = db.collection('payments').doc(notificationData.sessionId);
    const doc = await paymentRef.get();
    
    if (!doc.exists) {
      console.error('Original payment not found');
      return res.status(400).send('Payment not found');
    }
    
    originalPayment = doc.data();
  } catch (error) {
    console.error('Error fetching payment:', error);
    return res.status(500).send('Database error');
  }

  // 3. Prepare verification payload with ALL required fields
  const verifyPayload = {
    merchantId: parseInt(process.env.P24_MERCHANT_ID),
    posId: parseInt(process.env.P24_POS_ID),
    sessionId: notificationData.sessionId,
    amount: parseInt(notificationData.amount),
    originAmount: parseInt(notificationData.originAmount),
    currency: notificationData.currency,
    orderId: parseInt(notificationData.orderId),
    methodId: parseInt(notificationData.methodId),       // dodaj
    statement: notificationData.statement,               // dodaj
    sign: localSign,
    description: originalPayment.description || 'Default description',
    email: originalPayment.email || 'test@test.pl'
  };
  console.log('Full verification payload:', verifyPayload);

  // 4. Send verification request
  try {
    const verifyResponse = await axios.post(
      'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
      verifyPayload,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('Verification response:', verifyResponse.data);

    // 5. Update payment status
    if (verifyResponse.data.data?.status === 'success') {
      await paymentRef.update({
        status: 'completed',
        orderId: notificationData.orderId,
        verifiedAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('✅ Payment verified successfully');
      return res.status(200).send('OK');
    } else {
      console.error('Verification failed:', verifyResponse.data);
      return res.status(400).send('Verification failed');
    }
  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      },
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        headers: error.config?.headers
      }
    });
    
    return res.status(500).send('Verification error');
  }
});
app.get('/api/p24/payment-result', async (req, res) => {
  const { sessionId } = req.query;
  console.log('Sprawdzanie statusu dla sessionId:', sessionId); // 👈 Loguj ID


  try {
    const paymentRef = db.collection('payments').doc(sessionId);
    const doc = await paymentRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Payment not found' 
      });
    }
    
    const paymentData = doc.data();
    // console.log('Dane z Firestore:', paymentData); // 👈 Pokazuje aktualny status

    if (paymentData.status === 'completed') {
      res.json({ 
        status: 'success',
        message: 'Płatność zakończona pomyślnie! Dziękujemy za zakupy.',
        sessionId,
        paymentData
      });
    } else {
      res.json({ 
        status: 'pending',
        message: 'Oczekiwanie na potwierdzenie płatności...',
        sessionId,
        paymentData
      });
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Wystąpił błąd podczas weryfikacji płatności.',
      sessionId,
    });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const snapshot = await db.collection('shopItems').get(); // firebase-admin syntax
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.get('/api/obozy', async (req, res) => {
    try {
    const snapshot = await db.collection('camps').get(); // firebase-admin syntax
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
})

app.get('/api/events', async (req, res) => {
  try {
    const snapshot = await db.collection('eventy').get(); // Zwróć uwagę na nazwę kolekcji
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nazwa: data.nazwa || 'Brak nazwy', // Mapowanie niestandardowych pól
        kategoria: data.kategoria || 'Inne',
        opis: data.opis || '',
        data: data.data || '',
        miejsce: data.miejsce || '',
        uczestnicy: data.uczestnicy || '',
        nagrody: data.nagrody || '',
        features: data.faktura || [], // To pole wydaje się być tablicą
        cena: data.cena || data.cens || 'Brak ceny',
        dostepny: data.dostepny || false, // Uwaga na polskie znaki
        ikona: data.ikona || '⚽'
      };
    });
    res.json(events);
  } catch (error) {
    console.error('Błąd pobierania eventów:', error);
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
    console.error('Błąd pobierania ofert:', error);
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
    
    aktualnosci.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    res.json(aktualnosci);
  } catch (error) {
    console.error('Błąd pobierania aktualności:', error);
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
    console.error('Błąd pobierania partnerów:', error);
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
    
    ebooki.sort((a, b) => a.kolejnosc - b.kolejnosc);
    
    res.json(ebooki);
  } catch (error) {
    console.error('Błąd pobierania e-booków:', error);
    res.status(500).json({ error: 'Błąd pobierania e-booków' });
  }
});

app.get('/api/test-connection', (req, res) => {
    res.status(200).json({"message" : "polaczenie z db dziala"});
})

app.listen(8000, () => {
  console.log('✅ Backend działa na porcie 8000');
});