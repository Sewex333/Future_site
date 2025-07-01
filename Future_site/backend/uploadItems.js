// uploadItems.js
require('dotenv').config(); // Ładujemy zmienne środowiskowe

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Produkty do dodania
const items = [
 {
      id: 1,
      nazwa: "Turniej Młodzieżowy Future Cup",
      opis: "Prestiżowy turniej dla młodych talentów w kategoriach U12, U14, U16. Profesjonalna organizacja, nagrody i szansa na rozwój.",
      data: "15-17 Lipiec 2024",
      miejsce: "Kompleks Sportowy Future",
      cena: "200 zł/drużyna",
      kategoria: "Turniej",
      ikona: "🏆",
      uczestnicy: "16 drużyn",
      nagrody: "10,000 zł",
      features: [
        "Profesjonalni sędziowie",
        "Transmisja online",
        "Puchary i medale",
        "Catering dla drużyn",
        "Ceremonia zakończenia"
      ],
      dostepny: true
    },
    {
      id: 2,
      nazwa: "Obóz Letni Elite Camp",
      opis: "Intensywny obóz treningowy dla najzdolniejszych młodych piłkarzy. Treningi z profesjonalnymi trenerami.",
      data: "1-14 Sierpień 2024",
      miejsce: "Zakopane",
      cena: "1,200 zł/osoba",
      kategoria: "Obóz",
      ikona: "🏕️",
      uczestnicy: "24 zawodników",
      nagrody: "Certyfikaty",
      features: [
        "14 dni treningów",
        "Pełne wyżywienie",
        "Zakwaterowanie",
        "Opieka medyczna",
        "Materiały treningowe"
      ],
      dostepny: true
    },
    {
      id: 3,
      nazwa: "Mecz Charytatywny Stars vs Future",
      opis: "Wyjątkowy mecz z udziałem gwiazd piłki nożnej. Całkowity dochód przeznaczony na cele charytatywne.",
      data: "22 Wrzesień 2024",
      miejsce: "Stadion Miejski",
      cena: "25 zł/bilet",
      kategoria: "Mecz",
      ikona: "⭐",
      uczestnicy: "22 gwiazdy",
      nagrody: "Dla dzieci",
      features: [
        "Gwiazdy futbolu",
        "Sesje autografów",
        "Konkursy dla dzieci",
        "Stoiska gastronomiczne",
        "Cel charytatywny"
      ],
      dostepny: true
    },
    {
      id: 4,
      nazwa: "Klinika Treningowa z Mistrzami",
      opis: "Ekskluzywna klinika treningowa prowadzona przez byłych reprezentantów Polski. Ograniczona liczba miejsc.",
      data: "5-6 Październik 2024",
      miejsce: "Centrum Treningowe",
      cena: "350 zł/osoba",
      kategoria: "Klinika",
      ikona: "🎓",
      uczestnicy: "20 zawodników",
      nagrody: "Certyfikat",
      features: [
        "Mistrzowie jako trenerzy",
        "Indywidualne wskazówki",
        "Materiały video",
        "Zdjęcia pamiątkowe",
        "Lunch z mistrzami"
      ],
      dostepny: false
    },
    {
      id: 5,
      nazwa: "Turniej Korporacyjny Business Cup",
      opis: "Turniej dla firm i korporacji. Świetna okazja do integracji zespołów i networkingu w sportowej atmosferze.",
      data: "20 Listopad 2024",
      miejsce: "Hala Sportowa",
      cena: "500 zł/drużyna",
      kategoria: "Korporacyjny",
      ikona: "💼",
      uczestnicy: "12 firm",
      nagrody: "5,000 zł",
      features: [
        "Format halowy 5v5",
        "Stroje dla drużyn",
        "Profesjonalna obsługa",
        "Networking zone",
        "Catering biznesowy"
      ],
      dostepny: true
    },
    {
      id: 6,
      nazwa: "Zimowy Obóz Kondycyjny",
      opis: "Specjalistyczny obóz fokusujący się na przygotowaniu kondycyjnym w okresie zimowym.",
      data: "2-9 Styczeń 2025",
      miejsce: "Krynica-Zdrój",
      cena: "950 zł/osoba",
      kategoria: "Obóz",
      ikona: "❄️",
      uczestnicy: "18 zawodników",
      nagrody: "Plan treningowy",
      features: [
        "Treningi kondycyjne",
        "Basen i siłownia",
        "Regeneracja",
        "Analiza składu ciała",
        "Indywidualny plan"
      ],
      dostepny: true
    }
];

const uploadItems = async () => {
  try {
    const shopRef = collection(db, "eventy");

    for (const item of items) {
      await addDoc(shopRef, item);
      console.log(`Dodano produkt: ${item.name}`);
    }

    console.log("✅ Wszystkie produkty dodane!");
  } catch (error) {
    console.error("❌ Błąd podczas dodawania:", error);
  }
};

uploadItems();
