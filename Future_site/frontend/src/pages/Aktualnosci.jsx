import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Aktualnosci = () => {
  const najnowszeWiadomosci = [
    {
      id: 1,
      tytul: "Zwycięstwo w Turnieju Młodzieżowym!",
      data: "28 czerwca 2025",
      kategoria: "Sukcesy",
      opis: "Nasza drużyna U-16 zwyciężyła w Turnieju Młodzieżowym Szczecin Cup 2025!",
      obrazek: "🏆"
    },
    {
      id: 2,
      tytul: "Nowy trener w akademii",
      data: "25 czerwca 2025",
      kategoria: "Kadra",
      opis: "Do zespołu dołączył były piłkarz Ekstraklasy - Marcin Kowalski",
      obrazek: "👨‍🏫"
    },
    {
      id: 3,
      tytul: "Obóz letni 2025",
      data: "20 czerwca 2025",
      kategoria: "Wydarzenia",
      opis: "Rozpoczynamy zapisy na letni obóz piłkarski w Pobierowie",
      obrazek: "🏕️"
    }
  ];

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
              Najnowsze Wiadomości
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {najnowszeWiadomosci.map(wiadomosc => (
              <div key={wiadomosc.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
                  <div className="text-4xl mb-2">{wiadomosc.obrazek}</div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {wiadomosc.kategoria}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{wiadomosc.data}</p>
                  <h3 className="text-xl font-bold text-black mb-3">{wiadomosc.tytul}</h3>
                  <p className="text-gray-700 mb-4">{wiadomosc.opis}</p>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 px-4 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 border-2 border-black">
                    Czytaj więcej
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              Codziennie nowe zdjęcia z treningów, relacje z meczów i ważne informacje
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
            Newsletter Future FC
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Zapisz się do naszego newslettera i otrzymuj najważniejsze informacje 
            o klubie bezpośrednio na swoją skrzynkę mailową.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Twój adres email"
              className="flex-1 px-4 py-3 rounded-lg text-black border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 border-2 border-yellow-400">
              Zapisz się
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">150+</div>
              <div className="text-gray-700 font-semibold">Zawodników</div>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">25</div>
              <div className="text-gray-700 font-semibold">Trenerów</div>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">12</div>
              <div className="text-gray-700 font-semibold">Turniejów</div>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">8</div>
              <div className="text-gray-700 font-semibold">Lat doświadczenia</div>
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