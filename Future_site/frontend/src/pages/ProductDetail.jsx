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
      console.log('Pobieram dane dla produktu o ID:', id);
      try {
        const res = await fetch('http://localhost:8000/api/items');
        if (!res.ok) throw new Error(`Błąd: ${res.status}`);
        const data = await res.json();

        const found = data.find((item) => item.id === id);
        if (!found) {
          console.warn('Nie znaleziono produktu o ID:', id);
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

  if (loading) return <p className="text-center py-20 text-gray-700">Ładowanie produktu...</p>;
  if (error || !product) return <p className="text-center py-20 text-red-600">Produkt nie znaleziony lub wystąpił błąd.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white my-10"> 
      <Navbar />

      <main className="flex-grow py-20 px-4">
        <div className="max-w-5xl mx-auto bg-neutral-800 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10"> 
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-96 object-contain rounded-xl border border-neutral-700 shadow-md" 
            />
          </div>
          <div className="flex flex-col justify-between flex-1 w-full md:w-1/2 text-center md:text-left">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 text-white">{product.name}</h1> 
              <p className="text-neutral-300 text-lg mb-6 leading-relaxed">{product.opis}</p> 
              <p className="text-4xl font-extrabold text-yellow-500 mb-6"> 
                {product.price.toFixed(2)} zł
              </p>
            </div>
            <Link
              to={`/sklep/${id}/checkout`}
              className="mt-6 w-full md:w-auto bg-yellow-500 text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg text-center" // Wyraźny złoty przycisk
            >
              Przejdź do zamówienia
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;