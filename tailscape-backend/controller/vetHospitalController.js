const VetHospital = require('../model/vetHospital'); // Path to your model

// POST: Create a new VetHospital
const createVetHospital = async (req, res) => {
  try {
    const newHospital = new VetHospital(req.body);
    await newHospital.save();
    res.status(201).json({ message: 'Vet Hospital created successfully', data: newHospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Vet Hospital', error: error.message });
  }
};

// GET: Get all VetHospitals
const getAllVetHospitals = async (req, res) => {
  try {
    const hospitals = await VetHospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Vet Hospitals', error: error.message });
  }
};

// GET: Get a VetHospital by ID
const getVetHospitalByType = async (req, res) => {
  try {
    const hospitals = await VetHospital.find({ 
      hospital_type: req.params.type });
    if (!hospitals) {
      return res.status(404).json({ message: 'Vet Hospital not found' });
    }
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Vet Hospital', error: error.message });
  }
};

// PUT: Update a VetHospital by ID
const updateVetHospital = async (req, res) => {
  try {
    const updatedHospital = await VetHospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Vet Hospital not found' });
    }
    res.status(200).json({ message: 'Vet Hospital updated successfully', data: updatedHospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Vet Hospital', error: error.message });
  }
};

// DELETE: Delete a VetHospital by ID (optional, if needed)
const deleteVetHospital = async (req, res) => {
  try {
    const deletedHospital = await VetHospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Vet Hospital not found' });
    }
    res.status(200).json({ message: 'Vet Hospital deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting Vet Hospital', error: error.message });
  }
};

module.exports = {
  createVetHospital,
  getAllVetHospitals,
  getVetHospitalByType,
  updateVetHospital,
  deleteVetHospital,
};
