const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    volumetric: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: String,
    ownerName: String,
    ownerMail: String,
    owner: String
});

const Car = mongoose.model('car', carSchema);

module.exports = Car;