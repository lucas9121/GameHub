const express = require('express')
const router = express.Router()
const cartsCtrl = require('../../controllers/api/cart')

// Get /api/cart
router.get('/', cartsCtrl.getCart)

// Post 
router.post('/', cartsCtrl.addToCart)


module.exports = router