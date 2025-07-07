import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        const res = await fetch('/api/items');
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

  if (loading) return <p className="text-center py-20">Ładowanie produktu...</p>;
  if (error || !product) return <p className="text-center py-20 text-red-600">Produkt nie znaleziony.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-40 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:max-w-md object-contain rounded-xl"
          />
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.opis}</p>
              <p className="text-2xl text-blue-600 font-semibold mb-4">
                {product.price.toFixed(2)} zł
              </p>
            </div>
            <a
              href="https://secure.payu.com/api/v2_1/orders"
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kup teraz przez PayU
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
