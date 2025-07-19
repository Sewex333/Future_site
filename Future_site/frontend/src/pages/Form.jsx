import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com';
import "../Form.css"
import { Link } from 'react-router';

const Form = () => {
  const [name, setName] = useState('');
  const [b_date, SetB_date] = useState('');
  const [nr_tel, setNr_tel] = useState('');
  const [mail, setMail] = useState('');
  const [info, setInfo] = useState('');
  
  const form = useRef();

  const handleForm = (event) => {
    event.preventDefault();
    emailjs.sendForm("service_wy21u3d", "template_wabyhgk", form.current, 'XKBdsBjZTnh66Riss')
      .then((result) => {
        console.log(result.text);
        alert('Message Sent Successfully');
      }, (error) => {
        console.log(error.text);
        alert('Something went wrong!');
      });

    fetch('/api/data', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imie: name,
        dataUrodzenia: b_date,
        Numer_Telefonu: nr_tel,
        e_mail: mail,
        Informacje_Dodatkowe: info
      })
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-2 border-yellow-400 mt-20 mb-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Formularz zgłoszeniowy
          </h1>
        </div>

        <form ref={form} onSubmit={handleForm} className='max-w-sm mx-auto'>
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-800'>
              Podaj Imie i Nazwisko:
              <input
                type="text"
                name='name'
                value={name}
                className='w-full p-3 mt-1 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-yellow-50 text-gray-800 placeholder-gray-500 transition-all duration-300'
                onChange={(e) => setName(e.target.value)}
                placeholder="Wprowadź imię i nazwisko"
                required
              />
            </label>
          </div>

          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-800'>
              Podaj date Urodzenia
              <input
                type="date"
                name='data'
                className='w-full p-3 mt-1 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-yellow-50 text-gray-800 transition-all duration-300'
                value={b_date}
                onChange={(e) => SetB_date(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-800'>
              Podaj numer Telefonu
              <input
                type="tel"
                name='numer'
                value={nr_tel}
                onChange={(e) => setNr_tel(e.target.value)}
                pattern='[0-9]{9}'
                placeholder='000-000-000'
                className='w-full p-3 mt-1 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-yellow-50 text-gray-800 placeholder-gray-500 transition-all duration-300'
                required
              />
            </label>
          </div>

          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-800'>
              Podaj email
              <input
                type="email"
                value={mail}
                name='mail'
                className='w-full p-3 mt-1 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-yellow-50 text-gray-800 placeholder-gray-500 transition-all duration-300'
                onChange={(e) => setMail(e.target.value)}
                placeholder="wprowadź@email.com"
                required
              />
            </label>
          </div>

          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-800'>
              Podaj informacje o sobie
            </label>
            <textarea
              name="message"
              id=""
              className='w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-yellow-50 text-gray-800 placeholder-gray-500 transition-all duration-300 min-h-[100px] resize-vertical'
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Tutaj podaj info o sobie"
            />
          </div>

          <div className="space-y-4">
            <input
              type="submit"
              value="Wyślij"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-yellow-600"
            />
            
            <Link 
              to="/" 
              className="block w-full bg-black hover:bg-gray-800 text-yellow-400 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center border-2 border-yellow-400"
            >
              Powrót
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;