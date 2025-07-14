const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const account = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json');

const app = initializeApp({
  credential: cert(account),
});

const db = getFirestore();

const aktualnosci = [
  {
    customId: 1,
    tytul: "Zwycięstwo w Turnieju Młodzieżowym!",
    data: "28 czerwca 2025",
    kategoria: "Sukcesy",
    opis: "Nasza drużyna U-16 zwyciężyła w Turnieju Młodzieżowym Szczecin Cup 2025! Po zaciętych meczach w grupie i emocjonującym finale, nasi zawodnicy pokazali prawdziwą klasę i determinację.",
    obrazek: "🏆",
    pelnyTekst: "Nasza drużyna U-16 zwyciężyła w Turnieju Młodzieżowym Szczecin Cup 2025! To był niesamowity weekend pełen emocji i sportowej rywalizacji. Nasi zawodnicy pokazali prawdziwą klasę, determinację i zespołowego ducha. W finale pokonali drużynę Akademii Warszawskiej 3-1, strzelając wszystkie bramki w drugiej połowie. Szczególnie wyróżnili się: Kamil Nowak (2 bramki), Michał Kowalski (1 bramka) i bramkarz Tomasz Wiśniewski, który obronił rzut karny w 85. minucie. Gratulujemy całej drużynie i trenerowi Markowi Jabłońskiemu!",
    dostepny: true,
    wyrozniany: true
  },
  {
    customId: 2,
    tytul: "Nowy trener w akademii",
    data: "25 czerwca 2025",
    kategoria: "Kadra",
    opis: "Do zespołu dołączył były piłkarz Ekstraklasy - Marcin Kowalski. Będzie odpowiedzialny za szkolenie grup młodzieżowych U-14 i U-16.",
    obrazek: "👨‍🏫",
    pelnyTekst: "Z ogromną radością informujemy, że do naszego zespołu trenerskiego dołączył Marcin Kowalski - były piłkarz Ekstraklasy z 10-letnim doświadczeniem w profesjonalnym futbolu. Marcin grał w takich klubach jak Lechia Gdańsk, Śląsk Wrocław i Zagłębie Lubin. Posiada licencję UEFA A i będzie odpowiedzialny za szkolenie grup młodzieżowych U-14 i U-16. W swojej karierze rozegrał ponad 200 meczów w najwyższej klasie rozgrywkowej. Marcin jest specjalistą od szkolenia młodzieży i ma bogate doświadczenie w pracy z talentami. Jesteśmy przekonani, że jego wiedza i doświadczenie pomogą naszym zawodnikom osiągnąć kolejny poziom.",
    dostepny: true,
    wyrozniany: false
  },
  {
    customId: 3,
    tytul: "Obóz letni 2025",
    data: "20 czerwca 2025",
    kategoria: "Wydarzenia",
    opis: "Rozpoczynamy zapisy na letni obóz piłkarski w Pobierowie. Obóz trwa 10 dni i jest przeznaczony dla zawodników w wieku 8-16 lat.",
    obrazek: "🏕️",
    pelnyTekst: "Rozpoczynamy zapisy na letni obóz piłkarski w Pobierowie! Obóz trwa 10 dni (15-25 lipca 2025) i jest przeznaczony dla zawodników w wieku 8-16 lat. W programie: 3 treningi dziennie, zajęcia z psychologiem sportu, mecze i turnieje, zajęcia rekreacyjne na plaży, pełne wyżywienie i opieka 24/7. Obóz prowadzą licencjonowani trenerzy z Future Football Club. Cena: 1200 zł (obejmuje zakwaterowanie, wyżywienie, treningi, strój obozowy). Liczba miejsc ograniczona do 40 uczestników. Zapisy do 5 lipca lub do wyczerpania miejsc. Kontakt: oboz@futurefootball.pl lub 123-456-789.",
    dostepny: true,
    wyrozniany: true
  },
  {
    customId: 4,
    tytul: "Nowy partner klubu",
    data: "18 czerwca 2025",
    kategoria: "Partnerstwo",
    opis: "Future Football Club nawiązał współpracę z firmą SportTech, która będzie dostarczać nowoczesny sprzęt treningowy.",
    obrazek: "🤝",
    pelnyTekst: "Future Football Club z dumą ogłasza nawiązanie strategicznego partnerstwa z firmą SportTech - liderem w dostarczaniu nowoczesnego sprzętu treningowego. Współpraca obejmuje dostarczenie najnowocześniejszego sprzętu do analizy ruchu, systemu monitorowania zawodników oraz urządzeń do treningu funkcjonalnego. Dzięki temu partnerstwu nasi zawodnicy będą mieli dostęp do technologii używanej przez najlepsze kluby w Europie. SportTech będzie również wspierać nasze programy rozwoju młodzieży poprzez organizację warsztatów technologicznych i seminariów dla trenerów.",
    dostepny: true,
    wyrozniany: false
  },
  {
    customId: 5,
    tytul: "Sukces w akademii",
    data: "15 czerwca 2025",
    kategoria: "Sukcesy",
    opis: "Dwóch naszych zawodników z grupy U-18 otrzymało powołanie do reprezentacji województwa na Ogólnopolską Olimpiadę Młodzieży.",
    obrazek: "⚽",
    pelnyTekst: "Z ogromną dumą informujemy, że dwóch naszych zawodników z grupy U-18 otrzymało powołanie do reprezentacji województwa zachodniopomorskiego na Ogólnopolską Olimpiadę Młodzieży. Są to: Jakub Nowicki (środkowy pomocnik) i Adrian Kowalczyk (napastnik). Obaj zawodnicy trenują w naszym klubie od 3 lat i są przykładem systematycznej pracy oraz talentu. Olimpiada odbędzie się w lipcu w Krakowie. To ogromne wyróżnienie dla naszej akademii i dowód na to, że nasze metody szkolenia przynoszą efekty. Gratulujemy chłopakom i życzymy powodzenia w reprezentacji!",
    dostepny: true,
    wyrozniany: true
  },
  {
    customId: 6,
    tytul: "Nowy sezon treningowy",
    data: "10 czerwca 2025",
    kategoria: "Treningi",
    opis: "1 września startuje nowy sezon treningowy 2025/2026. Rozpoczynamy zapisy do wszystkich grup wiekowych.",
    obrazek: "🏃‍♂️",
    pelnyTekst: "1 września 2025 roku startuje nowy sezon treningowy 2025/2026 w Future Football Club! Rozpoczynamy zapisy do wszystkich grup wiekowych. Oferujemy treningi dla grup: Żaczki (6-8 lat), Młodziki (9-11 lat), Trampkarze (12-14 lat), Juniorzy (15-17 lat). Treningi odbywają się 3 razy w tygodniu na profesjonalnych boiskach. W nowym sezonie wprowadzamy dodatkowe zajęcia z przygotowania motorycznego oraz sesje z psychologiem sportu. Ceny pozostają bez zmian: 200 zł miesięcznie. Zapisy odbywają się online oraz w siedzibie klubu. Pierwsze treningi próbne są bezpłatne. Zapraszamy wszystkich chętnych!",
    dostepny: true,
    wyrozniany: false
  }
];

