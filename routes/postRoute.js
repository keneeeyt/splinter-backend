const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

//router for creating post
router.route('/posts')
.post(auth, postController.createPost)
.get(auth, postController.getPosts)

router.route('/post/:_id')
.patch(auth, postController.updatePost)

router.patch('/post/:_id/like', auth, postController.likePost)
router.patch('/post/:_id/unlike', auth, postController.unLikePost)
module.exports = router;