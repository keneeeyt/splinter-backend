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
            const user = await User.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: 'User does not exist!'})
          return  res.json({user})
        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userControl;