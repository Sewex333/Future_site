import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Kontakt = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-250 flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Zacznij swoją piłkarską przygodę już dziś!</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Kontakt</h2>
          <p className="text-gray-600 mb-2">Damian Pepliński</p>
          <p className="text-gray-600 mb-2">📞 505 205 550</p>
          <p className="text-gray-600">📧 ffc.biuro@gmail.com</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Kontakt
