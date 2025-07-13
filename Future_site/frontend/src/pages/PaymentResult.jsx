import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchResult = async () => {
    try {
      const sessionId = searchParams.get('sessionId');
      
      const res = await fetch(
        `/api/p24/payment-result?sessionId=${sessionId}`
      );
      const data = await res.json();
      
      setResult(data);
      
      // Jeśli status jest pending, możesz spróbować ponownie za kilka sekund
      if (data.status === 'pending') {
        setTimeout(fetchResult, 3000); // Spróbuj ponownie po 3 sekundach
      }
    } catch (err) {
      console.error('Błąd pobierania wyniku płatności:', err);
      setResult({
        status: 'error',
        message: 'Wystąpił błąd podczas weryfikacji płatności.'
      });
    } finally {
      setLoading(false);
    }
  };

  fetchResult();
}, [searchParams]);

  if (loading) return <p className="text-center py-20">Weryfikacja płatności...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-40 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 text-center">
          {result?.status === 'success' ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Płatność zakończona sukcesem!</h1>
              <p className="text-xl mb-6">{result?.message}</p>
              <div className="text-5xl mb-6">🎉</div>
              <p className="text-gray-600">Numer zamówienia: {result?.sessionId}</p>
              <a 
                href="/" 
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Wróć do sklepu
              </a>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4 text-red-600">Problem z płatnością</h1>
              <p className="text-xl mb-6">{result?.message}</p>
              <div className="text-5xl mb-6">😕</div>
              <a 
                href="/"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Spróbuj ponownie
              </a>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentResult;