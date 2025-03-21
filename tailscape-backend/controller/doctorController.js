const Doctor = require('../model/doctor'); // Import the Doctor model
const VetHospital = require('../model/vetHospital'); // Import VetHospital model

// Controller to create a new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialty, breeds, image, vetHospitalId } = req.body;

    // Check if the VetHospital exists
    const vetHospital = await VetHospital.findById(vetHospitalId);
    if (!vetHospital) {
      return res.status(404).json({ message: 'Vet Hospital not found' });
    }

    // Create the new doctor
    const newDoctor = new Doctor({
      name,
      specialty,
      breeds,
      image,
      vetHospital: vetHospital._id, // Reference the VetHospital
    });

    // Save the doctor to the database
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor); // Return the created doctor
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};
const getDoctorsByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params; // Get hospital ID from URL params

    // Find all doctors that are associated with the given hospital ID
    const doctors = await Doctor.find({ vetHospital: hospitalId }).populate('vetHospital'); // Populate the vetHospital details
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this hospital' });
    }

    res.status(200).json(doctors); // Return the list of doctors
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    // Find all doctors and populate the vetHospital details
    const doctors = await Doctor.find().populate('vetHospital');

    // Check if no doctors are found
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    res.status(200).json(doctors); // Return the list of doctors
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};
module.exports = { addDoctor,getAllDoctors,getDoctorsByHospital  };
