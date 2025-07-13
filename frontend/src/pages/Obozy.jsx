import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Obozy = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch('camps.json')
      .then(res => res.json())
      .then(data => setCamps(data));
  }, []);

  return (
    <div className="bg-black text-yellow-400 min-h-screen flex flex-col">
      <Navbar />

      <section
        className="relative h-[60vh] bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/glowna-obozy.jpg')" }}
      >
        <div className="text-center bg-black/70 p-6 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Obozy i Półkolonie Lato 2025</h1>
          <p className="text-lg md:text-xl">Niezapomniane wakacje z Future Football Club!</p>
        </div>
      </section>

      {/* nagłówek zostaje */}
      
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 space-y-16">
        <h2 className="text-4xl md:text-6xl text-center font-bold mb-12">Obozy</h2>

        {camps.map((camp) => (
          <div key={camp.id} className="bg-zinc-900 rounded-2xl p-8 shadow-xl space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img src={camp.image} alt={camp.title} className="rounded-xl object-cover w-full h-64" />
              <div>
                <h3 className="text-3xl font-bold mb-4">{camp.title}</h3>
                <ul className="text-yellow-300 list-disc list-inside space-y-1 mb-4">
                  <li><strong>Termin:</strong> {camp.date}</li>
                  <li><strong>Miejsce:</strong> {camp.place}</li>
                  <li><strong>Cena:</strong> {camp.price}</li>
                  <li><strong>W cenie:</strong> {camp.details}</li>
                </ul>
                {camp.documentLink && (
                  <a href={camp.documentLink} download className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg hover:bg-yellow-300 transition">Pobierz dokumenty</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Obozy;
