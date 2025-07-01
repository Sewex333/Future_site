// Shop.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('http://localhost:8000/api/items');
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-100 py-40 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Witaj na oficjalnym sklepie <span className="text-yellow-500">Future</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition">
                <img src={item.image} alt={item.name} className="w-full h-100 object-cover rounded-xl mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-black">{item.name}</h2>
                <p className="text-gray-700 mb-4">{item.price.toFixed(2)} zł</p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                  Zobacz szczegóły
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
