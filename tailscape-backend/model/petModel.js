const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String
});

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    description: {
        type: String,
        required: true
    },
    images: [String],
    stock_quantity: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;