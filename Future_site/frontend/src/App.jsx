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
        
        <section
          className="relative h-[90vh] bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/zdjecieOPEN.JPG')" }}
        >
          <div className='absolute bottom-[190px] left-10 z-10 bg-black max-w-[80%] h-40 w-200 shadow-xl rounded'></div>
          <div className="absolute bottom-[200px] left-10 z-10">
            <h1 className="text-white text-5xl md:text-6xl font-black max-w-[80%] leading-tight px-10 py-10 rounded ">
              Twoja przyszłość zaczyna się w <span className="text-[#D3AF37] tracking-wider">Future</span>
            </h1>
          </div>
    </section>
        <section className="flex flex-col md:flex-row items-start justify-between px-10 py-16 gap-10">
  {/* Lista z grafikami */}
  <div className="flex-1 space-y-6">
    <h2 className="text-3xl font-bold text-[#D3AF37] mb-6">W Future oferujemy:</h2>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/shoot.png" alt="Sport" className="w-12 h-12" />
      <p className="text-lg font-medium">Sportową rywalizację</p>
    </div>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/strategy.png" alt="Trener" className="w-12 h-12" />
      <p className="text-lg font-medium">Rozwój pod okiem najlepszych trenerów</p>
    </div>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/football-pitch.png" alt="Turniej" className="w-12 h-12" />
      <p className="text-lg font-medium">Różne turnieje i wydarzenia</p>
    </div>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/red.png" alt="Trening" className="w-12 h-12" />
      <p className="text-lg font-medium">Dyscyplina sportowa</p>
    </div>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/brain.png" alt="Trening" className="w-12 h-12" />
      <p className="text-lg font-medium">Treningi mentalne dla każdego zawodnika</p>
    </div>

    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <img src="/icons/sport.png" alt="Trening" className="w-12 h-12" />
      <p className="text-lg font-medium">Obozy i róznorodne polkolonie</p>
    </div>
    <div className='text-center'>
      <h1 className='font-extrabold text-2xl'>Wpadnij na nasze Sociale:</h1>
      <br />
      <div className='flex items-center justify-center gap-10'>
        <a href="https://www.tiktok.com/@futureu13?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBEwM2pWNDd1R2szUzFvMnBqVwEejTSEb-OyZD9F0S-XY7zbAvq6wUE2pcQYS5YDi1rAkc95R3j3MPMHBPlmftU_aem_EMmVoM1kYF6krTgMINvP5A"><img src="/icons/tiktok.png" alt="tik tok" className='w-12 h-12 hover:scale-[1.5] transition-transform' /></a>
        <a href="https://www.facebook.com/FutureSportClub"><img src="/icons/facebook.png" alt="tik tok" className='w-12 h-12 hover:scale-[1.5] transition-transform' /></a>
        <a href="https://www.youtube.com/@future8719"><img src="/icons/youtube.png" alt="tik tok" className='w-12 h-12 hover:scale-[1.5] transition-transform' /></a>
        <a href="https://www.instagram.com/futurefootballclub/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBEwM2pWNDd1R2szUzFvMnBqVwEe2kP8TwqEVdUlhqGNBB6SahXu_U_XTCQY_PzhF4umAmQZF11sGfb003hafbQ_aem_l7EDn__nd6iq419i4vFXkw"><img src="/icons/instagram.png" alt="tik tok" className='w-12 h-12 hover:scale-[1.5] transition-transform' /></a>
      </div>
    </div>

  </div>

  {/* Komponent Aktualnosci */}
  <div className="flex-1">
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
</section>
          {/* <div id='desc'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nemo consequatur maxime fugiat quisquam accusamus odit id, debitis enim ipsa temporibus fuga qui porro nihil at in, aliquam iste doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem vitae consequatur, officia repellat minus voluptas corrupti accusamus hic voluptates quis fuga eum, adipisci illo incidunt optio magnam vel illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, aut! Fugiat rerum deleniti, tenetur consectetur commodi dolore odio non iure perspiciatis fuga explicabo eveniet beatae iusto debitis illo necessitatibus culpa.</p>
          </div> */}
      </main>
      <Form />
      <Footer />
    </>
  )
}

export default App
