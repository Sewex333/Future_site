import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/items');
        if (!res.ok) throw new Error(`Błąd: ${res.status}`);
        const data = await res.json();
        const found = data.find((item) => item.id.toString() === id);
        if (!found) {
          setError(true);
        } else {
          setProduct(found);
        }
      } catch (err) {
        console.error('Błąd pobierania produktu:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-400">Ładowanie produktu...</p>;
  if (error || !product) return <p className="text-center py-20 text-red-600">Produkt nie znaleziony lub wystąpił błąd.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white my-10">
      <Navbar />
      <main className="flex-grow py-20 px-4">
        <div className="max-w-4xl mx-auto bg-neutral-800 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8 border border-neutral-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:max-w-md object-contain rounded-xl border border-neutral-700"
          />
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
              <p className="text-neutral-300 mb-4">{product.opis}</p>
              <p className="text-3xl font-extrabold text-yellow-500">{product.price.toFixed(2)} zł</p>
            </div>
            <Link
              to={`/sklep/${product.id}/checkout`}
              className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black text-center py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Przejdź do zakupu
            </Link>
              <Link
              to={`/sklep/`}
              className="mt-6 bg-red-500 hover:bg-red-400 text-black text-center py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Powrót do sklepu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;