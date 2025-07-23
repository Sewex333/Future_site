import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './controllers/ScrollToTop.jsx'
import './index.css'

import App from './App.jsx'
import About from './pages/About.jsx'
import Oferta from './pages/Oferta.jsx'
import Obozy from './pages/Obozy.jsx'
import Eventy from './pages/Eventy.jsx'
import TreningiIndywidualne from './pages/TreningiIndywidualne.jsx'
import TreningiMentalne from './pages/TreningiMentalne.jsx'
import ShopSite from './pages/ShopSite.jsx'
import Ebooki from './pages/Ebooki.jsx'
import Aktualnosci from './pages/Aktualnosci.jsx'
import Partnerzy from './pages/Partnerzy.jsx'
import Kontakt from './pages/Kontakt.jsx'
import Form from './pages/Form.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import PaymentResult from './pages/PaymentResult.jsx'
import Checkout from './pages/Checkout.jsx'
import Treningi from './pages/TreningiDzieci.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ScrollToTop />
    <Routes> 
      <Route path="/" element={<App />} />
      <Route path="/o-nas" element={<About />} />
      <Route path="/oferta" element={<Oferta />} />
      <Route path="/obozy-i-polkolonie" element={<Obozy />} />
      <Route path="/eventy" element={<Eventy />} />
      <Route path="/treningi-indywidualne" element={<TreningiIndywidualne />} />
      <Route path="/treningi-mentalne" element={<TreningiMentalne />} />
      <Route path="/treningi-dzieci" element={<Treningi />} />
      <Route path="/sklep" element={<ShopSite />} />
      <Route path="/ebooki-materialy" element={<Ebooki />} />
      <Route path="/aktualnosci" element={<Aktualnosci />} />
      <Route path="/partnerzy" element={<Partnerzy />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/formularz" element={<Form />} />
      <Route path="/sklep/:id" element={<ProductDetail />} />
      <Route path="/return" element={<PaymentResult />} />
      <Route path="/payment/status" element={<PaymentResult />} />
      <Route path="/sklep/:id/checkout" element={<Checkout />} />
    </Routes>
  </BrowserRouter>
)