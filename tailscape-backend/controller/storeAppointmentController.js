const StoreAppointment = require("../model/storeAppointmentModel");

exports.createAppointment = async (req, res) => {
  try {
    const { petType, breed, date, time, userId } = req.body;

    if (!petType || !breed || !date || !time  ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new StoreAppointment({
      userId,
      petType,
      breed,
      date,
      time,
      status: 'pending'
    });

    const savedAppointment = await newAppointment.save();
    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: savedAppointment,
      });
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await StoreAppointment.find().populate('userId', 'name email phone');
    res.status(200).json({ appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userAppointments = await StoreAppointment.find({ userId: userId })
    .populate('userId', 'name email') // Optionally populate user details (e.g., name, email)
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

exports.deleteAppointmentByUser = async (req, res) => {
  try {
    const { userId, id } = req.params;

    const deletedAppointment = await StoreAppointment.findByIdAndDelete({
      _id: id,
      userId,
    });

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await StoreAppointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "approved", "denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAppointment = await StoreAppointment.findByIdAndUpdate(
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
