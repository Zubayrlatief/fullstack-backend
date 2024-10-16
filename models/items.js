const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Items', itemsSchema)