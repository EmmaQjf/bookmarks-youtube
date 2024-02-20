const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers/api/userController')
const checkToken = require('../../config/checkToken')
const ensureLoggedIn = require('../../config/ensureLoggedin')


router.post('/', userCtrl.signup, userCtrl.respondWithToken )

router.post('/login', userCtrl.login, userCtrl.respondWithToken)
router.get('/bookmarks', checkToken, ensureLoggedIn,userCtrl.getBookmarksByUser, userCtrl.respondWithBookmarks)
module.exports = router