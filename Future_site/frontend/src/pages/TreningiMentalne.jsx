import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const TreningiMentalne = () => {
  const programy = [
    {
      id: 1,
      tytul: "Pewność siebie na boisku",
      opis: "Budowanie mentalnej siły i pewności siebie podczas gry",
      ikona: "🧠",
      szczegoly: [
        "Techniki wizualizacji przed meczem",
        "Pozytywne afirmacje futbolowe",
        "Praca nad self-talk podczas gry",
        "Budowanie wiary we własne umiejętności"
      ]
    },
    {
      id: 2,
      tytul: "Radzenie sobie z porażką",
      opis: "Jak przekształcić porażkę w motywację do dalszego rozwoju",
      ikona: "💪",
      szczegoly: [
        "Analiza błędów bez negatywnych emocji",
        "Uczenie się z porażek zespołowych",
        "Szybkie odbijanie się po stracie bramki",
        "Utrzymanie koncentracji po błędach"
      ]
    },
    {
      id: 3,
      tytul: "Koncentracja i fokus",
      opis: "Techniki utrzymania pełnej koncentracji przez 90 minut",
      ikona: "🎯",
      szczegoly: [
        "Techniki oddechowe przed wykonaniem rzutu karnego",
        "Medytacja w ruchu podczas gry",
        "Utrzymanie uwagi mimo presji kibiców",
        "Fokus na bieżącym momencie gry"
      ]
    },
    {
      id: 4,
      tytul: "Presja i stres przedmeczowy",
      opis: "Opanowanie stresu przed ważnymi meczami i turniejami",
      ikona: "🏆",
      szczegoly: [
        "Rutyna przedmeczowa redukująca stres",
        "Techniki relaksacyjne w szatni",
        "Radzenie sobie z presją oczekiwań",
        "Transformacja stresu w energię pozytywną"
      ]
    }
  ];

  const trenerzy = [
    {
      nazwa: "Damian Pepliński",
      specjalizacja: "Psycholog sportu",
      zdjecie: "/damian_peplinski.jpg"
    },
    {
      nazwa: "Wiktoria Peplińska",
      specjalizacja: "Trener mentalny",
      zdjecie: "/w_peplinska.png"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white text-2xl">
                🧠
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Treningi Mentalne
            </h1>
            <p className="text-xl text-center opacity-90 max-w-4xl mx-auto leading-relaxed">
              Mentalność u nas to podstawa. Bez mentalności wszystkie inne aspekty często schodzą na drugi plan. 
              Dlatego kładziemy ogromny nacisk na budowanie silnej psychiki naszych zawodników. 
              Wierzymy, że prawdziwa przewaga rodzi się w umyśle - to tam podejmowane są najważniejsze decyzje, 
              które decydują o sukcesie na boisku. 
            </p>
          </div>
        </div>

        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Programy Treningowe
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Kompleksowe podejście do rozwoju mentalnego młodych piłkarzy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programy.map(program => (
                <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
                    <div className="text-4xl mb-2">{program.ikona}</div>
                    <h3 className="text-2xl font-bold text-black">{program.tytul}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">{program.opis}</p>
                    <h4 className="font-bold text-black mb-3">Program obejmuje:</h4>
                    <ul className="space-y-2">
                      {program.szczegoly.map((szczegol, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{szczegol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Nasz Zespół Ekspertów
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {trenerzy.map((trener, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-8 text-center border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mx-auto mb-4">
                    <img src={trener.zdjecie} alt={trener.nazwa} className="w-full h-full object-cover"/>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{trener.nazwa}</h3>
                  <p className="text-yellow-600 font-semibold mb-2">{trener.specjalizacja}</p>
                  <p className="text-gray-600">{trener.doswiadczenie}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Nasza Metodologia
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Indywidualne Podejście</h3>
                <p className="text-gray-300">Każdy zawodnik otrzymuje spersonalizowany program rozwoju mentalnego</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Sprawdzone Metody</h3>
                <p className="text-gray-300">Stosujemy skuteczne techniki z akademii FC Barcelona, Ajax i Manchesteru City</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Ciągły Monitoring</h3>
                <p className="text-gray-300">Regularny pomiar postępów i dostosowywanie programu treningowego</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-white text-3xl">
                ⚽
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-black">
              Dołącz do Programu Treningów Mentalnych
            </h2>
            <p className="text-xl mb-10 text-black opacity-90 max-w-3xl mx-auto">
              Rozwijaj nie tylko swoje umiejętności techniczne, ale także mentalne. 
              Zapisz się na konsultację z naszym psychologiem sportu.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/formularz">
                <button className="bg-yellow-500 border-black border-2 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg cursor-pointer">
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

export default TreningiMentalne;