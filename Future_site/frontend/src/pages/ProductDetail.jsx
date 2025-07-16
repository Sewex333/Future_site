  import React, { useEffect, useState } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import Navbar from './Navbar';
  import Footer from './Footer';

  const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formattedOpis, setFormattedOpis] = useState('');

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await fetch('/api/items');
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

    useEffect(() => {
      if (product && product.opis) {
        const opisZHTML = product.opis.replace(/\r\n|\r|\n/g, '<br>');
        setFormattedOpis(opisZHTML);
      }
    }, [product]);

    // Funkcja do przetwarzania tekstu z dodatkowymi informacjami
    const processAdditionalInfo = (text) => {
      if (!text) return '';
      
      // Usuń słowo "Capelli" z tekstu
      let processedText = text.replace(/Capelli/g, '').replace(/\/\s*\)/, ')');
      
      // Jeśli tekst zawiera informacje o zestawie, zaktualizuj je
      if (processedText.includes('W skład zestawu wchodzą:')) {
        processedText = processedText.replace(
          /W skład zestawu wchodzą:[^.]*\./,
          'W skład zestawu wchodzą: koszulka, spodenki, getry, dresy, spodnie, torba / plecak lub worek.'
        );
      }
      
      return processedText;
    };

    if (loading) {
      return (
        <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-400">Ładowanie produktu...</p>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    if (error || !product) {
      return (
        <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-xl text-red-500 mb-4">Produkt nie znaleziony</p>
              <Link
                to="/sklep"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Powrót do sklepu
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <Link to="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                Strona główna
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/sklep" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                Sklep
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-300">{product.name}</span>
            </nav>

            <div className="bg-neutral-800 shadow-2xl rounded-3xl overflow-hidden border border-neutral-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Sekcja zdjęcia */}
                <div className="p-8 bg-neutral-750 flex items-center justify-center">
                  <div className="relative group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-md object-contain rounded-2xl border border-neutral-600 shadow-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Sekcja informacji */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
                      {product.name}
                    </h1>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-yellow-500 mb-3">Opis produktu:</h2>
                      <p
                        className="text-neutral-300 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: formattedOpis }}
                      ></p>
                    </div>

                    {/* Dodatkowe informacje */}
                    {product.dodatkowe_informacje && (
                      <div className="mb-6 p-4 bg-neutral-700 rounded-xl border border-neutral-600">
                        <h2 className="text-lg font-semibold text-yellow-500 mb-3">Dodatkowe informacje:</h2>
                        <p className="text-neutral-300 leading-relaxed">
                          {processAdditionalInfo(product.dodatkowe_informacje)}
                        </p>
                      </div>
                    )}

                    {/* Cena */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-extrabold text-yellow-500">
                          {product.price.toFixed(2)} zł
                        </span>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Dostępny
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Przyciski akcji */}
                  <div className="space-y-4">
                    <Link
                      to={`/sklep/${product.id}/checkout`}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                      </svg>
                      Przejdź do zakupu
                    </Link>
                    
                    <Link
                      to="/sklep"
                      className="w-full bg-neutral-600 hover:bg-neutral-500 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Powrót do sklepu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  export default ProductDetail;