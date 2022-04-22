const express = require('express')
const router = express.Router()
const gamesCtrl = require('../../controllers/api/games')



// GET /api/games/seed
router.get('/seed', gamesCtrl.seed)

// GET /api/games/index
router.get('/', gamesCtrl.index)


module.exports = router