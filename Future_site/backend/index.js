const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // firebase-admin

const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/api/test-connection', (req, res) => {
    res.status(200).json({"message" : "polaczenie z db dziala"});
})

app.listen(8000, () => {
  console.log('✅ Backend działa na porcie 8000');
});