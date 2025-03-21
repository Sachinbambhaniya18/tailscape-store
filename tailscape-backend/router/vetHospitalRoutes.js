const express = require('express');
const router = express.Router();
const vetHospitalController = require('../controller/vetHospitalController'); // Path to your controller

// POST: Create a new VetHospital
router.post('/', vetHospitalController.createVetHospital);

// GET: Get all VetHospitals
router.get('/', vetHospitalController.getAllVetHospitals);

// GET: Get a VetHospital by ID
router.get('/:type', vetHospitalController.getVetHospitalByType);

// PUT: Update a VetHospital by ID
router.put('/:id', vetHospitalController.updateVetHospital);

// DELETE: Delete a VetHospital by ID (optional)
router.delete('/:id', vetHospitalController.deleteVetHospital);

module.exports = router;
