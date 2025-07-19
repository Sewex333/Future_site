import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Checkout = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'Imię jest wymagane';
    if (!formData.lastName.trim()) errors.lastName = 'Nazwisko jest wymagane';
    if (!formData.email.trim()) {
      errors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Nieprawidłowy format email';
    }
    if (!formData.address.trim()) errors.address = 'Adres jest wymagany';
    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Kod pocztowy jest wymagany';
    } else if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
      errors.postalCode = 'Kod pocztowy musi być w formacie XX-XXX';
    }
    if (!formData.city.trim()) errors.city = 'Miasto jest wymagane';
    if (!formData.phone.trim()) {
      errors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^\+?\d{9,12}$/.test(formData.phone)) {
      errors.phone = 'Nieprawidłowy numer telefonu';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Proszę wypełnić poprawnie wszystkie pola formularza.');
      return;
    }

    try {
      // Send form data to new checkout endpoint
      const checkoutResponse = await fetch('/api/p24/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: id,
          productName: product.name,
          price: product.price,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error('Błąd wysyłania danych formularza');
      }

      // Proceed to payment
      const paymentResponse = await fetch('/api/p24/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: product.price,
          description: product.opis || 'Zakup produktu',
          email: formData.email,
          productId: id,
          productName: product.name,
        }),
      });

      const paymentData = await paymentResponse.json();
      if (paymentData.url) {
        window.location.href = paymentData.url;
      } else {
        alert('Błąd inicjalizacji płatności');
      }
    } catch (err) {
      console.error('Błąd podczas przetwarzania:', err);
      alert('Nie udało się przetworzyć zamówienia.');
    }
  };

  if (loading) return <p className="text-center py-20 text-gray-700">Ładowanie produktu...</p>;
  if (error || !product) return <p className="text-center py-20 text-red-600">Produkt nie znaleziony lub wystąpił błąd.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white"> 
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto bg-neutral-800 shadow-xl rounded-2xl p-8"> 
          <h1 className="text-3xl font-extrabold mb-8 text-center text-white">Twoje Zamówienie</h1> 
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Details */}
            <div className="md:w-1/2 border border-neutral-700 p-6 rounded-xl shadow-inner bg-neutral-900"> 
              <h2 className="text-2xl font-bold mb-4 text-white">Szczegóły produktu</h2>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain rounded-xl mb-4 border border-neutral-700" 
              />
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-neutral-300 mb-4">{product.opis}</p> 
              <p className="text-3xl text-yellow-500 font-extrabold"> 
                {product.price.toFixed(2)} zł
              </p>
            </div>
            <div className="md:w-1/2 p-6 rounded-xl border border-neutral-700 shadow-inner bg-neutral-900"> 
              <h2 className="text-2xl font-bold mb-4 text-white">Dane do zamówienia</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((key) => (
                  <div key={key}>
                    <label className="block text-white capitalize mb-1" style={{ color: 'white' }}>{key === 'firstName' ? 'Imię' : key === 'lastName' ? 'Nazwisko' : key === 'postalCode' ? 'Kod pocztowy' : key === 'city' ? 'Miasto' : key === 'phone' ? 'Numer telefonu' : key}</label>
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      placeholder={key === 'postalCode' ? 'XX-XXX' : key === 'phone' ? '+48XXXXXXXXX' : ''}
                      className={`w-full p-3 bg-neutral-700 text-white border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${formErrors[key] ? 'border-red-500' : 'border-neutral-600'}`} // Stylowane inputy
                    />
                    {formErrors[key] && (
                      <p className="text-red-500 text-sm mt-1">{formErrors[key]}</p>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg mt-6 text-lg" // Wyraźny złoty przycisk
                >
                  Przejdź do płatności Przelewy24
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;