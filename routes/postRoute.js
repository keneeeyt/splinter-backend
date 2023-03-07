const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

//router for creating post
router.route('/posts')
.post(auth, postController.createPost)

module.exports = router;