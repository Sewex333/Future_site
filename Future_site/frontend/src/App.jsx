import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { NavLink, Link } from 'react-router'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './pages/Navbar'
import { motion, scale } from "motion/react";
import Form from './pages/Form'
import Aktualnosci from './pages/Aktualnosci'
import Footer from './pages/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main>
        
        <section className="relative h-[90vh] overflow-hidden bg-gray-900">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"></div>
          
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls
            onLoadStart={() => console.log('Video started loading')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => {
              console.error('Video error:', e);
              console.log('Video source:', e.target.src);
            }}
            onLoadedData={() => console.log('Video loaded')}
          >
            <source src="/filmik_glowna.mp4" type="video/mp4" />
            Twoja przeglądarka nie obsługuje elementu video.
          </video>
          
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-2"></div>
        </section>

        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1 
              className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Twoja przyszłość zaczyna się w{" "}
              <span className="text-[#D3AF37] tracking-wider">Future</span>
            </motion.h1>
            
            <motion.p 
              className="text-white text-lg md:text-xl lg:text-2xl font-medium mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Dołącz do najlepszego klubu sportowego i rozwijaj swoje umiejętności pod okiem profesjonalnych trenerów
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a 
                href="#form" 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Zapisz się teraz
              </a>
              <a 
                href="#oferta" 
                className="bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Poznaj naszą ofertę
              </a>
            </motion.div>
          </div>
        </section>

        <section id="oferta" className="flex flex-col md:flex-row items-start justify-between px-10 py-16 gap-10 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100">
          <div className="flex-1 space-y-6">
            <motion.h2 
              className="text-4xl font-bold text-[#D3AF37] mb-8 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              W Future oferujemy:
            </motion.h2>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img src="/icons/shoot.png" alt="Sport" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Sportową rywalizację</p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img src="/icons/strategy.png" alt="Trener" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Rozwój pod okiem najlepszych trenerów</p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src="/icons/football-pitch.png" alt="Turniej" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Różne turnieje i wydarzenia</p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src="/icons/red.png" alt="Trening" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Dyscyplina sportowa</p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img src="/icons/brain.png" alt="Trening" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Treningi mentalne dla każdego zawodnika</p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <img src="/icons/sport.png" alt="Trening" className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-800">Obozy i różnorodne półkolonie</p>
            </motion.div>
            
            <motion.div 
              className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="font-extrabold text-2xl text-gray-800 mb-6">Wpadnij na nasze Sociale:</h3>
              <div className="flex items-center justify-center gap-6">
                <a href="https://www.tiktok.com/@futureu13?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBEwM2pWNDd1R2szUzFvMnBqVwEejTSEb-OyZD9F0S-XY7zbAvq6wUE2pcQYS5YDi1rAkc95R3j3MPMHBPlmftU_aem_EMmVoM1kYF6krTgMINvP5A">
                  <img src="/icons/tiktok.png" alt="TikTok" className="w-12 h-12 hover:scale-[1.5] transition-transform" />
                </a>
                <a href="https://www.facebook.com/FutureSportClub">
                  <img src="/icons/facebook.png" alt="Facebook" className="w-12 h-12 hover:scale-[1.5] transition-transform" />
                </a>
                <a href="https://www.youtube.com/@future8719">
                  <img src="/icons/youtube.png" alt="YouTube" className="w-12 h-12 hover:scale-[1.5] transition-transform" />
                </a>
                <a href="https://www.instagram.com/futurefootballclub/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBEwM2pWNDd1R2szUzFvMnBqVwEe2kP8TwqEVdUlhqGNBB6SahXu_U_XTCQY_PzhF4umAmQZF11sGfb003hafbQ_aem_l7EDn__nd6iq419i4vFXkw">
                  <img src="/icons/instagram.png" alt="Instagram" className="w-12 h-12 hover:scale-[1.5] transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFutureSportClub&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                width="500"
                height="700"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>
        </section>
          
      </main>
      <div id="form">
        <Form />
      </div>
      <Footer />
    </>
  )
}

export default App