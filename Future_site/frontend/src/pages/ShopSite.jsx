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
        const res = await fetch('http://localhost:8000/api/items');
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

  if (loading) return <p className="text-center py-20">Ładowanie produktów...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Nie udało się załadować produktów.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} to={`/sklep/${item.id}`} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="w-full h-48 object-contain rounded-xl mb-4" />
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-blue-600 text-lg font-semibold mt-2">{item.price.toFixed(2)} zł</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopSite;
