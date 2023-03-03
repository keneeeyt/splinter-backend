const express = require('express');
const router = express.Router();

//Controller for users
const userController = require('../controllers/userController');


//route for registering users
router.post('/register', userController.register)
//route for login
router.post('/login',userController.login)
//route for logout
router.post('/logout',userController.logout)
//route for refresh token / generate token
router.post('/refresh_token', userController.generateAccessToken)


module.exports = router