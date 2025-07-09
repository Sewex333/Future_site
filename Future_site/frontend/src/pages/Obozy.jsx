import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';
import Form from './Form';

const Obozy = () => {
  const [obozy, setObozy] = useState([]);
  const [polkolonie, setPolkolonie] = useState([]);

  useEffect(() => {
  const fetchObozy = async () => {
    try {
      const response = await fetch("/api/obozy");
      const data = await response.json();
      setObozy(data.filter(item => item.type === 'oboz'));
      setPolkolonie(data.filter(item => item.type === 'polkolonia'));
    } catch (error) {
      console.error('Błąd pobierania obozów:', error);
    }
  };
  
  fetchObozy(); // Tutaj wywołujemy funkcję
}, []);
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section
        className="relative h-[70vh] bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/glowna-obozy.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="text-center bg-black/80 p-8 rounded-2xl border-2 border-yellow-500 relative z-10 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="text-3xl">⚽</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
            Obozy i Półkolonie Lato 2025
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Niezapomniane wakacje z Future Football Club!
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 space-y-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="text-4xl">🏕️</div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400">
            Obozy Piłkarskie
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Intensywne szkolenie w malowniczych lokalizacjach z profesjonalną opieką trenerską
          </p>
        </div>

        {obozy.map((camp) => (
          <div key={camp.id} className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src={camp.image} 
                  alt={camp.title} 
                  className="rounded-xl object-cover w-full h-64 border-2 border-gray-700" 
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                  OBÓZ 2025
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-yellow-400">{camp.title}</h3>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <ul className="text-yellow-300 space-y-2">
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">📅</span>
                      <strong>Termin:</strong> <span className="ml-2">{camp.date}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">📍</span>
                      <strong>Miejsce:</strong> <span className="ml-2">{camp.place}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">💰</span>
                      <strong>Cena:</strong> <span className="ml-2 text-yellow-400 font-bold">{camp.price}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-3 mt-1">⚽</span>
                      <div>
                        <strong>W cenie:</strong> 
                        <span className="ml-2 block text-gray-300">{camp.details}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  {camp.documentLink && (
                    <a 
                      href={camp.documentLink} 
                      download 
                      className="bg-yellow-500 text-black font-bold px-5 py-2 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
                    >
                      📄 Dokumenty
                    </a>
                  )}
                  {camp.sport_kart && (
                    <a 
                      href={camp.sport_kart} 
                      download 
                      className="bg-red text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      ⚕️ Karta zdrowia
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-2xl font-semibold text-yellow-400 mb-3 flex items-center">
                  <span className="mr-3">ℹ️</span> Szczegóły programu
                </h4>
                <p className="text-gray-300 leading-relaxed">{camp.szczegoly}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center">
                  <span className="mr-3">💳</span> Dokumenty i płatność
                </h4>
                <p className="text-gray-300 leading-relaxed">{camp.platnosc}</p>
              </div>

              {camp.documents && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center">
                    <span className="mr-3">📋</span> Wymagane dokumenty
                  </h4>
                  <p className="whitespace-pre-line text-gray-300 leading-relaxed">{camp.documents}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="text-center mb-16 pt-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="text-4xl">🌞</div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400">
            Półkolonie Letnie Szczecin 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Codzienne treningi i zabawa w rodzinnej atmosferze Future Football Club
          </p>
        </div>

        {polkolonie.map((camp) => (
          <div key={camp.id} className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src={camp.image} 
                  alt={camp.title} 
                  className="rounded-xl object-cover w-full h-64 border-2 border-gray-700" 
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                  PÓŁKOLONIA 2025
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-yellow-400">{camp.title}</h3>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <ul className="text-yellow-300 space-y-2">
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">📅</span>
                      <strong>Termin:</strong> <span className="ml-2">{camp.date}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">📍</span>
                      <strong>Miejsce:</strong> <span className="ml-2">{camp.place}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-3">💰</span>
                      <strong>Cena:</strong> <span className="ml-2 text-yellow-400 font-bold">{camp.price}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-3 mt-1">🎯</span>
                      <div>
                        <strong>W programie:</strong> 
                        <span className="ml-2 block text-gray-300">{camp.details}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <Link to="/formularz" className="inline-flex items-center bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">
                ✉️ Zarezerwuj miejsce
                </Link>
                
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center">
                  <span className="mr-3">🌟</span> Dlaczego warto?
                </h4>
                <p className="text-gray-300 leading-relaxed">{camp.szczegoly}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center">
                  <span className="mr-3">📝</span> Jak się zapisać?
                </h4>
                <p className="text-gray-300 leading-relaxed">{camp.platnosc}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-black rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="text-4xl">🏆</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Nie czekaj - miejsca są ograniczone!</h3>
            <p className="text-xl mb-6 opacity-90">
              Zapisz się już dziś i zapewnij swojemu dziecku niezapomniane wakacje z piłką nożną
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link to="/kontakt">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors cursor-pointer">
                  Kontakt
                </button>                
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Obozy;