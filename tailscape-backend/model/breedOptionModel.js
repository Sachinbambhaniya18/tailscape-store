const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema(
    {
        Dog: [String],
        Cat: [String],
        Bird: [String],
    },
    { collection: 'breeds' }
);

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;