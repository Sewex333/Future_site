import React from 'react';
import Navbar from './Navbar';
import "../About.css";
import Footer from './Footer';

function About() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div id="onas" className="blok lewo">
          <h1>⚽ O Future Football Club:</h1>
          <p>
            Future Football Club to założona w sezonie 2017/2018 nowoczesna organizacja sportowa, oferująca indywidualne podejście do każdego zawodnika.
          </p>
          <p>
            Nasze treningi bazują na zachodnich wzorcach z Niemiec, Holandii i Portugalii. Skupiamy się na rozwoju technicznym, motorycznym, taktycznym i mentalnym.
            Trening mentalny to przyszłość sportu – my już to wdrażamy!
          </p>
        </div>

        <div id="treningi" className="blok prawo">
          <h1>🏋️ Treningi:</h1>
          <p>
            Treningi odbywają się głównie w lokalizacjach: <strong>Niebuszewo, Centrum</strong> i <strong>Gumieńce</strong>.
          </p>
          <p>
            Która lokalizacja najbardziej Państwu odpowiada?
          </p>
          <p>
            Pierwsze <strong>3 zajęcia próbne</strong> są całkowicie <span className="highlight">bezpłatne</span>.
          </p>
          <p>
            W okresach zimowym i letnim lokalizacje mogą ulec niewielkim zmianom.
          </p>
        </div>

        <div id="oplaty" className="blok lewo">
          <h1>💸 Opłaty:</h1>
          <p>Opłata miesięczna pobierana jest z góry i zależy od liczby treningów:</p>
          <p>
            <span className="span1">Do 13. roku życia (U13 i młodsze – FUTURE):</span><br />
            1–4 treningi: 160 zł<br />
            5–8 treningów: 200 zł<br />
            12–16 treningów: 240 zł
          </p>
          <p>
            <span className="span1">Powyżej 14. roku życia (U14+ – ODRA SZCZECIN 1945):</span><br />
            U14/U15: 200 zł<br />
            U16/U17: 180 zł<br />
            U18/U19: 120 zł
          </p>
        </div>

        <div id="info" className="blok prawo">
          <h1>ℹ️ Dodatkowe informacje:</h1>
          <p>
            Po 3 darmowych zajęciach wymagamy wypełnienia dokumentów oraz zakupu stroju klubowego.
            <br /><strong>Zestaw: 500 zł</strong> (Adidas/Capelli).
          </p>
          <p>
            W skład zestawu wchodzą: koszulka, spodenki, getry, dresy, spodnie, torba lub plecak.
          </p>
          <p>
            Dostępne są promocje abonamentowe z rabatami <strong>od 10% do 50%</strong>.
          </p>
          <p>
            Terminy treningów znajdują się w systemie <strong>PROTRAINUP</strong> – dostęp po aktywacji konta.
          </p>
        </div>

        <div id="obozy" className="blok lewo">
          <h1>🏕️ Obozy i półkolonie:</h1>
          <p>
            Organizujemy wyjazdowe obozy sportowe oraz półkolonie – są one <strong>obowiązkową częścią szkolenia</strong>.
          </p>
          <p>
            Proszę zapoznać się z dokumentami w folderach i przesłać ewentualne uwagi dotyczące warunków współpracy.
          </p>
          <p>
            W razie pytań – jesteśmy do dyspozycji! 🤝
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
