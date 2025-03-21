const DoctorAppointment = require('../model/doctorAppointmentModel'); // Assuming the schema file is in the 'models' folder
const mongoose = require('mongoose');

// Create a new doctor appointment
exports.createAppointment = async (req, res) => {
  try {
    const { userId, hospital, doctor, petType, breed, date, time } = req.body;

    const newAppointment = new DoctorAppointment({
      userId,
      hospital,
      doctor,
      petType,
      breed,
      date,
      time,
      status: 'pending', // Default status is 'pending'
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created successfully', data: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await DoctorAppointment.find().populate('userId hospital doctor');
    res.status(200).json({ message: 'Appointments fetched successfully', data: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await DoctorAppointment.findById(req.params.id).populate('userId hospital doctor');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment fetched successfully', data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

// Update an appointment (e.g., change status)
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        if (!status || !["pending", "approved", "denied"].includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
        }
    
        const updatedAppointment = await DoctorAppointment.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
    
        if (!updatedAppointment) {
          return res.status(404).json({ message: "Appointment not found" });
        }
    
        res
          .status(200)
          .json({
            message: "Appointment status updated successfully",
            appointment: updatedAppointment,
          });
      } catch (err) {
        console.error("Error updating appointment status:", err.message);
        res.status(500).json({ message: "Server error" });
      }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await DoctorAppointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const userAppointments = await DoctorAppointment.find({ userId: userId })
      .populate('userId hospital doctor') // Optionally populate user details (e.g., name, email)
      .exec();
  
      if (userAppointments.length === 0) {
        return res
          .status(404)
          .json({ message: "No appointments found for this user" });
      }
  
      res.status(200).json({ appointments: userAppointments });
    } catch (err) {
      console.error("Error fetching user appointments:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };