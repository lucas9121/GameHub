const mongoose = require('../config/database')

const {Schema, model} = mongoose

const gameSchema = newSchema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    dev: String,
    reviews: Array,
    username: String
})

module.exports = model('Game', gameSchema)