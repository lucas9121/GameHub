const express = require('express')
const router = express.Router()
const cartCtrl = require('../../controllers/api/cart')

// Get /api/cart
router.get('/', cartCtrl.getCart)


module.exports = router