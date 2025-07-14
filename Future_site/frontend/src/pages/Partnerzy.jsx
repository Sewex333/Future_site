import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Partnerzy = () => {
  const [partnerzy, setPartnerzy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartnerzy = async () => {
      try {
        const response = await fetch('/api/partnerzy');
        if (!response.ok) throw new Error('Problem z pobraniem danych');
        const data = await response.json();
        setPartnerzy(data);
      } catch (error) {
        console.error('Błąd:', error);
        setError('Nie udało się załadować partnerów');
      } finally {
        setLoading(false);
      }
    };
    fetchPartnerzy();
  }, []);

  const PartnerCard = ({ partner }) => {
    const handleVisitPartner = () => {
      if (partner.link && partner.link !== '#') {
        window.open(partner.link, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black group">
        <div className="relative p-8 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-center">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          
          {/* Okrągły obrazek partnera */}
          <div className="relative z-10 flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
              <img 
                src={partner.image || partner.logo || '/default-partner.jpg'} 
                alt={partner.nazwa}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600" style={{display: 'none'}}>
                {partner.nazwa.charAt(0)}
              </div>
            </div>
          </div>

          <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold inline-block">
            {partner.kategoria}
          </span>
          
          {partner.typ === 'strategiczny' && (
            <div className="mt-2">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                PARTNER STRATEGICZNY
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4 z-10">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
            {partner.nazwa}
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
            {partner.opis_rozszerzony || partner.opis}
          </p>
          
          {partner.dostepny !== false && (
            <button 
              onClick={handleVisitPartner}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 border-2 border-black shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Odwiedź partnera
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
            <p className="text-gray-600">Ładowanie partnerów...</p>
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
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-colors"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Podziel partnerów na typy
  const partnerzyGlowni = partnerzy.filter(p => p.typ === 'partner' || !p.typ);
  const partnerzyStrategiczni = partnerzy.filter(p => p.typ === 'strategiczny');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20"></div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white text-2xl">
                🤝
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Nasi Partnerzy
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Razem tworzymy przyszłość futbolu! Poznaj firmy i osoby, które wspierają 
              Future Football Club w budowaniu jednej z najlepszych akademii piłkarskiej w regionie.
            </p>
          </div>
        </section>

        {/* Główni Partnerzy */}
        {partnerzyGlowni.length > 0 && (
          <section className="py-20 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-black mb-4">
                  Główni Partnerzy Klubu
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Firmy i osoby, które każdego dnia wspierają rozwój naszego klubu
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnerzyGlowni.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Partnerzy Strategiczni */}
        {partnerzyStrategiczni.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-black mb-4">
                  Partnerzy Strategiczni
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Kluczowe instytucje wspierające długoterminowy rozwój naszej akademii
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnerzyStrategiczni.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Brak partnerów */}
        {partnerzy.length === 0 && (
          <section className="py-20 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-600 text-lg">
                Aktualnie trwa aktualizacja listy partnerów. Sprawdź później!
              </p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-white">
                <div className="text-white text-2xl">⭐</div>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-black">
              Zostań Partnerem Future FC
            </h2>
            <p className="text-xl mb-10 text-black opacity-90 max-w-3xl mx-auto">
              Dołącz do ekskluzywnego grona firm wspierających jedną z najlepszych akademii piłkarskiej w regionie. 
              Razem budujemy przyszłość polskiego futbolu i tworzymy niepowtarzalne możliwości rozwoju dla młodych talentów!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/kontakt">
                <button className="bg-white border-2 border-black text-black px-8 py-3 rounded-lg font-semibold  transition-colors cursor-pointer">
                  Skontaktuj się z nami
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Korzyści Partnerstwa */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Korzyści Partnerstwa
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                Sprawdź, jakie korzyści płyną ze współpracy z Future Football Club
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl font-bold">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Widoczność</h3>
                <p className="text-gray-300">Logo na strojach, banery na stadionie, promocja w mediach społecznościowych i podczas wydarzeń klubowych</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl font-bold">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Networking</h3>
                <p className="text-gray-300">Dostęp do ekskluzywnych wydarzeń klubowych, spotkań biznesowych i możliwości nawiązania nowych kontaktów</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl font-bold">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">CSR</h3>
                <p className="text-gray-300">Wspieranie lokalnej społeczności, rozwoju młodych talentów i pozytywnego wizerunku Twojej firmy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statystyki */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">{partnerzy.length}+</div>
                <div className="text-gray-700 font-semibold">Partnerów</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">250+</div>
                <div className="text-gray-700 font-semibold">Zawodników</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">25</div>
                <div className="text-gray-700 font-semibold">Trenerów</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">2017</div>
                <div className="text-gray-700 font-semibold">Doświadczenie od</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Partnerzy;