const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); 
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Funkcja do generowania podpisu dla rejestracji transakcji
function generateSign(sessionId, merchantId, amount, currency, crc) {
  if (!crc) throw new Error('Brak klucza CRC');
  const obj = {
    sessionId,
    merchantId: Number(merchantId),
    amount: Number(amount),
    currency,
    crc: crc.trim()
  };
  const jsonString = JSON.stringify(obj);
  console.log('JSON do podpisu rejestracji:', jsonString);
  return crypto.createHash('sha384').update(jsonString).digest('hex');
}

// Funkcja do generowania podpisu dla weryfikacji notyfikacji (trnVerify)
function generateVerifySign(notificationData, crc) {
  if (!crc) throw new Error('Brak klucza CRC');

  // Ręczne tworzenie stringu JSON w ustalonej kolejności
  const sessionId = notificationData.sessionId?.toString() || '';
  const orderId = Number(notificationData.orderId);
  const amount = Number(notificationData.amount);
  const currency = notificationData.currency?.toString() || '';
  const trimmedCrc = crc.trim();

  // Budujemy string JSON dokładnie w oczekiwanej kolejności kluczy
  // Ważne: Stringi w JSON muszą być w cudzysłowach, liczby nie (chyba że jako string).
  // Tutaj orderId i amount są liczbami, więc bez cudzysłowów.
  const jsonString = `{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"${currency}","crc":"${trimmedCrc}"}`;

  console.log('Ręcznie zbudowany JSON do podpisu weryfikacji:', jsonString);
  return crypto.createHash('sha384').update(jsonString).digest('hex');
}


app.post('/api/p24/checkout', async (req, res) => {
  const { firstName, lastName, email, address, postalCode, city, phone, productId, productName, price } = req.body;
  try {
    console.log('Otrzymane dane checkout:', req.body);
    // Tutaj możesz dodać logikę do zapisania danych zamówienia do bazy danych, jeśli potrzebujesz
    res.status(200).json({ message: 'Checkout data received successfully' });
  } catch (error) {
    console.error(`Błąd przetwarzania danych checkout: ${error.message}`);
    res.status(500).json({ error: 'Failed to process checkout data' });
  }
});

