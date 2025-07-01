import React from 'react';
import Navbar from './Navbar';
import "../About.css"
import Footer from './Footer';

function About(){
    return (
        <>
        <Navbar />
            <div className="container">       
                <div id="onas" className="blok lewo">
                <p><h1>O Future Football Club:</h1><br />
                Future Football Club to założony w sezonie 2017 / 2018 nowoczesna organizacja sportowa, który oferuje indywidualne podejście do każdego zawodnika.</p>

                <p>Nasze treningi bazują na najlepszych zachodnich wzorcach szkoleniowych z Niemiec, Holandii i Portugalii. Skupiamy się na wszechstronnym rozwoju w aspektach technicznych, motorycznych, taktycznych i mentalnych. Trening mentalny to przyszłość sportu, a my na to kładziemy nacisk.</p>
                </div>
                <div id="treningi" className="blok prawo">
                <p><h1>Treningi:</h1><br />
                Treningi odbywają się głównie w lokalizacjach: Niebuszewo, Centrum i Gumieńce.</p>

                <p>Proszę o informację, która z tych lokalizacji najbardziej Państwu odpowiada?</p>

                <p>Zawodnicy mogą uczestniczyć w dowolnej liczbie treningów w tygodniu, a pierwsze 3 zajęcia próbne są bezpłatne, abyście mogli przekonać się co do jakości świadczonej przez nas w organizacji.</p>

                <p>W okresie zimowym i letnim terminy i miejsca zajęć mogą ulegać małej zmianie.</p>
                </div>
                <div id="oplaty" className="blok lewo">
                <p><h1>Opłaty:</h1><br />
                Opłata miesięczna pobierana jest z góry, a uzależniona jest od liczby zadeklarowanej liczby treningów:</p>

                <p><span className="span1" >Do 13. roku życia kat. U13 i młodsze FUTURE:</span><br />
                1–4 treningi: 160 zł<br />
                5–8 treningów: 200 zł<br />
                12–16 treningów: 240 zł</p>

                <p><span className="span1">Powyżej 14. roku życia kat. U14 i starsi (ODRA SZCZECIN 1945):</span><br />
                U14/U15: 200 zł<br />
                U16/U17: 180 zł<br />
                U18/U19: 120 zł</p>
                </div>
                <div id="info" className="blok prawo">
                <p><h1>Dodatkowe informacje:</h1><br />
                Po pierwszych 3 zajęciach próbnych wymagamy wypełnienia dokumentów oraz zamówienia stroju klubowego. Koszt kompletu klubowego to: 500 zł (Adidas/Capelli).</p>

                <p>W skład zestawu wchodzi koszulka, spodenki, getry, dresy, spodnie, torba / plecak do wyboru.</p>

                <p>Dodatkowo, oferujemy różne promocje abonamentowe z rabatami od 10% do 50%.</p>

                <p>Wszystkie aktualne terminy treningów są dostępne w systemie PROTRAINUP, do którego dostęp zostanie Państwu przyznany po aktywacji konta.</p>
                </div>
                <div id="obozy" className="blok lewo">
                <p><h1>Obozy i półkolonie:</h1><br />
                Organizujemy wyjazdowe obozy rekreacyjno-sportowe oraz stacjonarne półkolonie, które są obowiązkowym elementem szkolenia.</p>

                <p>Proszę o zapoznanie się z dokumentami, które znajdują się w załączonych folderach, oraz o przesłanie wszelkich uwag dotyczących warunków współpracy.</p>

                <p>Jeśli mają Państwo jakiekolwiek pytania, jestem do dyspozycji.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About;