// uploadPartnerzy.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const account = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json');

const app = initializeApp({
  credential: cert(account),
});

const db = getFirestore();

const partnerzy = [
  {
    customId: 1,
    nazwa: "Labran",
    opis: "Labran to renomowana marka galanterii skórzanej, która od lat dostarcza wysokiej jakości torby i akcesoria. Jako oficjalny partner Future Football Club, Labran odpowiada za produkcję ekskluzywnych toreb klubowych, plecaków dla zawodników oraz akcesoriów skórzanych z logo klubu.",
    kategoria: "Wyposażenie",
    image: "/labran.png",
    link: "https://www.facebook.com/Labranpl",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Labran specjalizuje się w produkcji wysokiej jakości galanterii skórzanej. Dla Future FC produkuje oficjalne torby treningowe, plecaki podróżne oraz akcesoria dla zawodników i kibiców. Każdy produkt jest wykonany z najlepszych materiałów i oznaczony logo klubu.",
    logo: "/labran.png",
    kolor_karty: "from-amber-400 to-amber-500"
  },
  {
    customId: 2,
    nazwa: "Grzegorz Nowotniak",
    opis: "Grzegorz Nowotniak to doświadczony spiker sportowy i DJ, który od wielu lat współpracuje z Future Football Club. Jako oficjalny spiker meczów, swoim charakterystycznym głosem i profesjonalizmem tworzy niepowtarzalną atmosferę podczas spotkań domowych klubu.",
    kategoria: "Media",
    image: "/grzegorz_nowotniak.jpg",
    link: "https://www.facebook.com/deejaynov",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Grzegorz Nowotniak to nie tylko spiker, ale także DJ z wieloletnim doświadczeniem. Podczas meczów Future FC odpowiada za oprawę muzyczną, komunikaty stadionowe oraz prowadzenie wydarzeń klubowych. Jego energia i profesjonalizm sprawiają, że każdy mecz to niezapomniane przeżycie.",
    logo: "/grzegorz_nowotniak.jpg",
    kolor_karty: "from-blue-400 to-blue-500"
  },
  {
    customId: 3,
    nazwa: "MOSiR Szczecin",
    opis: "Miejski Ośrodek Sportu i Rekreacji w Szczecinie to strategiczny partner Future Football Club w zakresie infrastruktury sportowej. Współpraca obejmuje udostępnianie najlepszych obiektów sportowych dla treningów i meczów naszych drużyn młodzieżowych.",
    kategoria: "Infrastruktura",
    image: "/mosrir.jpg",
    link: "https://www.facebook.com/mosrirszczecin",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "MOSiR Szczecin zarządza najlepszymi obiektami sportowymi w mieście. Dzięki partnerstwu z Future FC, nasze drużyny mają dostęp do profesjonalnych boisk, sal treningowych oraz pełnej infrastruktury sportowej. To strategiczne partnerstwo zapewnia naszym zawodnikom optymalne warunki rozwoju.",
    logo: "/mosrir.jpg",
    kolor_karty: "from-green-400 to-green-500"
  },
  {
    customId: 4,
    nazwa: "Pizzeria Swojska Pomorzany",
    opis: "Pizzeria Swojska Pomorzany to lokalny punkt gastronomiczny, który specjalizuje się w tradycyjnej kuchni polskiej i włoskiej. Jako partner Future FC, zapewnia catering dla zawodników, sztabu szkoleniowego oraz kibiców podczas meczów i wydarzeń klubowych.",
    kategoria: "Catering",
    image: "/pizzeria.jpg",
    link: "https://www.facebook.com/profile.php?id=61551252213573",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Pizzeria Swojska Pomorzany słynie z najlepszych pizzy w dzielnicy oraz tradycyjnych polskich potraw. Dla Future FC przygotowuje posiłki regeneracyjne dla zawodników, organizuje catering na wydarzenia klubowe oraz oferuje specjalne rabaty dla kibiców. Jakość i świeżość składników to ich znak rozpoznawczy.",
    logo: "/pizzeria.jpg",
    kolor_karty: "from-red-400 to-red-500"
  },
  {
    customId: 5,
    nazwa: "Szmaragd Cafe",
    opis: "Szmaragd Cafe to wyjątkowa kawiarnia w Szczecinie, która stała się nieoficjalnym miejscem spotkań kibiców i zawodników Future Football Club. Przytulna atmosfera, doskonała kawa i domowe ciasta sprawiają, że to idealne miejsce na przedmeczowe spotkania.",
    kategoria: "Gastronomia",
    image: "/kawiarnia.jpg",
    link: "https://www.facebook.com/cafeszmaragd",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Szmaragd Cafe to miejsce z duszą, gdzie spotykają się pasjonaci futbolu. Kawiarnia oferuje specjalne menu dla kibiców Future FC, organizuje transmisje meczów oraz spotkania z zawodnikami. Ich autorskie mieszanki kawy i domowe wypieki to prawdziwa gratka dla smakoszy.",
    logo: "/kawiarnia.jpg",
    kolor_karty: "from-emerald-400 to-emerald-500"
  },
  {
    customId: 6,
    nazwa: "SportPlus Szczecin",
    opis: "SportPlus Szczecin to specjalistyczny sklep sportowy i producent nagród sportowych. Jako oficjalny dostawca pucharów i nagród klubowych, SportPlus odpowiada za produkcję wszystkich trofeów wręczanych podczas turniejów i wydarzeń organizowanych przez Future FC.",
    kategoria: "Nagrody",
    image: "/nagordy.jpg",
    link: "https://www.facebook.com/SportplusSzczecin",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "SportPlus Szczecin specjalizuje się w produkcji nagród sportowych najwyższej jakości. Dla Future FC produkuje puchary, medale, statuetki oraz specjalne nagrody dla zawodników. Każda nagroda jest wykonana z dbałością o szczegóły i oznaczona logo klubu, co czyni je wyjątkowymi pamiątkami.",
    logo: "/nagordy.jpg",
    kolor_karty: "from-purple-400 to-purple-500"
  },
  {
    customId: 7,
    nazwa: "Radek Janukiewicz",
    opis: "Radek Janukiewicz to doświadczony trener bramkarzy z wieloletnim stażem w pracy z młodzieżą. Jako główny trener bramkarzy Future Football Club, odpowiada za szkolenie młodych talentów na pozycji bramkarza, łącząc nowoczesne metody treningowe z tradycyjnym podejściem.",
    kategoria: "Sztab Szkoleniowy",
    image: "/radek_jaunukiewicz.jpg",
    link: "https://www.facebook.com/profile.php?id=100083789346503",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "Radek Janukiewicz to specjalista w zakresie szkolenia bramkarzy z ponad 15-letnim doświadczeniem. Posiada licencje trenerskie oraz ukończył liczne kursy specjalistyczne. W Future FC prowadzi indywidualne treningi bramkarzy, organizuje obozy specjalistyczne oraz współpracuje z rodzicami w procesie rozwoju młodych zawodników.",
    logo: "/radek_jaunukiewicz.jpg",
    kolor_karty: "from-orange-400 to-orange-500"
  },
  {
    customId: 8,
    nazwa: "Damian Pepliński",
    opis: "Damian Pepliński to główny specjalista od treningów indywidualnych w Future Football Club. Z wieloletnim doświadczeniem w pracy z młodzieżą, skupia się na indywidualnym rozwoju każdego zawodnika, dostosowując program treningowy do potrzeb i możliwości gracza.",
    kategoria: "Sztab Szkoleniowy",
    image: "/damian_peplinski.jpg",
    link: "https://www.facebook.com/pepdamian",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "Damian Pepliński specjalizuje się w treningach indywidualnych i rozwoju technicznym zawodników. Posiada licencje UEFA oraz certyfikaty z zakresu treningu funkcjonalnego. W Future FC prowadzi personalne sesje treningowe, analizuje postępy zawodników oraz współpracuje z rodzicami w planowaniu rozwoju sportowego.",
    logo: "/damian_peplinski.jpg",
    kolor_karty: "from-teal-400 to-teal-500"
  },
  {
    customId: 9,
    nazwa: "Piotr Matulka",
    opis: "Piotr Matulka to certyfikowany trener mentalny i psycholog sportu współpracujący z Future Football Club. Specjalizuje się w pracy z młodymi zawodnikami, pomagając im w rozwijaniu odporności psychicznej, koncentracji oraz radzeniu sobie ze stresem związanym z rywalizacją sportową.",
    kategoria: "Psychologia Sportu",
    image: "/trener_mentalny.jpg",
    link: "https://www.facebook.com/piotrmatulkatrenermentalny",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "Piotr Matulka to dyplomowany psycholog sportu z wieloletnim doświadczeniem w pracy z młodzieżą. Prowadzi warsztaty z zakresu psychologii sportu, indywidualne konsultacje z zawodnikami oraz szkolenia dla trenerów. Jego praca koncentruje się na budowaniu pewności siebie, motywacji oraz umiejętności radzenia sobie z presją.",
    logo: "/trener_mentalny.jpg",
    kolor_karty: "from-indigo-400 to-indigo-500"
  },
  {
    customId: 10,
    nazwa: "EuropaBiz",
    opis: "EuropaBiz to Centrum Rozwoju Nauki i Biznesu, które jako partner edukacyjny Future Football Club wspiera zawodników akademii w łączeniu kariery sportowej z edukacją. Oferuje specjalne programy edukacyjne, kursy języków obcych oraz wsparcie w planowaniu kariery zawodowej.",
    kategoria: "Edukacja",
    image: "/europaBiz.jpg",
    link: "https://www.facebook.com/EuropaBiz",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "EuropaBiz to nowoczesne centrum edukacyjne oferujące kompleksowe wsparcie w rozwoju zawodowym. Dla zawodników Future FC organizuje kursy języków obcych, warsztaty z zakresu przedsiębiorczości oraz programy stypendialnej. Ich misją jest przygotowanie młodych sportowców do życia po zakończeniu kariery.",
    logo: "/europaBiz.jpg",
    kolor_karty: "from-cyan-400 to-cyan-500"
  },
  {
    customId: 11,
    nazwa: "OLYMPIA",
    opis: "OLYMPIA to renomowana marka suplementów sportowych, która dostarcza najwyższej jakości odżywki i suplementy dla zawodników Future Football Club. Współpraca obejmuje dostarczanie specjalistycznych produktów wspierających regenerację, wydolność oraz ogólną kondycję zawodników.",
    kategoria: "Suplementy",
    image: "/olympa.jpg",
    link: "https://www.facebook.com/olympia.shop",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "OLYMPIA to marka z wieloletnim doświadczeniem w branży suplementów sportowych. Dla Future FC dostarcza certyfikowane suplementy, protein oraz napoje regeneracyjne. Wszystkie produkty są testowane i bezpieczne dla młodych zawodników, a ich stosowanie jest konsultowane z dietetykiem klubu.",
    logo: "/olympa.jpg",
    kolor_karty: "from-pink-400 to-pink-500"
  },
  {
    customId: 12,
    nazwa: "Myjnia Posejdon",
    opis: "Myjnia Posejdon to profesjonalny serwis samochodowy, który jako partner usługowy Future Football Club dba o czystość i stan techniczny klubowych pojazdów. Oferuje kompleksowe usługi myjni, detailingu oraz podstawowych przeglądów technicznych.",
    kategoria: "Usługi",
    image: "/myjnia.png",
    link: "https://www.facebook.com/ProfesjonalnaMyjniaPosejdon",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Myjnia Posejdon oferuje profesjonalne usługi związane z pielęgnacją pojazdów. Dla Future FC zapewnia regularne mycie i serwis klubowych busów, samochodów sztabu oraz pojazdów używanych podczas wyjazdów. Ich usługi obejmują również detailing i drobne naprawy mechaniczne.",
    logo: "/myjnia.png",
    kolor_karty: "from-sky-400 to-sky-500"
  },
  {
    customId: 13,
    nazwa: "Gigi Cargo",
    opis: "Gigi Cargo to firma transportowa specjalizująca się w przewozie grup. Jako partner Future Football Club, odpowiada za bezpieczny i komfortowy transport zawodników na mecze wyjazdowe, turnieje oraz obozy sportowe, zapewniając profesjonalną obsługę i nowoczesny tabor.",
    kategoria: "Transport",
    image: "/transport.jpg",
    link: "https://www.facebook.com/people/GiGi-Cargo/61559969609707/",
    typ: "partner",
    dostepny: true,
    opis_rozszerzony: "Gigi Cargo to profesjonalna firma transportowa z nowoczesną flotą busów i autokarów. Dla Future FC organizuje transport na wszystkie mecze wyjazdowe, turnieje krajowe oraz zagraniczne. Ich kierowcy mają doświadczenie w przewozie grup sportowych, a pojazdy są wyposażone w systemy bezpieczeństwa.",
    logo: "/transport.jpg",
    kolor_karty: "from-violet-400 to-violet-500"
  },
  {
    customId: 14,
    nazwa: "KonTour Luxury Travel",
    opis: "KonTour Luxury Travel to prestiżowa agencja turystyczna specjalizująca się w organizacji wyjazdów sportowych. Jako partner Future Football Club, organizuje wyjazdy na turnieje międzynarodowe, obozy zagraniczne oraz wyjazdy studyjne do najlepszych akademii piłkarskich w Europie.",
    kategoria: "Turystyka Sportowa",
    image: "/kontour.jpg",
    link: "https://www.facebook.com/KonTourLuxuryTravel",
    typ: "strategiczny",
    dostepny: true,
    opis_rozszerzony: "KonTour Luxury Travel to ekskluzywna agencja turystyczna z doświadczeniem w organizacji wyjazdów sportowych. Dla Future FC organizuje turnieje zagraniczne, obozy w najlepszych ośrodkach Europy oraz wyjazdy studyjne do renomowanych akademii. Ich usługi obejmują pełną obsługę logistyczną, zakwaterowanie oraz program sportowo-turystyczny.",
    logo: "/kontour.jpg",
    kolor_karty: "from-rose-400 to-rose-500"
  }
];

const uploadPartnerzy = async () => {
  try {
    console.log('🚀 Rozpoczynam dodawanie partnerów...');
    
    const testDoc = await db.collection('partnerzy').limit(1).get();
    console.log('✅ Połączenie z Firebase działa');

    const partnersRef = db.collection('partnerzy');

    const existingDocs = await partnersRef.get();
    if (!existingDocs.empty) {
      console.log(`🗑️ Usuwam ${existingDocs.size} istniejących partnerów...`);
      const batch = db.batch();
      existingDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }

    for (const partner of partnerzy) {
      await partnersRef.add(partner);
      console.log(`✅ Dodano partnera: ${partner.nazwa}`);
    }

    console.log("🎉 Wszyscy partnerzy zostali pomyślnie dodani!");
    
    const finalCheck = await partnersRef.get();
    console.log(`📊 Łącznie w bazie: ${finalCheck.size} partnerów`);

  } catch (error) {
    console.error("❌ Błąd podczas dodawania partnerów:", error);
    
    if (error.code) {
      console.error("Kod błędu:", error.code);
    }
    if (error.message) {
      console.error("Wiadomość:", error.message);
    }
    
    process.exit(1);
  }
};

uploadPartnerzy();