import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Treningi = () => {
  const grupy = [
    {
      ikona: "⚽",
      tytul: "Dzieci (4–8 lat)",
      opis: "Pierwszy kontakt z piłką przez zabawę i gry motoryczne",
      szczegoly: [
        "Rozwój koordynacji i równowagi",
        "Nauka pracy w grupie",
        "Podstawowe umiejętności techniczne",
        "Pozytywny coaching i budowanie pewności siebie"
      ]
    },
    {
      ikona: "🥅",
      tytul: "Podstawowe (9–12 lat)",
      opis: "Fundamenty gry: technika, dyscyplina i fair play",
      szczegoly: [
        "Podania, przyjęcia, drybling",
        "Ustawianie się na boisku",
        "Mini-turnieje i testy rozwojowe",
        "Komunikacja i odpowiedzialność"
      ]
    },
    {
      ikona: "💪",
      tytul: "Zaawansowane (13–15 lat)",
      opis: "Taktyka, rywalizacja i rozwój mentalny",
      szczegoly: [
        "Schematy gry ofensywnej i defensywnej",
        "Gra w różnych ustawieniach",
        "Podejmowanie decyzji pod presją",
        "Elementy mentalne i integracyjne"
      ]
    },
    {
      ikona: "🧠",
      tytul: "Specjalistyczne",
      opis: "Bramkarskie i indywidualne treningi",
      szczegoly: [
        "Treningi mentalne: wizualizacja i koncentracja",
        "Bramkarskie: reakcja, ustawienie, gra nogami",
        "Indywidualne: technika, dynamika, koncentracja",
        "Analiza wideo dla optymalnego rozwoju"
      ]
    },
    {
      ikona: "🟡",
      tytul: "Seniorzy (A-Klasa)",
      opis: "Profesjonalne treningi dla dorosłych pasjonatów",
      szczegoly: [
        "Wysoka intensywność treningów",
        "Mecze sparingowe i ligowe",
        "Motywująca atmosfera",
        "Jasna ścieżka rozwoju"
      ]
    }
  ];

  const GrupaCard = ({ grupa }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-2 border-black">
      <div className="text-4xl mb-4 text-center">{grupa.ikona}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{grupa.tytul}</h3>
      <p className="text-gray-600 text-center text-sm mb-4">{grupa.opis}</p>
      <ul className="space-y-2">
        {grupa.szczegoly.map((szczegol, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">{szczegol}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Treningi dla <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Wszystkich</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Dołącz do Future Football Club – miejsca, gdzie pasja do piłki nożnej łączy pokolenia! Oferujemy treningi dla każdej grupy wiekowej, od najmłodszych po dorosłych, w atmosferze wsparcia i rozwoju.
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
                <div className="text-3xl font-bold text-black mb-2">8</div>
                <div className="text-gray-600">Grup treningowych</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Nasze grupy treningowe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {grupy.map((grupa, index) => (
                <GrupaCard key={index} grupa={grupa} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Dlaczego warto do nas dołączyć?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Spersonalizowany rozwój</h3>
                <p className="text-gray-600 text-sm">Indywidualne podejście do każdego zawodnika, niezależnie od wieku</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Motywująca atmosfera</h3>
                <p className="text-gray-600 text-sm">Wspieramy pasję i budujemy wspólnotę</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Nowoczesne metody</h3>
                <p className="text-gray-600 text-sm">Treningi oparte na analizie wideo i najlepszych praktykach</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Zacznij swoją <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">piłkarską przygodę</span>
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Niezależnie od wieku, u nas znajdziesz miejsce do rozwoju swojej pasji. Zapisz się na bezpłatną konsultację i dołącz do Future Football Club!
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

export default Treningi;