let mongoose = require('mongoose');

// Product Schema
let productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
    },
    info: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    productPic: {
        type: String
    }
});

let Product = module.exports = mongoose.model('Products', productSchema);