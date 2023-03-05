const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userControl = require('../controllers/myUserController');



router.get('/search', auth, userControl.searchUser)
router.get('/user/:id', auth, userControl.getUser)

module.exports = router