const mongoose = require("mongoose");

const storeAppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
  { collection: "storeappointments" }
);

const StoreAppointment = mongoose.model(
  "StoreAppointment",
  storeAppointmentSchema
);

module.exports = StoreAppointment;
