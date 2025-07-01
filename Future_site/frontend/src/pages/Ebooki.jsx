import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Ebooki = () => {
  const ebooki = [
    {
      id: 1,
      tytul: "Podstawy Techniki Piłkarskiej",
      opis: "Kompletny przewodnik po podstawowych elementach techniki piłkarskiej dla młodych adeptów futbolu.",
      cena: "49 zł",
      strony: "85 stron",
      poziom: "Początkujący",
      ikona: "⚽",
      format: "PDF + Video",
      zawiera: [
        "Technika prowadzenia piłki",
        "Podstawy podań",
        "Strzały na bramkę",
        "20 filmów instruktażowych",
        "Ćwiczenia dla każdego poziomu"
      ],
      bestseller: true
    },
    {
      id: 2,
      tytul: "Trening Mentalny dla Piłkarzy",
      opis: "Poznaj tajniki psychologii sportu i naucz się radzić z presją na najwyższym poziomie.",
      cena: "39 zł",
      strony: "65 stron",
      poziom: "Wszystkie",
      ikona: "🧠",
      format: "PDF + Audio",
      zawiera: [
        "Techniki koncentracji",
        "Zarządzanie stresem",
        "Budowanie pewności siebie",
        "15 sesji audio",
        "Praktyczne ćwiczenia"
      ],
      bestseller: false
    },
    {
      id: 3,
      tytul: "Plan Treningowy - Sezon Przygotowawczy",
      opis: "Szczegółowy plan treningowy na okres przygotowawczy z podziałem na mikrocykle.",
      cena: "59 zł",
      strony: "120 stron",
      poziom: "Zaawansowany",
      ikona: "📋",
      format: "PDF + Excel",
      zawiera: [
        "12-tygodniowy plan",
        "Ćwiczenia kondycyjne",
        "Treningi techniczne",
        "Arkusze planowania",
        "Wskazówki żywieniowe"
      ],
      bestseller: false
    },
    {
      id: 4,
      tytul: "Analiza Taktyczna - Nowoczesny Futbol",
      opis: "Dogłębna analiza współczesnych systemów gry i trendów taktycznych w piłce nożnej.",
      cena: "69 zł",
      strony: "95 stron",
      poziom: "Ekspert",
      ikona: "🎯",
      format: "PDF + Video",
      zawiera: [
        "Systemy 4-3-3 i 4-2-3-1",
        "Pressing i kontratak",
        "Analiza meczów",
        "25 filmów taktycznych",
        "Ćwiczenia praktyczne"
      ],
      bestseller: false
    },
    {
      id: 5,
      tytul: "Żywienie Sportowca",
      opis: "Kompletny przewodnik po żywieniu dla piłkarzy na różnych etapach kariery.",
      cena: "29 zł",
      strony: "45 stron",
      poziom: "Wszystkie",
      ikona: "🥗",
      format: "PDF",
      zawiera: [
        "Dieta w sezonie",
        "Suplementacja",
        "Nawodnienie",
        "Przepisy dla sportowców",
        "Kalkulatory BMI"
      ],
      bestseller: false
    },
    {
      id: 6,
      tytul: "Bramkarstwo - Od Podstaw do Mistrzostwa",
      opis: "Specjalistyczny materiał dla bramkarzy wszystkich poziomów zaawansowania.",
      cena: "55 zł",
      strony: "75 stron",
      poziom: "Bramkarze",
      ikona: "🥅",
      format: "PDF + Video",
      zawiera: [
        "Technika łapania",
        "Pozycjonowanie",
        "Gra nogami",
        "18 filmów specjalistycznych",
        "Ćwiczenia koordynacyjne"
      ],
      bestseller: false
    }
  ];

  const EbookCard = ({ ebook }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
      {ebook.bestseller && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-3 py-1 rounded-full font-bold z-10">
          BESTSELLER
        </div>
      )}
      
      <div className="h-32 bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
        <div className="text-6xl">{ebook.ikona}</div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">{ebook.tytul}</h3>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-full ml-2">
            {ebook.poziom}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{ebook.opis}</p>
        
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <span>{ebook.strony}</span>
          <span>{ebook.format}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Zawiera:</h4>
          <ul className="space-y-1">
            {ebook.zawiera.map((item, index) => (
              <li key={index} className="flex items-center text-xs text-gray-600">
                <span className="text-yellow-500 mr-2 text-sm">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {ebook.cena}
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold text-sm">
            Kup teraz
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                E-booki
              </span> i Materiały
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Rozwijaj swoje umiejętności z naszymi cyfrowymi materiałami edukacyjnymi. 
              Profesjonalne treści stworzone przez ekspertów dla zawodników wszystkich poziomów.
            </p>
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">1000+</div>
                <div className="text-gray-600">Pobrań</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">15+</div>
                <div className="text-gray-600">Tytułów</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-600">Dostęp</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">98%</div>
                <div className="text-gray-600">Satysfakcji</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-yellow-400 to-yellow-600">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">
              Dlaczego nasze e-booki?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-black mb-2">Natychmiastowy dostęp</h3>
                <p className="text-black opacity-80">Pobierz i zacznij korzystać już teraz</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="font-bold text-black mb-2">Materiały od ekspertów</h3>
                <p className="text-black opacity-80">Stworzone przez doświadczonych trenerów</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-bold text-black mb-2">Multiplatform</h3>
                <p className="text-black opacity-80">Dostępne na wszystkich urządzeniach</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Nasza kolekcja e-booków
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ebooki.map(ebook => (
                <EbookCard key={ebook.id} ebook={ebook} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Zacznij swoją drogę do <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">sukcesu</span>
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Dołącz do tysięcy zawodników, którzy rozwijają swoje umiejętności z naszymi materiałami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Przeglądaj wszystkie
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
                Kontakt
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Ebooki;