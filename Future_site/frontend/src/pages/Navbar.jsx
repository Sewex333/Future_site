import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md flex justify-between items-center px-6 h-20">
      <Link to="/" className="text-xl font-bold text-white hover:text-yellow-400">
        <div className="flex items-center gap-2">
          <img src="/logotyp.png" alt="Logo" className="h-10" />
          | Future
        </div>
      </Link>

      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      
      <div className="hidden md:flex gap-8 text-lg">
        <Link to="/o-nas" className="hover:text-yellow-400">O nas</Link>
        <Link to="/oferta" className="hover:text-yellow-400">Oferta</Link>
        <Link to="/obozy-i-polkolonie" className="hover:text-yellow-400">Obozy</Link>
        <Link to="/eventy" className="hover:text-yellow-400">Eventy</Link>
        <div className="relative group">
          <button className="hover:text-yellow-400">Treningi</button>
          <div className="absolute invisible group-hover:visible bg-black text-white shadow-lg rounded py-2 px-4 top-full left-0 z-10 min-w-40">
            <Link to="/treningi-indywidualne" className="block py-2 text-white hover:text-yellow-400 px-2 rounded">Indywidualne</Link>
            <Link to="/treningi-mentalne" className="block py-2 text-white hover:text-yellow-400 px-2 rounded">Mentalne</Link>
          </div>
        </div>
        <Link to="/sklep" className="hover:text-yellow-400">Sklep</Link>
        <Link to="/ebooki-materialy" className="hover:text-yellow-400">E-booki</Link>
        <Link to="/aktualnosci" className="hover:text-yellow-400">Aktualności</Link>
        <Link to="/partnerzy" className="hover:text-yellow-400">Partnerzy</Link>
        <Link to="/kontakt" className="hover:text-yellow-400">Kontakt i FAQ</Link>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black text-white shadow-lg py-4 px-6 flex flex-col gap-4">
          <Link to="/o-nas" className="hover:text-yellow-400" onClick={toggleMenu}>O nas</Link>
          <Link to="/oferta" className="hover:text-yellow-400" onClick={toggleMenu}>Oferta</Link>
          <Link to="/obozy-i-polkolonie" className="hover:text-yellow-400" onClick={toggleMenu}>Obozy</Link>
          <Link to="/eventy" className="hover:text-yellow-400" onClick={toggleMenu}>Eventy</Link>
          <div className="flex flex-col">
            <span className="font-semibold">Treningi</span>
            <div className="ml-4 mt-2 flex flex-col gap-2">
              <Link to="/treningi-indywidualne" className="hover:text-yellow-400" onClick={toggleMenu}>Indywidualne</Link>
              <Link to="/treningi-mentalne" className="hover:text-yellow-400" onClick={toggleMenu}>Mentalne</Link>
            </div>
          </div>
          <Link to="/sklep" className="hover:text-yellow-400" onClick={toggleMenu}>Sklep</Link>
          <Link to="/ebooki-materialy" className="hover:text-yellow-400" onClick={toggleMenu}>E-booki</Link>
          <Link to="/aktualnosci" className="hover:text-yellow-400" onClick={toggleMenu}>Aktualności</Link>
          <Link to="/partnerzy" className="hover:text-yellow-400" onClick={toggleMenu}>Partnerzy</Link>
          <Link to="/kontakt" className="hover:text-yellow-400" onClick={toggleMenu}>Kontakt i FAQ</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;