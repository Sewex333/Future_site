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
      id: 10,
      nazwa: "Turniej Młodzieżowy Future Cup",
      opis: "Prestiżowy turniej dla młodych talentów w kategoriach U12, U14, U16. Profesjonalna organizacja, nagrody i szansa na rozwój.",
      data: "15-17 Lipiec 2024",
      miejsce: "Kompleks Sportowy Future",
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
      id: 12,
      nazwa: "Obóz Letni Elite Camp",
      opis: "Intensywny obóz treningowy dla najzdolniejszych młodych piłkarzy. Treningi z profesjonalnymi trenerami.",
      data: "1-14 Sierpień 2024",
      miejsce: "Zakopane",
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
