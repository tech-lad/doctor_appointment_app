import React, { useState } from "react"
import Modal from "./modal"
export default function Card(props) {
    
    const {doctorId} = props;

    const icon = {
        width: "20px",
        display: "flex",
        marginRight: "15px"

    }
    const exp = {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "3px"
    }
    const mid = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    }
    const mid1 = {
        marginTop: "23px",
        justifyContent: "center",
    }
    const btn = {
        backgroundColor: "#f48fb1",
        paddingLeft: "9px",
        paddingRight: "9px",
        height: "40px",
        borderRadius: "6px",
        border: "2px solid black",
        marginBottom: "5px",

    }
    const [menu, setMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);
    
    const handleChange = () => {
        setMenu(!menu);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    const openForm = () => {
        setShowForm(true);
        setMenu(false);
    }

    const closeForm = () => {
        setShowForm(false);
    }

    /*const list={
        listStyleType: "square",
        listStylePosition: "outside",
    }*/

    return (

        <>
            <div className="card">

                <div className="top">
                    <img className="docicon" src="https://cdn.askapollo.com/live/images/doctors/defaultprofilepicmale.png" />
                </div>
                <div className="bottom">
                    <p> {props.index} </p>
                    <h2 className="name font-bold px-2">{props.name}</h2>
                    <p className="info px-1.5 text-gray-400"> {props.qualification}    ({props.speciality})</p>
                    <div style={mid}>
                        <div style={mid1}>
                            <div style={exp} className="info">
                                <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/award.svg" style={icon}></img>

                                <p>{props.experienceInYears} years of experience</p>
                            </div>
                            <div style={exp} className="info">
                                <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/location.svg" style={icon}></img>
                                <p > {props.hospital}</p>
                            </div>
                        </div>
                        <div className="px-2">
                            <h1 className="font-semibold info">Contacts :-</h1>
                            <ul >
                                <li className="info">{props.contact}</li>
                                <li className="info">{props.email}</li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                    <p className="info">Fees - Rs {props.fees}</p>
                    <p className="font-semibold info">{props.schedule}</p>
                    <div className="flex justify-center font-bold">
                        <button style={btn} onClick={openForm} >Book an  Appointment</button>
                        {showForm && <Modal doctorId={doctorId} closeForm={closeForm} />}
                    </div>
                </div>

            </div>

        </>
    );
}

