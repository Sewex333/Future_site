const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // firebase-admin
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


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
    sessionId: sessionId.toString(),
    orderId: parseInt(orderId),
    amount: parseInt(amount),
    currency: currency.toString(),
    crc: crc.trim()
  };

  const jsonString = JSON.stringify(obj)
    .replace(/\\\//g, '/')
    .replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });

  return crypto.createHash('sha384').update(jsonString).digest('hex');
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
    urlStatus: 'https://da0d049f74f9.ngrok-free.app/api/p24/verify', // Użyj pełnego URL z ngrok
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

    // Verification payload
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
      sessionId: notification.sessionId,
      amount: Number(notification.amount),
      currency: notification.currency,
      orderId: Number(notification.orderId),
      sign: verifySign
    };

    const verifyResponse = await axios.post(
      'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
      verifyPayload,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (verifyResponse.data?.data?.status === 'success') {
      console.log('✅ Płatność potwierdzona!');
      return res.status(200).send('OK');
    } else {
      console.error('❌ Weryfikacja P24 nie powiodła się:', verifyResponse.data);
      return res.status(400).send('Verification failed');
    }
  } catch (error) {
    console.error('Błąd weryfikacji webhooka P24:', error);
    return res.status(500).send('Internal server error');
  }
});


app.get('/api/p24/payment-result', async (req, res) => {
  const { sessionId } = req.query;


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
  res.status(200).json({ message: 'Połączenie z bazą danych działa' });
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Backend działa na porcie ${PORT}`);
});