const uploadAktualnosci = async () => {
  try {
    console.log('🚀 Rozpoczynam dodawanie aktualności...');
    
    const testDoc = await db.collection('aktualnosci').limit(1).get();
    console.log('✅ Połączenie z Firebase działa');

    const aktualnosciRef = db.collection('aktualnosci');

    const existingDocs = await aktualnosciRef.get();
    if (!existingDocs.empty) {
      console.log(`🗑️ Usuwam ${existingDocs.size} istniejących aktualności...`);
      const batch = db.batch();
      existingDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }

    for (const aktualnosc of aktualnosci) {
      await aktualnosciRef.add(aktualnosc);
      console.log(`✅ Dodano aktualność: ${aktualnosc.tytul}`);
    }

    console.log("🎉 Wszystkie aktualności zostały pomyślnie dodane!");
    
    const finalCheck = await aktualnosciRef.get();
    console.log(`📊 Łącznie w bazie: ${finalCheck.size} aktualności`);

  } catch (error) {
    console.error("❌ Błąd podczas dodawania aktualności:", error);
    
    if (error.code) {
      console.error("Kod błędu:", error.code);
    }
    if (error.message) {
      console.error("Wiadomość:", error.message);
    }
    
    process.exit(1);
  }
};

uploadAktualnosci();