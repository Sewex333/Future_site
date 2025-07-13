import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com';
import "../Form.css"

const Form = () => {
  const [name, setName] = useState('');
  const [b_date, SetB_date] = useState('');
  const [nr_tel, setNr_tel] = useState('');
  const [mail, setMail] = useState('');
  const [info, setInfo] = useState('');
  const [formType, setFormType] = useState("zawodnik"); // domyślnie 'zawodnik'
  
  const form = useRef();

  const handleForm = (event) => {
    event.preventDefault();
    // console.log(name, b_date, nr_tel, mail, info);
    emailjs.sendForm("service_wy21u3d", "template_wabyhgk", form.current, 'XKBdsBjZTnh66Riss')
      .then((result) => {
        console.log(result.text);
        alert('Message Sent Successfully');
      }, (error) => {
        console.log(error.text);
        alert('Something went wrong!');
      });

    fetch('http://localhost:8000/api/data', {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <button
            className={`px-4 py-2 rounded-l-lg ${formType === "zawodnik" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFormType("zawodnik")}
            type="button"
          >
            Zawodnik
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${formType === "rodzic" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFormType("rodzic")}
            type="button"
          >
            Rodzic
          </button>
        </div>

        <h1 className="text-center text-xl font-bold mb-4">
          Formularz zgłoszeniowy - wypełnia {formType === "zawodnik" ? "zawodnik" : "rodzic"}
        </h1>

        <form ref={form} onSubmit={handleForm} className='max-w-sm mx-auto'>
          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              podaj Imie i Nazwisko:
              <input
                type="text"
                name='name'
                value={name}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              podaj date Urodzenia
              <input
                type="date"
                name='data'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={b_date}
                onChange={(e) => SetB_date(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Podaj numer Telefonu
              <input
                type="tel"
                name='numer'
                value={nr_tel}
                onChange={(e) => setNr_tel(e.target.value)}
                pattern='[0-9]{9}'
                placeholder='000-000-000'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </label>
          </div>

          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Podaj email
              <input
                type="email"
                value={mail}
                name='mail'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Podaj informacje o sobie
            </label>
            <textarea
              name="message"
              id=""
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            >
              Tutaj podaj info o sobie
            </textarea>
          </div>

          <br />
          <input
            type="submit"
            value="Wyślij"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4 cursor-pointer transition"
          />
        </form>
      </div>
    </div>
  );
}

export default Form;