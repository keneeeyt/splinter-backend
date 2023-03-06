const User = require('../models/userSchema');


const userControl = {
    searchUser: async (req,res) => {
        try{
            const users = await User.find({userName: {$regex: req.query.userName}}).limit(10).select("fullName userName avatar")
           
            res.json({users})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params._id).select('-password')
            .populate('followers following', '-password')
            if(!user) return res.status(400).json({msg: 'User does not exist!'})
            res.json({user})
        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
                const { avatar, fullName, mobile, address, bio, website } = req.body

                if(!fullName) return res.status(400).json({msg: "Please Add your Fullname!"})
                await User.findOneAndUpdate({_id:req.user._id}, {
                    avatar, fullName, mobile, address, bio, website
                })
                res.json({msg: 'Update Successfully!'})

        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    follow: async (req,res) => {
        try{
                const user = await User.find({_id: req.params._id, followers: req.user._id})
                if(user.length > 0) return res.status(500).json({msg: 'You already followed this user.'})

                await User.findOneAndUpdate({_id: req.params._id}, {
                    $push: {followers: req.user._id}
                },{new: true})
                
                await User.findOneAndUpdate({_id: req.user._id}, {
                    $push: {following: req.params._id}
                },{new: true})

                res.json({msg: 'Successfully followed user!'})
        }catch {
             res.status(500).json({msg: err.message})
        }
    },
    unfollow: async (req,res) => {
        try{
            
                await User.findOneAndUpdate({_id: req.params._id}, {
                    $pull: {followers: req.user._id}
                },{new: true})
                
                await User.findOneAndUpdate({_id: req.user._id}, {
                    $pull: {following: req.params._id}
                },{new: true})

                res.json({msg: 'Successfully unfollow user!'})
        }catch {
             res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userControl;