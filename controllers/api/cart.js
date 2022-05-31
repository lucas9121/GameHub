const Cart = require('../../models/cart')
const Games = require('../../models/game')
const User = require('../../models/user')

module.exports ={
    getCart,
    addToCart
}

async function getCart(req, res) {
    try{
        const cart = await Cart.find({user: req.query.user}).populate('game')
        res.status(200).json(cart)
    } catch(err){
        res.status(400).json(`Failed on back end ${err}`)
    }
}

async function addToCart(req, res) {
    try{
        const newCartGame = await Cart.create(req.body)
        res.status(200).json(newCartGame)
    } catch(err){
        res.status(400).json(err + ' Failed on back end')
    }
}

// async function deleteCartGame(req, res){
//     const games = await Cart.find({user: req.params.id})
// }