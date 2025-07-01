import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TreningiIndywidualne = () => {
  const pakiety = [
    {
      nazwa: "Pakiet Starter",
      sesje: "4 sesje",
      cena: "500 zł",
      czas: "4 tygodnie",
      opis: "Idealny na początek przygody z treningami indywidualnymi",
      zawiera: [
        "Analiza początkowa umiejętności",
        "Plan treningowy na 4 tygodnie",
        "4 sesje po 90 minut",
        "Podstawowe ćwiczenia techniczne",
        "Raport końcowy z postępami"
      ],
      popularne: false
    },
    {
      nazwa: "Pakiet Professional",
      sesje: "8 sesji",
      cena: "900 zł",
      czas: "8 tygodni",
      opis: "Kompleksowy rozwój umiejętności piłkarskich",
      zawiera: [
        "Szczegółowa analiza video",
        "Indywidualny plan rozwoju",
        "8 sesji po 90 minut",
        "Ćwiczenia zaawansowane",
        "Analiza meczów",
        "Materiały do treningu domowego"
      ],
      popularne: true
    },
    {
      nazwa: "Pakiet Elite",
      sesje: "12 sesji",
      cena: "1200 zł",
      czas: "12 tygodni",
      opis: "Najwyższy poziom treningu indywidualnego",
      zawiera: [
        "Kompleksowa analiza biomechaniczna",
        "Plan rozwoju na 3 miesiące",
        "12 sesji po 90 minut",
        "Trening z wykorzystaniem technologii",
        "Analiza statystyczna",
        "Konsultacje żywieniowe",
        "Dostęp do aplikacji mobilnej"
      ],
      popularne: false
    }
  ];

  const obszary = [
    {
      ikona: "⚽",
      tytul: "Technika Piłkarska",
      opis: "Doskonalenie prowadzenia piłki, podań, przyjęć i strzelania"
    },
    {
      ikona: "🏃",
      tytul: "Koordynacja i Zwinność",
      opis: "Rozwój motoryki, równowagi i szybkości reakcji"
    },
    {
      ikona: "🎯",
      tytul: "Precyzja i Celność",
      opis: "Trening celności strzałów i dokładności podań"
    },
    {
      ikona: "🧠",
      tytul: "Inteligencja Gry",
      opis: "Analiza sytuacji, podejmowanie decyzji i czytanie gry"
    },
    {
      ikona: "💪",
      tytul: "Siła Funkcjonalna",
      opis: "Budowanie siły specyficznej dla piłki nożnej"
    },
    {
      ikona: "🏃‍♂️",
      tytul: "Kondycja Specjalna",
      opis: "Wytrzymałość, szybkość i eksplozywność"
    }
  ];

 
  const OszarCard = ({ obszar }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4 text-center">{obszar.ikona}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{obszar.tytul}</h3>
      <p className="text-gray-600 text-center text-sm">{obszar.opis}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Treningi <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Indywidualne</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Spersonalizowane sesje treningowe dostosowane do Twoich indywidualnych potrzeb. 
              Rozwijaj umiejętności pod okiem doświadczonych trenerów i osiągnij swój pełny potencjał.
            </p>
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">300+</div>
                <div className="text-gray-600">Zawodników</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">95%</div>
                <div className="text-gray-600">Postęp w umiejętnościach</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">5+</div>
                <div className="text-gray-600">Lat doświadczenia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">90</div>
                <div className="text-gray-600">Minut sesji</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Obszary treningowe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {obszary.map((obszar, index) => (
                <OszarCard key={index} obszar={obszar} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Wybierz swój pakiet
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Oferujemy różne pakiety treningowe dostosowane do Twojego poziomu zaawansowania i celów. 
              Każdy pakiet jest w pełni personalizowany.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Jak wygląda proces treningowy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Analiza Początkowa</h3>
                <p className="text-gray-600 text-sm">Oceniamy Twoje umiejętności i wyznaczamy cele</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Plan Indywidualny</h3>
                <p className="text-gray-600 text-sm">Tworzymy spersonalizowany program treningowy</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Treningi</h3>
                <p className="text-gray-600 text-sm">Regularne sesje z monitorowaniem postępów</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Ewaluacja</h3>
                <p className="text-gray-600 text-sm">Oceniamy postępy i dostosowujemy plan</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Zacznij swoją drogę do <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">sukcesu</span>
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Umów się na bezpłatną konsultację i odkryj swój potencjał
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Bezpłatna konsultacja
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
                Zobacz cennik
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TreningiIndywidualne;