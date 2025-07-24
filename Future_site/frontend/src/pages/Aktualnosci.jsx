import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Aktualnosci = () => {
  const [aktualnosci, setAktualnosci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAktualnosci = async () => {
      try {
        const response = await fetch('/api/aktualnosci');
        if (!response.ok) throw new Error('Problem z pobraniem danych');
        const data = await response.json();
        setAktualnosci(data);
      } catch (error) {
        console.error('Błąd:', error);
        setError('Nie udało się załadować aktualności');
      } finally {
        setLoading(false);
      }
    };
    fetchAktualnosci();
  }, []);

  const AktualnoscCard = ({ aktualnosc }) => (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${aktualnosc.wyrozniany ? 'border-yellow-400' : 'border-black'}`}>
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
        <div className="text-4xl mb-2">{aktualnosc.obrazek}</div>
        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
          {aktualnosc.kategoria}
        </span>
        {aktualnosc.wyrozniany && (
          <div className="mt-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              WYRÓŻNIONE
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-gray-500 text-sm mb-2">{aktualnosc.data}</p>
        <h3 className="text-xl font-bold text-black mb-3">{aktualnosc.tytul}</h3>
        <p className="text-gray-700 mb-4">{aktualnosc.opis}</p>
        
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
            <p>Ładowanie aktualności...</p>
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
      <div className="min-h-screen bg-white">
        <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20"></div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white text-2xl">
                📰
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Aktualności
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Bądź na bieżąco z najnowszymi wydarzeniami z życia Future Football Club. 
              Sukcesy naszych zawodników, informacje o treningach i nadchodzące wydarzenia.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Największe Osiągniecia
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            
            {aktualnosci.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Brak aktualności. Sprawdź później!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {aktualnosci.map(aktualnosc => (
                  <AktualnoscCard key={aktualnosc.id} aktualnosc={aktualnosc} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Śledź nas na Facebook
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4">
                 Najnowsze zdjęcia z treningów, relacje z meczów i ważne informacje
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gray-100 p-8 rounded-lg border-2 border-black shadow-lg">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFutureSportClub&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                  width="500"
                  height="700"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white text-2xl">
                📧
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Future FC
            </h2>
             <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              ⚽ Chcesz rozwijać swoje umiejętności w profesjonalnym środowisku?
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
              Dołącz do <strong>Future FC</strong> – klubu, który stawia na pasję, rozwój i ducha zespołu. Jesteśmy miejscem, gdzie talent spotyka możliwości.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/formularz"
                className="inline-flex items-center bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Skontaktuj się
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">250+</div>
                <div className="text-gray-700 font-semibold">Zawodników</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">15+</div>
                <div className="text-gray-700 font-semibold">Trenerów</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
                <div className="text-3xl font-bold text-black mb-2">12</div>
                <div className="text-gray-700 font-semibold">Turniejów</div>
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

export default Aktualnosci;