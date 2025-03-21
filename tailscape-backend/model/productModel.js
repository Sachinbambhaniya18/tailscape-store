const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    pet_type: {
        type: String,
        required: true
    },
    life_stage: {
        type: String,
        required: true
    },
    ingredients: [String],
    nutritional_information: {
        protein: String,
        fat: String,
        fiber: String
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
            default: 'percentage'
        },
        value: {
            type: Number,
            default: 0
        }
    },
    weight: {
        type: String,
        required: true
    },
    images: [String],
    reviews: [reviewSchema],
    allergens: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;