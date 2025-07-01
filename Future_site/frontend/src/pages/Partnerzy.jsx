import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Partnerzy = () => {
  const partnerzy = [
    {
      id: 1,
      nazwa: "Labran",
      opis: "Galanteria skórzana - oficjalne torby i akcesoria klubowe",
      kategoria: "Wyposażenie",
      image: "/images/partner-labran.jpg"
    },
    {
      id: 2,
      nazwa: "Grzegorz Nowotniak",
      opis: "Oficjalny spiker meczów Future Football Club",
      kategoria: "Media",
      image: "/images/partner-spiker.jpg"
    },
    {
      id: 3,
      nazwa: "MOSRiR Szczecin",
      opis: "Oficjalny partner infrastruktury sportowej klubu",
      kategoria: "Infrastruktura",
      image: "/images/partner-mosrir.jpg"
    },
    {
      id: 4,
      nazwa: "Pizzeria Swojska Pomorzany",
      opis: "Catering dla zawodników i kibiców Future FC",
      kategoria: "Catering",
      image: "/images/partner-pizzeria.jpg"
    },
    {
      id: 5,
      nazwa: "Szmaragd Cafe",
      opis: "Miejsce spotkań kibiców i zawodników",
      kategoria: "Gastronomia",
      image: "/images/partner-cafe.jpg"
    },
    {
      id: 6,
      nazwa: "SportPlus Szczecin",
      opis: "Oficjalny dostawca pucharów i nagród klubowych",
      kategoria: "Nagrody",
      image: "/images/partner-sportplus.jpg"
    },
    {
      id: 7,
      nazwa: "Radek Janukiewicz",
      opis: "Główny trener bramkarzy Future Football Club",
      kategoria: "Sztab Szkoleniowy",
      image: "/images/partner-bramkarz.jpg"
    }
  ];

  const partnerzyClubu = [
    {
      id: 8,
      nazwa: "Piotr Matulka",
      opis: "Psycholog sportowy Future Football Club",
      kategoria: "Psychologia Sportu",
      image: "/images/partner-mentalny.jpg"
    },
    {
      id: 9,
      nazwa: "Centrum Rozwoju Nauki i Biznesu",
      opis: "Partner edukacyjny dla zawodników akademii",
      kategoria: "Edukacja",
      image: "/images/partner-europabiz.jpg"
    },
    {
      id: 10,
      nazwa: "OLYMPIA",
      opis: "Oficjalny dostawca suplementów dla zawodników",
      kategoria: "Suplementy",
      image: "/images/partner-olympia.jpg"
    },
    {
      id: 11,
      nazwa: "Myjnia Posejdon",
      opis: "Partner usługowy - dbamy o czystość klubowych pojazdów",
      kategoria: "Usługi",
      image: "/images/partner-posejdon.jpg"
    },
    {
      id: 12,
      nazwa: "Gigi Cargo",
      opis: "Transport zawodników na mecze wyjazdowe",
      kategoria: "Transport",
      image: "/images/partner-cargo.jpg"
    },
    {
      id: 13,
      nazwa: "KonTour Luxury Travel",
      opis: "Organizacja wyjazdów na turnieje międzynarodowe",
      kategoria: "Turystyka Sportowa",
      image: "/images/partner-travel.jpg"
    }
  ];

  const PartnerCard = ({ partner }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black">
      <div className="h-48 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="text-black text-6xl font-bold opacity-30 z-10">
          {partner.nazwa.charAt(0)}
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-black">{partner.nazwa}</h3>
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold border border-black">
            {partner.kategoria}
          </span>
        </div>
        <p className="text-gray-700 mb-4 leading-relaxed">{partner.opis}</p>
        <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 border-2 border-black shadow-lg hover:shadow-xl">
          Dowiedz się więcej
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20"></div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Nasi Partnerzy
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Razem tworzymy przyszłość futbolu! Poznaj firmy i osoby, które wspierają 
              Future Football Club w budowaniu najlepszej akademii piłkarskiej w regionie.
            </p>
          </div>
        </div>

        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Główni Partnerzy Klubu
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerzy.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Partnerzy Strategiczni
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Firmy i instytucje, które wspierają rozwój naszej akademii futbolowej
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerzyClubu.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-white">
                <div className="w-10 h-10 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-black">
              Zostań Partnerem Future FC
            </h2>
            <p className="text-xl mb-10 text-black opacity-90 max-w-3xl mx-auto">
              Dołącz do ekskluzywnego grona firm wspierających najlepszą akademię futbolową w regionie. 
              Razem budujemy przyszłość polskiego futbolu!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-black text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-black">
                Pakiety Partnerskie
              </button>
              <button className="border-4 border-black text-black bg-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                Skontaktuj się z nami
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Korzyści Partnerstwa
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Widoczność</h3>
                <p className="text-gray-300">Logo na strojach, baner na stadionie, promocja w mediach społecznościowych</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Networking</h3>
                <p className="text-gray-300">Dostęp do ekskluzywnych wydarzeń klubowych i spotkań biznesowych</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">CSR</h3>
                <p className="text-gray-300">Wspieranie lokalnej społeczności i rozwoju młodych talentów</p>
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