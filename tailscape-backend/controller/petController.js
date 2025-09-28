const Pet = require("../model/petModel");

const {
  authenticateUser,
  checkAdminRole,
} = require("../middleware/authMiddleware");
exports.getAllPets = async (req, res) => {
  try {
    const pet = await Pet.find();
    res.status(200).json({ pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    // Find pet by ID
    const pet = await Pet.findById(id);

    // Check if pet exists
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Return the pet
    res.status(200).json({ pet });
  } catch (err) {
    console.error("Error fetching pet by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createPet = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json({ message: "Pet created successfully", pet });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.updatePet = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      const updatedpet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Pet updated successfully", updatedpet });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.deletePet = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      await Pet.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Pet deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];
