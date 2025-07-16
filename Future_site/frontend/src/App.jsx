import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Navbar from './pages/Navbar';
import Form from './pages/Form';
import Footer from './pages/Footer';
import videoMain from '../public/filmik_main.mp4';
import './App.css';

function App() {
  const offerings = [
    { icon: "shoot.png", text: "Sportową rywalizację" },
    { icon: "strategy.png", text: "Rozwój pod okiem najlepszych trenerów" },
    { icon: "football-pitch.png", text: "Różne turnieje i wydarzenia" },
    { icon: "red.png", text: "Dyscyplina sportowa" },
    { icon: "brain.png", text: "Treningi mentalne dla każdego zawodnika" },
    { icon: "sport.png", text: "Obozy i różnorodne półkolonie" }
  ];

  const socialMedia = [
    { icon: "tiktok.png", url: "https://www.tiktok.com/@futureu13" },
    { icon: "facebook.png", url: "https://www.facebook.com/FutureSportClub" },
    { icon: "youtube.png", url: "https://www.youtube.com/@future8719" },
    { icon: "instagram.png", url: "https://www.instagram.com/futurefootballclub/" }
  ];

  const locations = [
    {
      name: "MOSiR Szczecin",
      address: "ul. Władysława Szafera 7, 71-245 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=ul.+W%C5%82adys%C5%82awa+Szafera+7%2C+71-245+Szczecin"
    },
    {
      name: "Boisko Witkiewicza 72",
      address: "Stanisława Ignacego Witkiewicza 72, 70-001 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Stanis%C5%82awa+Ignacego+Witkiewicza+72%2C+70-001+Szczecin"
    },
    {
      name: "Boisko Kresowa 42",
      address: "Kresowa 42, 71-899 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Kresowa+42%2C+71-899+Szczecin"
    },
    {
      name: "Boisko Bandurskiego 35",
      address: "księdza Biskupa Władysława Bandurskiego 35, 71-685 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=ksi%C4%99dza+Biskupa+W%C5%82adys%C5%82awa+Bandurskiego+35%2C+71-685+Szczecin"
    },
    {
      name: "Boisko Pomarańczowa 31",
      address: "Pomarańczowa 31, 70-781 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Pomara%C5%84czowa+31%2C+70-781+Szczecin"
    },
    {
      name: "Hala Narutowicza",
      address: "Narutowicza 17, 70-240 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Narutowicza+17%2C+70-240+Szczecin"
    },
    {
      name: "SP16 Chobolańska 20",
      address: "Chobolańska 20, 71-023 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Chobola%C5%84ska+20%2C+71-023+Szczecin"
    },
    {
      name: "SP35 Świętoborzyców 40",
      address: "Świętoborzyców 40, 71-665 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=%C5%9Awi%C4%99toborzyc%C3%B3w+40%2C+71-665+Szczecin"
    },
    {
      name: "LO13 Unisławy 26",
      address: "Unisławy 26, 71-413 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=Unis%C5%82awy+26%2C+71-413+Szczecin"
    },
    {
      name: "LO1 al. Piastów 12",
      address: "al. Piastów 12, 70-331 Szczecin",
      mapsURL: "https://www.google.com/maps/search/?api=1&query=al.+Piast%C3%B3w+12%2C+70-331+Szczecin"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[50vh] sm:h-[70vh] md:h-[90vh] overflow-hidden bg-gray-900 mb-[-20px]">     
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={videoMain}
          />
        </section>

        <motion.section 
          className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 md:py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.h1 
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Twoja przyszłość zaczyna się w{" "}
              <span className="text-[#D3AF37] tracking-wider">Future</span>
            </motion.h1>
            
            <motion.p 
              className="text-white text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Dołącz do najlepszego klubu sportowego i rozwijaj swoje umiejętności pod okiem profesjonalnych trenerów
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a 
                href="#form" 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Zapisz się teraz
              </a>
              <Link 
                to="/oferta" 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Oferta
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <section 
          id="oferta" 
          className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-[#D3AF37] mb-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              W Future oferujemy:
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {offerings.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform border-l-4 border-yellow-500"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={`/icons/${item.icon}`} 
                    alt={item.text} 
                    className="w-10 h-10 sm:w-12 sm:h-12" 
                  />
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12 sm:mt-16 p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-extrabold text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">
                Wpadnij na nasze Sociale:
              </h3>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={`/icons/${social.icon}`} 
                      alt={social.icon.replace('.png', '')} 
                      className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform" 
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 sm:mt-16 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFutureSportClub&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true"
                  width="100%"
                  height="700"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Feed"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
          <section id="locations" className="py-12 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nasze Lokalizacje</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{location.name}</h3>
                    <p className="text-gray-600 mb-4">{location.address}</p>
                    <a
                      href={location.mapsURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Zobacz na mapie
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div id="form">
          <Form />
        </div>

        
      </main>
      <Footer />
    </>
  );
}

export default App;