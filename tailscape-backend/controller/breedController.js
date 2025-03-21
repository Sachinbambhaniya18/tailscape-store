const Breed = require("../model/breedOptionModel");

exports.getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.status(200).json({ breeds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
