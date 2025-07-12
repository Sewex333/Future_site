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

  if (loading) return <p className="text-center py-20 text-gray-700">Ładowanie produktów...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Nie udało się załadować produktów. Spróbuj ponownie później.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white"> 
    
      <Navbar />

      <main className="flex-grow py-12 px-4 my-10">
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/sklep/${item.id}`}
              className="group bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-yellow-500" // Subtelna ramka na hover
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{item.name}</h2> 
              <p className="text-2xl font-extrabold text-yellow-500 mt-2">{item.price.toFixed(2)} zł</p> 
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopSite;