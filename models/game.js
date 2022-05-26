const mongoose = require('../config/database')

const {Schema, model} = mongoose

const gameSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
    dev: String,
    reviews: Array,
    approved: {type: String, default: 'review', enum: ['yes', 'review', 'no']}
})

module.exports = model('Game', gameSchema)