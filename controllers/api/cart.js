const Cart = require('../../models/cart')
const Games = require('../../models/game')
const User = require('../../models/user')

module.exports ={
    getCart
}

async function getCart(req, res) {
    try{
        const cart = await Cart.find({})
        console.log(req.body)
        res.status(200).json(cart)
    } catch(err){
        res.status(400).json(`Failed on back end ${err}`)
    }
}

// async function deleteCartGame(req, res){
//     const games = await Cart.find({user: req.params.id})
// }