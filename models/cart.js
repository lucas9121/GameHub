const mongoose = require('../config/database')

const {Schema, model} = mongoose

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    game: { type: Schema.Types.ObjectId, ref: 'Game'},
    quantity: {type: Number, default: 1}
},
{
    timestamps: true
})

module.exports = model('Cart', cartSchema)