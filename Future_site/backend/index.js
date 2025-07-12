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
    crc: crc
  };

  // JSON string bez escape unicode i slashes:
  const jsonString = JSON.stringify(obj);

  console.log('RAW SIGNATURE STRING JSON:', jsonString);
  return crypto.createHash('sha384').update(jsonString).digest('hex');
}

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
    res.status(200).json({ message: 'Checkout data received successfully' });
  } catch (error) {
    console.error('Error processing checkout data:', error);
    res.status(500).json({ error: 'Failed to process checkout data' });
  }
});

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
    urlStatus: 'https://f9a5e1d3c9d1.ngrok-free.app/api/p24/verify', // Użyj pełnego URL z ngrok
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
  console.log('=== OTRZYMANO ŻĄDANIE WERYFIKACJI ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  const { merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign } = req.body;
  
  console.log('Otrzymano żądanie weryfikacji:', req.body);
  // 1. Zweryfikuj podpis
  const crc = process.env.P24_CRC;
  const localSign = generateSign(
    sessionId,
    merchantId,
    amount,
    currency,
    crc
  );

  if (localSign !== sign) {
    console.error('Invalid signature');
    return res.status(400).send('Invalid signature');
  }

  // 2. Zaktualizuj status płatności w Firestore
  try {
    const paymentRef = db.collection('payments').doc(sessionId);
    await paymentRef.update({
      status: 'completed',
      orderId,
      methodId,
      statement,
      updatedAt: new Date()
    });
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).send('Error updating payment');
  }
});

app.get('/api/p24/payment-result', async (req, res) => {
  const { sessionId } = req.query;
  console.log('Sprawdzanie statusu dla sessionId:', sessionId);

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
    if (paymentData.status === 'completed') {
      res.json({ 
        status: 'success',
        message: 'Płatność zakończona pomyślnie! Dziękujemy za zakupy.',
        paymentData
      });
    } else {
      res.json({ 
        status: 'pending',
        message: 'Oczekiwanie na potwierdzenie płatności...',
        paymentData
      });
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Wystąpił błąd podczas weryfikacji płatności.' 
    });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const snapshot = await db.collection('shopItems').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.get('/api/obozy', async (req, res) => {
  try {
    const snapshot = await db.collection('camps').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
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
        features: data.faktura || [],
        cena: data.cena || data.cens || 'Brak ceny',
        dostepny: data.dostepny || false,
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
});

app.listen(8000, () => {
  console.log('✅ Backend działa na porcie 8000');
});