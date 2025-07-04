// uploadOffers.js - wersja z Firebase Admin SDK (zalecana)
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const account = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json');

const app = initializeApp({
  credential: cert(account),
});

const db = getFirestore();

const oferty = [
  {
    customId: 1, 
    nazwa: "Obozy Piłkarskie",
    opis: "Intensywne obozy treningowe w malowniczych lokalizacjach z profesjonalną opieką trenerską",
    cena: "od 800 zł",
    czas: "7-14 dni",
    poziom: "Wszystkie kategorie",
    ikona: "🏕️",
    typ: "oboz",
    link: "/obozy-i-polkolonie",
    features: [
      "3 treningi dziennie",
      "Mecze i turnieje",
      "Pełna opieka i wyżywienie",
      "Zajęcia rekreacyjne",
      "Certyfikat i pamiątki"
    ],
    kolor: "yellow-500",
    dostepny: true
  },
  {
    customId: 2,
    nazwa: "Eventy Sportowe",
    opis: "Różnorodne wydarzenia sportowe - turnieje, mecze charytatywne, kliniki treningowe",
    cena: "od 25 zł",
    czas: "Według harmonogramu",
    poziom: "Dla wszystkich",
    ikona: "🏆",
    typ: "event",
    link: "/eventy",
    features: [
      "Turnieje młodzieżowe",
      "Mecze charytatywne",
      "Kliniki z mistrzami",
      "Eventy korporacyjne",
      "Profesjonalna organizacja"
    ],
    kolor: "black",
    dostepny: true
  },
  {
    customId: 3,
    nazwa: "Treningi Indywidualne",
    opis: "Spersonalizowane sesje treningowe z analizą video i planem rozwoju",
    cena: "150 zł/sesja",
    czas: "90 minut",
    poziom: "Wszystkie kategorie",
    ikona: "🎯",
    typ: "trening_indywidualny",
    link: "/treningi-indywidualne",
    features: [
      "Analiza techniki indywidualnej",
      "Korekta błędów taktycznych",
      "Trening pozycyjny",
      "Analiza wideo z meczów",
      "Indywidualny plan rozwoju"
    ],
    kolor: "yellow-500",
    dostepny: true
  },
  {
    customId: 4,
    nazwa: "Treningi Mentalne",
    opis: "Budowanie charakteru zawodnika i radzenie sobie z presją meczową",
    cena: "120 zł/sesja",
    czas: "60 minut",
    poziom: "Wszyscy zawodnicy",
    ikona: "🧠",
    typ: "trening_mentalny",
    link: "/treningi-mentalne",
    features: [
      "Praca nad koncentracją",
      "Radzenie sobie z presją",
      "Budowanie pewności siebie",
      "Motywacja i cele sportowe",
      "Praca z psychologiem sportu"
    ],
    kolor: "black",
    dostepny: true
  },
  {
    customId: 5,
    nazwa: "Sklep Klubowy",
    opis: "Oficjalne stroje i akcesoria Future Football Club - wszystko czego potrzebujesz",
    cena: "od 25 zł",
    czas: "Dostępne 24/7",
    poziom: "Dla kibiców",
    ikona: "👕",
    typ: "sklep",
    link: "/sklep",
    features: [
      "Koszulki meczowe i treningowe",
      "Spodenki i getry klubowe",
      "Akcesoria kibiców",
      "Sprzęt treningowy",
      "Szybka dostawa"
    ],
    kolor: "yellow-500",
    dostepny: true
  },
  {
    customId: 6,
    nazwa: "E-booki i Materiały",
    opis: "Profesjonalne materiały treningowe, taktyczne i rozwojowe dla zawodników",
    cena: "od 15 zł",
    czas: "Dostęp natychmiastowy",
    poziom: "Wszyscy zawodnicy",
    ikona: "📚",
    typ: "ebook",
    link: "/ebooki-materialy",
    features: [
      "Materiały taktyczne",
      "Plany treningowe",
      "Porady od trenerów",
      "Analiza gry",
      "Rozwój mentalny"
    ],
    kolor: "black",
    dostepny: true
  },
  {
    customId: 7,
    nazwa: "Aktualności",
    opis: "Najnowsze informacje o klubie, zawodnikach i wydarzeniach sportowych",
    cena: "Bezpłatne",
    czas: "Codziennie",
    poziom: "Dla wszystkich",
    ikona: "📰",
    typ: "aktualnosci",
    link: "/aktualnosci",
    features: [
      "Aktualności klubowe",
      "Wyniki meczów",
      "Transfery zawodników",
      "Kalendarz wydarzeń",
      "Galeria zdjęć"
    ],
    kolor: "black",
    dostepny: true
  }
];

const uploadOffers = async () => {
  try {
    console.log('🚀 Rozpoczynam dodawanie ofert...');
    
    const testDoc = await db.collection('oferty').limit(1).get();
    console.log('✅ Połączenie z Firebase działa');

    const offersRef = db.collection('oferty');

    const existingDocs = await offersRef.get();
    if (!existingDocs.empty) {
      console.log(`🗑️ Usuwam ${existingDocs.size} istniejących ofert...`);
      const batch = db.batch();
      existingDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
    for (const oferta of oferty) {
      await offersRef.add(oferta);
      console.log(`✅ Dodano ofertę: ${oferta.nazwa}`);
    }

    console.log("🎉 Wszystkie oferty zostały pomyślnie dodane!");
    
    const finalCheck = await offersRef.get();
    console.log(`📊 Łącznie w bazie: ${finalCheck.size} ofert`);

  } catch (error) {
    console.error("❌ Błąd podczas dodawania ofert:", error);
    
    if (error.code) {
      console.error("Kod błędu:", error.code);
    }
    if (error.message) {
      console.error("Wiadomość:", error.message);
    }
    
    process.exit(1);
  }
};

uploadOffers();