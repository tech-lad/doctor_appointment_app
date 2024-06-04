import React, { useState, useRef, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../context/UserContext.js';


export default function Modal({ doctorId, closeForm }) {

  const {user} = useContext(UserContext)

  const [credentials, setCredentials] = useState({ name: "", date: "", time: "" })

  const nameRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const parent = {
    position: "relative"
  };
  const formdiv = {
    border: "2px solid black",
    padding: "20px 20px 50px 20px",
    borderRadius: "5%",
    backdropFilter: "blur(10px)",
    margin: "20% 30% 20% 30%"

  }
  const cross = {
    // border: "1px solid black",
    border: "none",
    position: "absolute",
    right: "5px",
    cursor: "pointer"
  }
  const sendEmail = (event) => {
    event.preventDefault();
    const config = {
      Username: 'diptarupsiddhanta@gmail.com',
      Password: '4F37BE4CF84F7F3551455B207FAA1978A3B8',
      Host: "smtp.elasticemail.com",
      Port: 2525,
      To: user.user.email,
      From: 'diptarupsiddhanta@gmail.com',
      Subject: "Appointment Success",
      Body: "And this is the body",

    };
    if (window.Email) {
      window.Email.send(config).then(
        () => toast.success('Appointment Successful.Check your Mail!', {
          position: "top-right",

        })
      );
    }

  }

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(doctorId);
    const { name, date, time } = credentials;
    // const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/api/appointment/book-appointment/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-Token': localStorage.getItem('token')
        // 'auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      },
      body: JSON.stringify({ name, date, time })
    })
    console.log(credentials)
    nameRef.current.value = ""
    dateRef.current.value = ""
    timeRef.current.value = ""
    sendEmail(event);
  }

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-opacity-50" >

      <div className="popup-form absolute mt-12 text-black" style={formdiv}>
        <svg style={cross} onClick={closeForm} className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Fill up the following form
            </h2>
          </div>
          <div>

            <div className="mt-2">
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                required
                ref={nameRef}
                placeholder="Patient Name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>

          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="date" className="block text-sm font-medium leading-6 text-black">
                Appointment Date
              </label>

            </div>
            <div className="mt-2 eye" style={parent}>
              <input
                onChange={handleChange}
                id="date"
                name="date"
                type="date"
                required
                ref={dateRef}
                placeholder=" Appointment Date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />

            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="time" className="block text-sm font-medium leading-6 text-black">
                Time
              </label>

            </div>
            <div className="mt-2 eye" style={parent}>
              <input
                onChange={handleChange}
                id="time"
                name="time"
                type="time"
                required
                ref={timeRef}
                placeholder="Time " className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />

            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      <ToastContainer bodyClassName="toastBody" />
    </div>

  )


}