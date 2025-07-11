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

// console.log(generateSign());

function generateRegisterSign(payload, crc) {
  const toSign = [
    payload.sessionId,
    payload.merchantId.toString(),
    payload.price.toString(),
    payload.currency,
    crc
  ].join('|');
  
  console.log('FINAL SIGN STRING:', toSign);
  return crypto.createHash('sha384').update(toSign).digest('hex');
}

app.get('/api/p24/debug', (req, res) => {
  res.json({
    env: {
      P24_POS_ID: process.env.P24_POS_ID,
      P24_MERCHANT_ID: process.env.P24_MERCHANT_ID,
      P24_SECRET: process.env.P24_SECRET ? '***' + process.env.P24_SECRET.slice(-3) : 'undefined',
      P24_CRC: process.env.P24_CRC ? '***' + process.env.P24_CRC.slice(-3) : 'undefined'
    },
    authHeader: 'Basic ' + Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64')
  });
});
//test dostepu
app.get('/api/p24/test-access', async (req, res) => {
  const authHeader = 'Basic ' + Buffer.from(`${process.env.P24_POS_ID}:${process.env.P24_SECRET}`).toString('base64');
  console.log(authHeader)
  try {
    const response = await fetch('https://sandbox.przelewy24.pl/api/v1/testAccess', {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (response.ok) {
      res.json({ status: 'OK', data: json });
    } else {
      res.status(response.status).json({ status: 'Error', message: json });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
});

//JEBANA PLATNOSC

app.post('/api/p24/pay', async (req, res) => {
  const { price, description = "Default description", email = "test@test.pl" } = req.body;
  
  // blad
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


  const payload = {
    merchantId: parseInt(process.env.P24_MERCHANT_ID),
    posId: parseInt(process.env.P24_POS_ID),
    sessionId,
    amount,
    currency,
    description,
    email,
    country: "PL",
    urlReturn: process.env.P24_RETURN_URL || "http://localhost:5173/return",
    urlStatus: 'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
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

    console.log('Response from Przelewy24:', response.data);

    if (response.data && response.data.responseCode === 0 && response.data.data.token) {
      res.json({ url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}` });
    } else {
      res.status(500).json({ error: 'Invalid response from payment gateway' });
    }
  
} catch (error) {
  console.error('Full error:', {
    status: error.response?.status,
    data: error.response?.data,
    headers: error.response?.headers
  });
  res.status(500).json({ 
    error: 'Payment error',
    details: error.response?.data || error.message 
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