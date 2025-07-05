import React, { useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'

const faqData = {
  "faq": [
    {
      "id": 1,
      "pytanie": "Jakie są godziny treningów?",
      "odpowiedz": "Treningi odbywają się od poniedziałku do piątku w godzinach 16:00-18:00, a w weekendy 10:00-12:00."
    },
    {
      "id": 2,
      "pytanie": "Jaki jest koszt uczestnictwa?",
      "odpowiedz": "Miesięczna składka wynosi 150 zł. Dostępne są również karnety półroczne i roczne z rabatem."
    },
    {
      "id": 3,
      "pytanie": "Czy jest możliwość treningu próbnego?",
      "odpowiedz": "Tak, oferujemy jeden bezpłatny trening próbny dla każdego nowego zawodnika."
    },
    {
      "id": 4,
      "pytanie": "Jaki sprzęt jest potrzebny?",
      "odpowiedz": "Podstawowy sprzęt to korki, getry, spodenki i koszulka. Piłki zapewniamy podczas treningów."
    },
    {
      "id": 5,
      "pytanie": "Od jakiego wieku można rozpocząć treningi?",
      "odpowiedz": "Przyjmujemy dzieci od 6 roku życia. Mamy grupy podzielone wiekowo."
    },
    {
      "id": 6,
      "pytanie": "Gdzie odbywają się treningi?",
      "odpowiedz": "Treningi odbywają się na kompleksie sportowym przy ul. Sportowej 15 w Łodzi."
    }
  ]
};

const Kontakt = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="bg-black text-white p-4 text-center">
        <h3 className="text-xl font-bold">⚽ Football Club</h3>
      </div>
      <div className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-yellow-400">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-8 text-center">
              <h1 className="text-4xl font-bold text-black mb-2">
                Zacznij swoją piłkarską przygodę już dziś!
              </h1>
              <div className="w-24 h-1 bg-black mx-auto"></div>
            </div>
            
            <div className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center justify-center">
                  <span className="text-yellow-500 mr-2">📞</span>
                  Kontakt
                </h2>
                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-6 border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-black mb-4">Damian Pepliński</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-gray-800">
                      <span className="text-yellow-600 mr-2">📞</span>
                      <span className="font-semibold">505 205 550</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-800">
                      <span className="text-yellow-600 mr-2">📧</span>
                      <span className="font-semibold">ffc.biuro@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-yellow-400">
            <div className="bg-gradient-to-r from-black to-gray-800 p-8 text-center">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                Najczęściej zadawane pytania
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                {faqData.faq.map((item) => (
                  <div key={item.id} className="border-2 border-yellow-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full p-4 text-left bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 flex justify-between items-center"
                    >
                      <span className="font-semibold text-black">{item.pytanie}</span>
                      <span className={`text-yellow-600 transition-transform duration-300 ${activeAccordion === item.id ? 'rotate-180' : ''}`}>
                        ⬇️
                      </span>
                    </button>
                    {activeAccordion === item.id && (
                      <div className="p-4 bg-white border-t-2 border-yellow-200">
                        <p className="text-gray-700">{item.odpowiedz}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Kontakt;