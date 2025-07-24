import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Ebooki = () => {
  const [ebooki, setEbooki] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem('formSubmitted') === 'true';
    setFormSent(isSubmitted);

    const fetchEbooki = async () => {
      try {
        const response = await fetch('/api/ebooki');
        if (!response.ok) throw new Error('Problem z pobraniem danych');
        const data = await response.json();
        setEbooki(data);
      } catch (error) {
        console.error('Błąd:', error);
        setError('Nie udało się załadować e-booków');
      } finally {
        setLoading(false);
      }
    };
    fetchEbooki();
  }, []);

  const handleDownload = (pdfPath, tytul) => {
  if (!formSent) {
    setDownloadMessage("Wypełnij formularz, aby pobrać e-book.");
    setTimeout(() => setDownloadMessage(''), 3000);
    return;
  }

  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = tytul.replace(/[^\w\s]/gi, '') + '.pdf';
  link.click();

  setDownloadMessage(`Pobieranie "${tytul}" rozpoczęte!`);
  setTimeout(() => setDownloadMessage(''), 3000);
};

  const EbookCard = ({ ebook }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
        <div className="text-4xl mb-2">{ebook.ikona}</div>
        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
          E-BOOK PDF
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-3">{ebook.tytul}</h3>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{ebook.opis}</p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Co znajdziesz w e-booku:</h4>
          <ul className="space-y-1">
            {ebook.zawiera.map((item, index) => (
              <li key={index} className="flex items-center text-xs text-gray-600">
                <span className="text-yellow-500 mr-2 text-sm">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={() => handleDownload(ebook.pdfPath, ebook.tytul)}
          disabled={!formSent}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-sm flex items-center justify-center transition-colors duration-200 ${
            formSent
              ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          <span className="mr-2">📥</span>
          {formSent ? 'Pobierz PDF' : 'Wypełnij formularz'}
        </button>
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
            <p>Ładowanie e-booków...</p>
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
                📚
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              E-booki
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Rozwijaj swoje umiejętności z naszymi darmowymi e-bookami. 
              Profesjonalne treści stworzone przez ekspertów dla zawodników i rodziców.
            </p>
          </div>
        </section>

        {downloadMessage && (
          <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded mx-4 mt-4">
            <p className="text-center font-semibold">{downloadMessage}</p>
          </div>
        )}

        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Darmowe E-booki
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4">
                Pobierz nasze e-booki i rozwijaj swoją wiedzę o sporcie
              </p>
            </div>
            
            {ebooki.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Brak dostępnych e-booków. Sprawdź później!</p>
              </div>
            ) : (
              <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {ebooki.map(ebook => (
                  <EbookCard key={ebook.id} ebook={ebook} />
                ))}
              </div>

               {!formSent && (
                  <div className="text-center mt-6">
                    <Link 
                      to="/formularz"
                      className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                    >
                      Wypełnij formularz, aby pobrać e-booki
                    </Link>
                  </div>
                )}
                </>
            )}
          </div>
        </section>
        <section className="py-16 bg-yellow-400">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">
              Dlaczego nasze e-booki?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-black mb-2">Całkowicie darmowe</h3>
                <p className="text-black opacity-80">Pobierz i korzystaj bez żadnych opłat</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="font-bold text-black mb-2">Materiały od ekspertów</h3>
                <p className="text-black opacity-80">Stworzone przez doświadczonych trenerów</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-bold text-black mb-2">Dostępne 24/7</h3>
                <p className="text-black opacity-80">Pobierz kiedy chcesz, ile razy chcesz</p>
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
              Dołącz do <strong>Future FC</strong> – klubu, który stawia na pasję, rozwój i ducha zespołu.
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

export default Ebooki;