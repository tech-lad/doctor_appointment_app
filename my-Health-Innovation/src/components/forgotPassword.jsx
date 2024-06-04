import React, { useState } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function Forgot() {
    const [email, setEmail] = useState("");
    const [otp1, setotp1] = useState("");
    const [otp2, setotp2] = useState("")
    const [otp3, setotp3] = useState("")
    const [otp4, setotp4] = useState("");
    const [sentotp, setsentotp] = useState();
    const [click, setclick] = useState("");
    // const [auth, setauth] = useAuth();
    var ox;
    const nav = useNavigate();


    const sendEmail = async (event) => {

        event.preventDefault();

        try {
            console.log(email)
            const res = await fetch("http://localhost:8000/api/auth/forgotpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email: email }
            })
            console.log(res);
            if (res.success === false) {
                alert(res.message);
            }
            else {
                ox = Math.random();
                ox = ox * 9000;
                ox = Math.floor(ox) + 1000;

                console.log(ox);
                setsentotp(ox);
                console.log(sentotp);
                const config = {
                    Username: 'diptarupsiddhanta@gmail.com',
                    Password: '4F37BE4CF84F7F3551455B207FAA1978A3B8',
                    Host: "smtp.elasticemail.com",
                    Port: 2525,
                    To: email,
                    From: 'diptarupsiddhanta@gmail.com',
                    Subject: "Email Verifiaction",
                    Body: `Your otp  is ${ox}`,

                }
                if (window.Email) {
                    window.Email.send(config).then(
                        () => toast.info('OTP has been sent.Check your mail', {
                            position: "top-right",



                        })
                    );
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleOnChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value)
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/auth/forgotpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email: email }
            })
            let ans = otp1 + otp2 + otp3 + otp4;
            console.log(sentotp);
            const json = await res.json()
            console.log(json);
            console.log(res)
            if (res.success === true && sentotp == ans) {
                alert("success");
                localStorage.setItem('token', json)
                nav("/");
            }
            else if (res.success === true && sentotp !== ans) {
                setclick("The otp entered is wrong.Try resending the otp");
            }
            else {
                alert(res.message);
            }
        }
        catch (err) {
            console.log(err);
            alert("Error in react")
        }
    }

    const handleChange_1 = (event) => {
        event.preventDefault()
        setotp1(event.target.value)
        console.log(event.target.value)
    }

    return (

        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Enter Email</p>
                        </div>


                    </div>
                    <form onSubmit={sendEmail}>

                        <input value={email} onChange={handleOnChange} type="email" name="email" id="email" className=" mb-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-1xl shadow-sm">
                            Submit email
                        </button>
                    </form>

                    <div>
                        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
                            <p className="font-semibold text-3xl">Enter OTP</p>
                        </div>
                        <form onSubmit={handlesubmit} method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-16 h-16 mx-3">
                                        <input onChange={handleChange_1} style={{ width: "50px", height: "50px", border: "2px solid black", paddingLeft: "22px"}} required />
                                    </div>
                                    <div className="w-16 h-16 mx-3">
                                        <input onChange={handleChange_1} style={{ width: "50px", height: "50px", border: "2px solid black", paddingLeft: "22px" }} required />
                                    </div>
                                    <div className="w-16 h-16 mx-3">
                                        <input onChange={handleChange_1} style={{ width: "50px", height: "50px", border: "2px solid black", paddingLeft: "22px" }} required />
                                    </div>
                                    <div className="w-16 h-16 mx-3">
                                        <input onChange={handleChange_1} style={{ width: "50px", height: "50px", border: "2px solid black", paddingLeft: "22px" }} required />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <h1 style={{ color: "red" }}>{click}</h1>
                                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-1xl shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve OTP?</p> <a onClick={sendEmail} className="flex flex-row items-center text-blue-600" target="_blank" rel="noopener noreferrer">Resend OTP</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer bodyClassName="toastBody" />
        </div>

    )
}

// onChange={(e) => {
//     setotp2(e.target.value)
// }}