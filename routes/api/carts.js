const express = require('express')
const router = express.Router()
const cartsCtrl = require('../../controllers/api/cart')

// Get /api/cart
router.get('/', cartsCtrl.getCart)

// Post 
router.post('/', cartsCtrl.createCart)

// Put
router.put('/', cartsCtrl.updateCart)

// Delete
router.delete('/:id', cartsCtrl.Delete)


module.exports = router