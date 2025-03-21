const mongoose = require('mongoose');

// Doctor schema definition
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    breeds: [{ type: String, required: true }], // List of dog breeds the doctor treats
    image: { type: String, required: true }, // URL to the doctor's image
    vetHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'VetHospital', required: true }, // Reference to the VetHospital
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
