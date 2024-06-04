import React, { useState, useRef, useEffect, useContext } from "react";
// import img1 from "./images/nurse.jpeg";
// import img2 from "./images/defaultprofile.jpg"
import UserContext from '../../context/UserContext.js';
import Spinner from "./spinner.jsx";

const thing = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "100%"
}
const outermost = {
  display: "flex",
  justifyContent: "center",
}
const span = {
  marginRight: "30px",
  marginLeft: "30px",
  width: "100%"
}
const textarea = {
  width: "90%",
  height: "100px",
}
// const input = {
//   width: "40%",
// }

const input = {
  width: "300px"
}
const btn = {
  display: "flex",
  justifyContent: "center",
}
const h1 = {
  textAlign: 'center',
  font: 'normal 30px Arial, sans-serif',
}
const h2 = {
  fontSize: "20px",
  marginLeft: "10px"
}
const cross = {
  // border: "1px solid black",
  border: "none",
  position: "absolute",
  right: "5px",
  cursor: "pointer"
}


export default function DoctorDashboard() {

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getDoctor()
    }
  }, [user])

  const [credentials, setCredentials] = useState({ doctorName: "", patientName: "", date: "", medicines: "", advice: "" })


  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientId, setPatientId] = useState("")
  const [Image, setImage] = useState("");
  const inputref = useRef(null);

  const handleimageclick = () => {
    if (user) {
      inputref.current.click();
    }
  }
  const handleimage = (event) => {
    if (user) {
      const file = event.target.files[0];
      setImage(file);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const getDoctor = async () => {
    // if (user) {
    // const userId = user._id;
    // console.log(userId)
    const response = await fetch(`http://localhost:8000/api/doctors/getdoctorbyuserid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-token': localStorage.getItem('token')
        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      }
    });
    const json = await response.json()

    // console.log(json)
    if (json) {
      setDoctor(json);
      let doctor_appointment = json.Appointment;
      if (doctor_appointment) {
        setAppointments(doctor_appointment)
        console.log("doctor-appointment(frontend): ", doctor_appointment)
      }
    }
    // }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(credentials)
    const { doctorName, patientName, date, medicines, advice } = credentials;
    const response = await fetch(`http://localhost:8000/api/medicalrecords/createmedicalrecord/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      },
      body: JSON.stringify({ doctorName, patientName, date, medicines, advice })
    })
  }

  const deleteCard = async (event, id) => {
    event.preventDefault();
    // // event.stopPropagation();
    // const newAppointments = appointments.filter((appointment) => {
    //     return appointment.id !== id
    // })
    // // setAppointments(appointments.filter((appointment) => {
    // //         return appointment.id !== id
    // //     }))
    // // setIsDeleted(!isDeleted)
    // setAppointments(newAppointments);
    // console.log(newAppointments)
    // console.log(appointments)
    try {
      // console.log(localStorage.getItem('token'));
      // const token = localStorage.getItem('token');
      // console.log(token);
      // console.log(user.authToken)
      if (user) {
        const response = await fetch(`http://localhost:8000/api/appointment/delete-appintment/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${user.authToken}`
            // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
          }
        });
        const json = await response.json()
        if (json.success) {
          // console.log(json)
          // console.log(json)
          setDoctor(json);
          let doctor_appointment = json.Appointment;
          if (doctor_appointment) {
            setAppointments(doctor_appointment)
            console.log("doctor-appointments(frontend): ", doctor_appointment)
          }
        }
        // console.log(json)
        // setUsers(json);

        // setting the array of appointments 
        // let doctor_appointment = json.Appointment
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* {user !== null && user.isDoctor === true ? ( */}
      <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#a3f0bd" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="my-10" >
            {/* {Image ? <img className="my-3 mx-4" style={{ borderRadius: "50%", height: "100px" }} src={URL.createObjectURL(Image)} alt="real"></img>
              : <img className="my-3 mx-4" style={{ borderRadius: "50%", height: "100px" }} src={img2} alt="def"></img>
            } */}

            <button style={{ borderRadius: "6px", border: "2px solid black" }} onClick={handleimageclick} className="px-2 py-2" >Add profile picture</button>
            <input style={{ display: "none" }} onChange={handleimage} type="file" ref={inputref}></input>

          </div>
        </div>
        <div style={{ width: "50%", display: "flex", justifyContent: "center", marginBottom: "10px" }} >
          <section>
            <h1 className="my-3" style={{ fontSize: "30px" }}>Doctors's details</h1>
            <ul>
              <li>Name: {doctor.name}</li>
              <li>Contact: {doctor.contact}</li>
              <li>Email: {doctor.email}</li>
              <li>Fees: {doctor.fees}</li>
              <li>Qualification: {doctor.qualification}</li>
              <li>Experience in years: {doctor.experienceInYears}</li>
              <li>Schedule: {doctor.schedule}</li>
              <li>Speciality: {doctor.speciality}</li>
              <li>Hospital: {doctor.hospital}</li>
            </ul>

          </section>
        </div>

        <hr className="my-3" style={{ margin: "auto", borderTop: "2px dashed black", width: "80%" }}></hr>
        <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Appointments</h2>
        <div className="flex flex-wrap w-full max-w-2xl">
          {appointments.length != 0 ? appointments.map((appointment) => (
            <div
              key={appointment.time + appointment.date}
              className="w-1/3 mb-8 px-4"
              onClick={() => {
                setSelectedAppointment(appointment)
                // console.log(appointment.patient)
                setPatientId(appointment.patient)
              }}
            >
              <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-full max-w-2xl relative">
                {/* <p className="text-xl font-semibold mb-2">{appointment.doctor}</p> */}
                <svg style={cross} onClick={async () => await deleteCard(event, appointment.id)} className="h-8 w-8 text-red-500 absolute" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="15" y1="5" x2="5" y2="15" />  <line x1="5" y1="5" x2="15" y2="15" /></svg>
                <p>Name: {appointment.name}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
              </div>
            </div>
          )) : <p className='pb-3 m-auto'>No Appointments</p>}
        </div>

        {selectedAppointment && (
          <>
            <hr className="my-3" style={{ margin: "auto", borderTop: "2px dashed black", width: "80%" }}></hr>
            <div style={outermost}>
              <form className="dashform" onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", height: "15vh", justifyContent: "center" }}>
                  {/* <img style={{ height: "80px" }} src={img1} alt="err"></img> */}
                  <h1 style={h1}>  Presciption
                  </h1>

                </div>
                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="doctorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor's Name</label>
                    <input onChange={handleChange} style={input} type="text" name="doctorName" id="doctorName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>

                  <div style={span} className="mb-5 ">
                    <label htmlFor="patientName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient's Name</label>
                    <input onChange={handleChange} style={input} type="text" name="patientName" id="patientName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>

                  <div style={span} className="mb-5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="date" className="block text-sm font-medium leading-6 text-black">
                        Today's Date
                      </label>

                    </div>
                    <div className="mb-2" >
                      <input style={input}
                        onChange={handleChange}
                        id="date"
                        name="date"
                        type="date"
                        autoComplete="date"
                        required
                        placeholder=" Appointment Date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      />

                    </div>
                  </div>
                </div>


                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor=" medicines" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medicines</label>
                    <textarea onChange={handleChange} style={textarea} type="text" name="medicines" id="medicines" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                </div>


                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="advice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Advices</label>
                    <textarea onChange={handleChange} style={textarea} type="text" name="advice" id="advice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                </div>

                <div style={btn}>
                  <button style={{ backgroundColor: " #007C9D" }} type="submit" className=" my-2 text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
              </form>
            </div>
          </>)}
      </div>
      {/*  ) : (<Spinner/>)}  */}

    </>
  )

}