const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// POST /api/users
router.post('/', usersCtrl.create);

// GET /api/users/index
router.get('/index', usersCtrl.index)

// POST /api/users/login
router.post('/login', usersCtrl.login);

// DELETE /api/users/delete/:id
router.delete('/delete/:id', usersCtrl.Delete)

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// PUT /api/users/:id
router.put('/:id', usersCtrl.update)

//Get /api/users/:id
router.get('/:id', usersCtrl.show)

module.exports = router;