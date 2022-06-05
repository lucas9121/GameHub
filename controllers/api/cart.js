const Cart = require('../../models/cart')
const Games = require('../../models/game')
const User = require('../../models/user')

module.exports ={
    getCart,
    createCart,
    updateCart,
    Delete
}

async function getCart(req, res) {
    try{
        const cart = await Cart.find({user: req.query.user}).populate('games')
        res.status(200).json(cart)
    } catch(err){
        res.status(400).json(`Failed on back end ${err}`)
    }
}

async function createCart(req, res) {
    try{
        const newCartGame = await Cart.create(req.body)
        res.status(200).json(newCartGame)
    } catch(err){
        res.status(400).json(err + ' Failed on back end')
    }
}

async function updateCart(req, res){
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.body._id, req.body, {new: true})
        res.status(200).json(updatedCart)
    } catch(err){
        res.status(400).json(err + ' Failed on back end')
    }
}

async function Delete(req, res){
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Game deleted')
    } catch(err){
        res.status(400).json(err + ' Failed on back end')
    }
}