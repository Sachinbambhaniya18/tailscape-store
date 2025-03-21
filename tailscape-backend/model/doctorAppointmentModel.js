const mongoose = require("mongoose");

const doctorAppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'VetHospital' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    petType: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "denied"],
    }
  },
  { collection: "doctorAppointments" }
);

const doctorAppointment = mongoose.model(
  "DoctorAppointment",
  doctorAppointmentSchema
);

module.exports = doctorAppointment;
