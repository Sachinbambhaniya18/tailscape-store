const express = require('express');
const router = express.Router();
const { addDoctor,getDoctorsByHospital,getAllDoctors } = require('../controller/doctorController'); // Import controller

// Route to add a new doctor
router.post('/add', addDoctor);
// Route to get doctors by hospital ID
router.get('/hospital/:hospitalId', getDoctorsByHospital);

// Route to get all doctors
router.get('/', getAllDoctors);
module.exports = router;
