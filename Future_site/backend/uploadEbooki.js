const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const account = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json');

const app = initializeApp({
  credential: cert(account),
});

const db = getFirestore();

const ebooki = [
  {
    customId: 1,
    tytul: "Sportowa Dieta – Co Jeść Przed i Po Treningu?",
    opis: "Dowiedz się, jak prawidłowe żywienie wpływa na Twoje wyniki sportowe. Poznaj sekrety diety, która zwiększy Twoją wydolność i przyspieszy regenerację.",
    ikona: "🥗",
    pdfPath: "/e_booki/sportowa_dieta.pdf",
    zawiera: [
      "Posiłki przed treningiem",
      "Regeneracja po wysiłku",
      "Suplementacja dla sportowców",
      "Przepisy na zdrowe przekąski",
      "Kalkulatory zapotrzebowania kalorycznego"
    ],
    dostepny: true,
    kolejnosc: 1
  },
  {
    customId: 2,
    tytul: "Jak przygotować się do pierwszego treningu",
    opis: "Kompletny przewodnik dla początkujących. Wszystko, co musisz wiedzieć przed swoim pierwszym treningiem piłkarskim.",
    ikona: "⚽",
    pdfPath: "/e_booki/pierwszy_trening.pdf",
    zawiera: [
      "Niezbędny sprzęt sportowy",
      "Rozgrzewka krok po kroku",
      "Podstawowe zasady bezpieczeństwa",
      "Mentalne przygotowanie",
      "Co zabrać na pierwszy trening"
    ],
    dostepny: true,
    kolejnosc: 2
  },
  {
    customId: 3,
    tytul: "Przewodnik Rodzica Młodego Sportowca",
    opis: "Praktyczne wskazówki dla rodziców, jak wspierać dziecko w sportowej karierze. Poznaj najczęstsze błędy i jak ich uniknąć.",
    ikona: "👨‍👩‍👧‍👦",
    pdfPath: "/e_booki/przewodnik_rodzica.pdf",
    zawiera: [
      "Wsparcie psychiczne dziecka",
      "Balans między sportem a nauką",
      "Komunikacja z trenerem",
      "Zdrowa konkurencja",
      "Jak radzić sobie z porażkami"
    ],
    dostepny: true,
    kolejnosc: 3
  }
];

const uploadEbooki = async () => {
  try {
    console.log('🚀 Rozpoczynam dodawanie e-booków...');
    
    // Test połączenia
    const testDoc = await db.collection('ebooki').limit(1).get();
    console.log('✅ Połączenie z Firebase działa');

    const ebookiRef = db.collection('ebooki');

    // Usuń istniejące e-booki
    const existingDocs = await ebookiRef.get();
    if (!existingDocs.empty) {
      console.log(`🗑️ Usuwam ${existingDocs.size} istniejących e-booków...`);
      const batch = db.batch();
      existingDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }

    // Dodaj nowe e-booki
    for (const ebook of ebooki) {
      await ebookiRef.add(ebook);
      console.log(`✅ Dodano e-book: ${ebook.tytul}`);
    }

    console.log("🎉 Wszystkie e-booki zostały pomyślnie dodane!");
    
    // Finalna weryfikacja
    const finalCheck = await ebookiRef.get();
    console.log(`📊 Łącznie w bazie: ${finalCheck.size} e-booków`);

    // Wyświetl dodane e-booki
    console.log('\n📚 Dodane e-booki:');
    finalCheck.forEach(doc => {
      const data = doc.data();
      console.log(`- ${data.tytul} (${data.ikona})`);
    });

  } catch (error) {
    console.error("❌ Błąd podczas dodawania e-booków:", error);
    
    if (error.code) {
      console.error("Kod błędu:", error.code);
    }
    if (error.message) {
      console.error("Wiadomość:", error.message);
    }
    
    process.exit(1);
  }
};

uploadEbooki();