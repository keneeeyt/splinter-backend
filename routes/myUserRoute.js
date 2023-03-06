const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userControl = require('../controllers/myUserController');



router.get('/search', auth, userControl.searchUser)
router.get('/user/:_id', auth, userControl.getUser)
router.patch('/user', auth, userControl.updateUser)
router.patch('/user/:_id/follow', auth, userControl.follow)
router.patch('/user/:_id/unfollow', auth, userControl.unfollow)
module.exports = router