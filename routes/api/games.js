const express = require('express')
const router = express.Router()
const gamesCtrl = require('../../controllers/api/games')



// GET /api/games/seed
// router.get('/seed', gamesCtrl.seed)

// GET /api/games
router.get('/', gamesCtrl.index)

// POST /api/games
router.post('/', gamesCtrl.create)

// PUT /api/games/:id
router.put('/:id', gamesCtrl.update)

// DELETE /api/games/:id
router.delete('/:id', gamesCtrl.Delete)

//Get /api/games/:id
router.get('/:id', gamesCtrl.show)


module.exports = router