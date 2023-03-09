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
        },
        getPosts: async (req,res) => {
            try{
              console.log(req.user) 
              const posts = await Post.find({
                user: [...req.user.following, req.user._id]
            }).sort('-createdAt')
            .populate("user likes", "avatar userName fullName")

              res.json({
                msg: 'Success!',
                result: posts.length,
                posts
              })

            }catch(err){
                return res.status(500).json({msg: err.message})
            }
        },
        updatePost: async (req,res) => {
            try{
                const { content, images } = req.body
                const post = await Post.findOneAndUpdate({_id:req.params._id},{content, images}).populate("user likes", "avatar userName fullName")
                    res.json({
                        msg:'Update Post Successfully!',
                        newPost: {
                            ...post._doc,
                            content, images
                        }
                })

            }catch(err){
                return res.status(500).json({error: err.msg})
            }
        },
}

module.exports = postController;