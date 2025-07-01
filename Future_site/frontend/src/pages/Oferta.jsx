import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Form } from 'react-router';
import { Link } from 'react-router';

const Oferta = () => {
  const oferty = [
    {
      id: 1,
      nazwa: "Akademia Piłkarska",
      opis: "Kompleksowe szkolenie młodych piłkarzy z elementami gry pozycyjnej",
      cena: "od 200 zł/miesiąc",
      czas: "2x tygodniowo",
      poziom: "6-18 lat",
      ikona: "⚽",
      features: [
        "Licencjonowani trenerzy UEFA",
        "Trening techniczno-taktyczny",
        "Rozwój fizyczny i koordynacja",
        "Mecze ligowe i sparingi",
        "Certyfikat ukończenia sezonu"
      ],
      kolor: "from-yellow-500 to-yellow-600"
    },
    {
      id: 2,
      nazwa: "Treningi Indywidualne",
      opis: "Spersonalizowane sesje treningowe z analizą video i planem rozwoju",
      cena: "150 zł/sesja",
      czas: "90 minut",
      poziom: "Wszystkie kategorie",
      ikona: "🎯",
      features: [
        "Analiza techniki indywidualnej",
        "Korekta błędów taktycznych",
        "Trening pozycyjny",
        "Analiza wideo z meczów",
        "Indywidualny plan rozwoju"
      ],
      kolor: "from-gray-800 to-black"
    },
    {
      id: 3,
      nazwa: "Treningi Mentalne",
      opis: "Budowanie charakteru zawodnika i radzenie sobie z presją meczową",
      cena: "120 zł/sesja",
      czas: "60 minut",
      poziom: "Wszyscy zawodnicy",
      ikona: "🧠",
      features: [
        "Praca nad koncentracją",
        "Radzenie sobie z presją",
        "Budowanie pewności siebie",
        "Motywacja i cele sportowe",
        "Praca z psychologiem sportu"
      ],
      kolor: "from-yellow-400 to-yellow-500"
    },
    {
      id: 4,
      nazwa: "Obozy Piłkarskie",
      opis: "Intensywne obozy treningowe w malowniczych lokalizacjach",
      cena: "od 800 zł",
      czas: "7-14 dni",
      poziom: "Wszystkie kategorie",
      ikona: "🏕️",
      features: [
        "3 treningi dziennie",
        "Mecze i turnieje",
        "Pełna opieka i wyżywienie",
        "Zajęcia rekreacyjne",
        "Certyfikat i pamiątki"
      ],
      kolor: "from-gray-700 to-gray-900"
    },
    {
      id: 5,
      nazwa: "Sklep Klubowy",
      opis: "Oficjalne stroje i akcesoria Future Football Club",
      cena: "Różne ceny",
      czas: "Dostępne 24/7",
      poziom: "Dla kibiców",
      ikona: "👕",
      features: [
        "Koszulki meczowe i treningowe",
        "Spodenki i getry klubowe",
        "Akcesoria kibiców",
        "Sprzęt treningowy",
        "Szybka dostawa"
      ],
      kolor: "from-yellow-500 to-yellow-600"
    },
    {
      id: 6,
      nazwa: "Skauting i Rozwój",
      opis: "Program rozwoju talentów i współpraca z profesjonalnymi klubami",
      cena: "Wycena indywidualna",
      czas: "Według potrzeb",
      poziom: "Utalentowani gracze",
      ikona: "🔍",
      features: [
        "Obserwacja talentów",
        "Testy w klubach",
        "Rekomendacje do akademii",
        "Doradztwo kariery",
        "Kontakty z agentami"
      ],
      kolor: "from-gray-800 to-black"
    }
  ];

  const OfferCard = ({ oferta }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100">
      <div className={`h-32 bg-gradient-to-r ${oferta.kolor} flex items-center justify-center relative`}>
        <div className="text-6xl">{oferta.ikona}</div>
        <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{oferta.nazwa}</h3>
          <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-semibold">
            {oferta.poziom}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{oferta.opis}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-yellow-600">{oferta.cena}</div>
          <div className="text-sm text-gray-500 font-medium">{oferta.czas}</div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Program zawiera:</h4>
          <ul className="space-y-1">
            {oferta.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-500 mr-2 font-bold">⚽</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

      <Link to="/formularz">
        <button className={`w-full bg-gradient-to-r ${oferta.kolor} text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 font-semibold shadow-lg`}>
          Zapisz się na trening
        </button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-gradient-to-r from-black via-gray-800 to-yellow-600 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="text-3xl">⚽</div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nasza Oferta Treningowa
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Future Football Club oferuje kompleksowe szkolenie piłkarskie na najwyższym poziomie. 
              Od akademii młodzieżowej po treningi indywidualne - rozwijamy talenty futbolowe.
            </p>
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                <div className="text-gray-600">Wyszkolonych zawodników</div>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-3xl font-bold text-black mb-2">15+</div>
                <div className="text-gray-600">Lat doświadczenia</div>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-3xl font-bold text-yellow-600 mb-2">25+</div>
                <div className="text-gray-600">Zawodników w klubach</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">100%</div>
                <div className="text-gray-600">Zaangażowania</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Wybierz swój program treningowy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {oferty.map(oferta => (
                <OfferCard key={oferta.id} oferta={oferta} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-yellow-500 via-yellow-600 to-black relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="text-4xl">🏆</div>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Gotowy na profesjonalny trening?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Dołącz do Future Football Club i rozwijaj swoje umiejętności pod okiem licencjonowanych trenerów
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Umów trening próbny
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Sprawdź cennik
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Oferta;