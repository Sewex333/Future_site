import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ShopSite = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/items');
        if (!res.ok) throw new Error('Błąd sieci');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Błąd pobierania produktów:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <Navbar />
       <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex justify-center mb-6">
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Sklep Future
            </h1>
          </div>
        </div>
      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-400">Ładowanie produktów...</p>
          ) : error ? (
            <p className="text-center text-red-500">Błąd ładowania produktów.</p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={`/sklep/${item.id}`}
                  className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-2xl transform transition hover:-translate-y-1 hover:scale-105 border hover:border-yellow-400"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <h2 className="text-xl font-bold mb-1 hover:text-yellow-400 transition">{item.name}</h2>
                  <p className="text-2xl font-extrabold text-yellow-500">{item.price.toFixed(2)} zł</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopSite;