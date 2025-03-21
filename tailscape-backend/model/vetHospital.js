const mongoose = require('mongoose');

// Define the schema for the Vet Hospital
const VetHospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: true,
  },
  mapsLink: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  hospital_type:{
    type: String,
    default: "government",
    enum: ["government","private"],
  },
});

// Create a model based on the schema
const VetHospital = mongoose.model('VetHospital', VetHospitalSchema);

module.exports = VetHospital;
