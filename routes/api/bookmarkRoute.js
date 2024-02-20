const express = require('express')
const router = express.Router()
const bookmarkCtrl = require('../../controllers/api/bookmarksController')
const checkToken = require('../../config/checkToken')
const ensureLoggedIn = require('../../config/ensureLoggedin')


router.delete('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)
router.put('/:id', checkToken,ensureLoggedIn, bookmarkCtrl.updateBookmark, bookmarkCtrl.respondWithBookmark)
router.post('/', checkToken, ensureLoggedIn, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)

module.exports =router