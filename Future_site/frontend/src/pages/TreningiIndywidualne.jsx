import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';
import videoMain from '../../public/filmik_glowna.mp4'

const TreningiIndywidualne = () => {
  

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
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-20 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">500+</div>
                <div className="text-gray-600">Zawodników</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">2017</div>
                <div className="text-gray-600">Doświadczenie od</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">+/-60</div>
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
                <h3 className="font-bold text-gray-800 mb-2">Poznajemy się</h3>
                <p className="text-gray-600 text-sm">Przeprowadzamy testy i analizujemy Twój potencjał</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Plan działania</h3>
                <p className="text-gray-600 text-sm">Ustalamy spersonalizowany plan treningowy</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Realizacja treningu</h3>
                <p className="text-gray-600 text-sm">Trenujesz indywidualnie lub w grupie do 4 osób</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Weryfikacja postępów</h3>
                <p className="text-gray-600 text-sm">Sprawdzamy efekty i ustalamy kolejne cele</p>
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
              <Link to="/kontakt">
                <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg cursor-pointer">
                  Zapisz się
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TreningiIndywidualne;