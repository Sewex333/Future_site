import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Oferta = () => {
  const [oferty, setOferty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOferty = async () => {
      try {
        const response = await fetch('/api/oferty');
        if (!response.ok) throw new Error('Problem z pobraniem danych');
        const data = await response.json();
        setOferty(data);
      } catch (error) {
        console.error('Błąd:', error);
        setError('Nie udało się załadować ofert');
      } finally {
        setLoading(false);
      }
    };
    fetchOferty();
  }, []);

  const OfferCard = ({ oferta }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100">
      <div className={`h-32 bg-${oferta.kolor} flex items-center justify-center relative`}>
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
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Program zawiera:</h4>
          <ul className="space-y-1">
            {Array.isArray(oferta.features) ? (
              oferta.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-500 mr-2 font-bold">⚽</span>
                  {feature}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-600">Brak informacji</li>
            )}
          </ul>
        </div>

        <Link to={oferta.link}>
          <button className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 font-semibold shadow-lg">
            Sprawdź szczegóły
          </button>
        </Link>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
            <p>Ładowanie ofert...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
              Treningi Piłkarskie Future Football Club
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Odkryj swoją pasję do piłki nożnej! Nasze programy treningowe pomogą Ci rozwinąć umiejętności techniczne, taktyczne i fizyczne. Dołącz do grona zawodników, którzy realizują swoje futbolowe marzenia.
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
                <div className="text-3xl font-bold text-black mb-2">2017</div>
                <div className="text-gray-600">Doświadczenie od</div>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-3xl font-bold text-yellow-600 mb-2">250+</div>
                <div className="text-gray-600">Aktywnych Zawodników</div>
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
              Znajdź swój idealny program treningowy
            </h2>
            {oferty.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Brak dostępnych ofert. Sprawdź później!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {oferty.map(oferta => (
                  <OfferCard key={oferta.id} oferta={oferta} />
                ))}
              </div>
            )}
            <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Treningi zespołowe</h3>
              <p className="text-gray-600">
                Oferujemy treningi zespołowe dla różnych kategorii wiekowych i poziomów zaawansowania. Nasze programy są dostosowane do potrzeb zawodników, od początkujących po zaawansowanych, i skupiają się na rozwoju techniki, taktyki oraz kondycji fizycznej.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Treningi dla juniorów (U10, U12, U14)</li>
                <li>Treningi dla seniorów</li>
                <li>Treningi dla drużyn kobiecych</li>
                <li>Indywidualne sesje z trenerem</li>
              </ul>
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
              Rozpocznij swoją piłkarską przygodę już dziś!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Dołącz do Future Football Club i rozwijaj swoje umiejętności pod okiem doświadczonych trenerów
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#form">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors cursor-pointer">
                  Umów trening próbny
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Oferta;