app.post('/api/p24/pay', async (req, res) => {
  const { price, description = "Default description", email = "test@test.pl", productId, productName } = req.body;

  if (!price || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid price' });
  }
  if (!productId || !productName) {
    return res.status(400).json({ error: 'Missing productId or productName' });
  }

  const sessionId = `test_${Date.now()}`;
  const amount = Math.round(parseFloat(price) * 100); // Kwota w groszach
  const currency = 'PLN';
  const crc = process.env.P24_CRC;

  if (!crc) {
    console.error('Brak klucza CRC w zmiennych środowiskowych');
    return res.status(500).json({ error: 'Brak klucza CRC' });
  }

  try {
    const sign = generateSign(sessionId, process.env.P24_MERCHANT_ID, amount, currency, crc);
    console.log('Podpis rejestracji:', sign);

    // Zapisz płatność do Firestore
    const paymentRef = db.collection('payments').doc(sessionId);
    await paymentRef.set({
      sessionId,
      amount: amount / 100, // Zapisz kwotę w PLN
      currency,
      email,
      productId,
      productName,
      status: 'pending', // Początkowy status
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const payload = {
      merchantId: parseInt(process.env.P24_MERCHANT_ID),
      posId: parseInt(process.env.P24_POS_ID),
      sessionId,
      amount,
      currency,
      description: description.substring(0, 1024), // Ograniczenie długości opisu
      email,
      country: 'PL',
      urlStatus: 'https://c9e37b0f1c41.ngrok-free.app/api/p24/verify', // Twój endpoint do weryfikacji
      urlReturn: `http://localhost:5173/payment/status?sessionId=${sessionId}`, // Adres powrotny dla klienta
      sign
    };

    console.log('Payload do rejestracji:', payload);

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

    if (response.data?.data?.token) {
      res.json({ url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}` });
    } else {
      console.error('Nieprawidłowa odpowiedź z Przelewy24:', response.data);
      res.status(500).json({ error: 'Invalid response from payment gateway' });
    }
  } catch (error) {
    console.error(`Błąd płatności: ${error.response?.data?.error || error.message}`);
    res.status(500).json({ 
      error: 'Payment error',
      details: error.response?.data?.error || error.message 
    });
  }
});



app.post('/api/p24/verify', async (req, res) => {
  const notificationData = req.body;
  const crc = process.env.P24_CRC;

  console.log('Otrzymane dane notifikacji:', notificationData);

  // Sprawdzenie, czy wszystkie wymagane pola są obecne w notyfikacji
  const requiredFields = ['sessionId', 'orderId', 'amount', 'currency', 'sign'];
  for (const field of requiredFields) {
    if (notificationData[field] === undefined || notificationData[field] === null) {
      console.error(`Brak lub puste pole w notyfikacji: ${field}`);
      return res.status(400).send(`Missing or empty field in notification: ${field}`);
    }
  }

  try {
    // Generuj podpis lokalnie używając poprawnej metody (ręcznie budowany JSON)
    const localSign = generateVerifySign(notificationData, crc);
    console.log('Wygenerowany podpis lokalny:', localSign);
    console.log('Otrzymany podpis z P24:', notificationData.sign);

    if (localSign !== notificationData.sign) {
      console.error('Nieprawidłowy podpis!');
      console.error('Oczekiwany:', localSign);
      console.error('Otrzymany:', notificationData.sign);
      return res.status(400).send('Invalid signature');
    }

    console.log('Podpis jest prawidłowy - kontynuujemy weryfikację');

    // Pobierz dane płatności z bazy danych Firebase
    const paymentRef = db.collection('payments').doc(notificationData.sessionId);
    const doc = await paymentRef.get();
    if (!doc.exists) {
      console.error('Płatność o danym sessionId nie znaleziona w bazie.');
      return res.status(400).send('Payment not found');
    }

    const originalPayment = doc.data(); // Dane oryginalnej płatności z bazy

    // Sprawdź, czy kwota i waluta zgadzają się z oryginalnym zamówieniem
    // Należy pamiętać, że amount z notyfikacji i z bazy jest w groszach.
    if (Number(notificationData.amount) !== Math.round(originalPayment.amount * 100) || 
        notificationData.currency !== originalPayment.currency) {
      console.error('Niezgodność kwoty lub waluty między notyfikacją a oryginalną płatnością.');
      return res.status(400).send('Amount or currency mismatch');
    }

    // Przygotuj dane do końcowej weryfikacji w P24 (API /transaction/verify)
    const verifyPayload = {
      merchantId: parseInt(process.env.P24_MERCHANT_ID),
      posId: parseInt(process.env.P24_POS_ID),
      sessionId: notificationData.sessionId,
      amount: parseInt(notificationData.amount),
      // originAmount to zazwyczaj to samo co amount w notyfikacji, ale warto użyć
      // tego co przyszło, jeśli Przelewy24 rozróżnia te pola.
      originAmount: parseInt(notificationData.originAmount) || parseInt(notificationData.amount), 
      currency: notificationData.currency,
      orderId: parseInt(notificationData.orderId),
      // Dla drugiego kroku weryfikacji (API /verify) P24 oczekuje podpisu z notyfikacji.
      sign: notificationData.sign 
    };

    console.log('Payload do weryfikacji (drugi krok):', verifyPayload);

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

    console.log('Odpowiedź weryfikacji (drugi krok):', verifyResponse.data);

    if (verifyResponse.data?.data?.status === 'success') {
      await paymentRef.update({
        status: 'completed',
        orderId: notificationData.orderId,
        verifiedAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Płatność ${notificationData.sessionId} zweryfikowana pomyślnie i zaktualizowana w bazie.`);
      return res.status(200).send('OK'); // Odpowiedz "OK" dla P24
    } else {
      console.error('Weryfikacja nieudana w drugim kroku:', verifyResponse.data);
      // Możesz zaktualizować status płatności na "failed" lub "error" w bazie
      await paymentRef.update({
        status: 'failed',
        failureReason: verifyResponse.data?.error || 'Verification failed at P24 API',
        updatedAt: new Date()
      });
      return res.status(400).send('Verification failed'); // Poinformuj P24 o niepowodzeniu
    }
  } catch (error) {
    console.error(`Błąd weryfikacji notyfikacji: ${error.response?.data || error.message}`);
    if (error.response?.data) {
      console.error('Szczegóły błędu z P24 API:', error.response.data);
    }
    // W przypadku błędu wewnętrznego serwera, poinformuj P24 o problemie
    return res.status(500).send('Internal server error during verification');
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
    console.error(`Błąd pobierania statusu płatności: ${error.message}`);
    res.status(500).json({ 
      status: 'error',
      message: 'Wystąpił błąd podczas weryfikacji płatności.',
      sessionId
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