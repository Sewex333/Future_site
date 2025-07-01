import React, { useState } from 'react';

const Footer = () => {
  const [name, setName] = useState('');
  const [wiadomosc, setWiadomosc] = useState('');

  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl  flex flex-col md:flex-row justify-between items-start gap-8 ml-20">
        
        <div className="flex flex-col gap-4">
          <img src="/LOGO-future-club.png" alt="logotyp" className="w-48" />
          <div className="text-sm leading-relaxed">
            <p className='font-extrabold'>Future Football Club</p>
            <p>ul. Maciejowicka 3/1</p>
            <p>71-784 Szczecin</p>
            <p>+48 505 205 550</p>
            <p>ffc.biuro@gmail.com</p>
          </div>
        </div>

        <form className="w-full max-w-md space-y-4">
          <div>
            {/* <label className="block text-sm mb-1">Imię i nazwisko:</label> */}
            <span className='block text-sm mb-1 text-white'>Imie i nazwisko: </span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-black rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <span className='block text-sm mb-1 text-white'>Wiadomość: </span>
            {/* <label className="block text-sm mb-1">Wiadomość:</label> */}
            <textarea
              name="wiadomosc"
              value={wiadomosc}
              onChange={(e) => setWiadomosc(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 text-black rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Wyślij
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
