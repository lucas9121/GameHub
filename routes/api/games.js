const express = require('express')
const router = express.Router()
const gamesCtrl = require('../../controllers/api/games')



// GET /api/games/seed
// router.get('/seed', gamesCtrl.seed)

// GET /api/games/index
router.get('/', gamesCtrl.index)

//GET /api/games/:id/edit
router.get('/:id/edit', gamesCtrl.edit)

//Get /api/games/:id
router.get('/:id', gamesCtrl.show)


module.exports = router