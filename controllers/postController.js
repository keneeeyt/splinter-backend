const Post = require('../models/postSchema')

const postController = {
        createPost: async (req,res) => {
            try{
                const {content, images} = req.body

                if(images.length === 0)
                return res.status(400).json({msg: 'Please add your Splinter photo!'})
                const newPost = new Post({
                    content, images, user: req.user._id
                })
                await newPost.save()
                res.json({
                    msg:'Create Post',
                    newPost
                })
            }catch(err){
                return res.status(500).json({error: err.msg})
            }
        }
}

module.exports = postController;