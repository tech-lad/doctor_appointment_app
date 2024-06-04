const express = require('express')
const Patient = require('../models/Patient')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

// ROUTE 1 - Get the Patient details using: GET "/api/patients/getpatient". Login required
router.get('/getpatient', fetchuser, async(req, res) => {
    try {
        // get all the patient's data
        const patientData = await Patient.findOne({user: req.user.id});
        console.log(req.user.id);
        res.status(200).json({success: true, patientData:patientData})
        console.log(patientData)

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "500: Internal Server Error"})
    }
})

// ROUTE 2 - Get all Patients using: GET "/api/patients/getallpatients".
router.get('/getallpatients', async(req, res) => {
    try {
        // getting all the patient data (for doctors)
        const allPatientList = await Patient.find()
        res.status(200).send({success: true, allPatientList: allPatientList})
        console.log(allPatientList)
        console.log(allPatientList[2].medicalRecords)

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Getting error in fetching all the patients for doctors"})
    }
})

// ROUTE 3 - create a new patient using: POST "/api/patients/create-patient". Login required
router.post('/create-patient', fetchuser, async(req, res) => {
    try {
     
        // create a new patient
        let patient = await new Patient({...req.body, user: req.user.id})
        await patient.save();
        res.status(200).send({success: true, patient})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({success: false, message:"500: Internal Server Error"})
    }
})

module.exports = router;