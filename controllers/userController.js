const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

    //user controller object type
    const userController = {
        //controller for registering users
   register:  async (req, res) => {
        try {
            const { fullName, userName, email, password, gender } = req.body
            let newUserName = userName.toLowerCase().replace(/ /s, '')
            
            const username = await User.findOne({userName: newUserName})
            if(username){
                return res.status(400).json({msg: 'username is already taken!'})
            }
            const userEmail = await User.findOne({email})
                if(userEmail){
                    return res.status(400).json({msg: 'this email is already taken!'})
                }
            if(password.length < 5){
                return res.status(400).json({msg: 'Password must be at least 5 characters.'})
            }   
            const passwordHash = await bcrypt.hashSync(password, 10)

            const newUser = new User({
                fullName, userName, email, password:passwordHash, gender
            })
               
            const accessToken = createAccessToken({id: newUser._id})
            const refreshToken = createRefreshToken({id: newUser._id})
            
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            await newUser.save()
            res.json({
                msg: 'You are successfully registered to our website!',
                accessToken,
                User: {
                    ...newUser._doc,
                    password: ''
                }
            })
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //this controller is for login
   login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({email}).populate('followers following', '-password')
           
            if(!user){
                return res.status(400).json({msg: 'Email is not yet register!'})
            }
            
            const isMatch = await bcrypt.compareSync(password, user.password)
            if(!isMatch){
                return res.status(400).json({msg: 'Password is incorrect!'})
            }
            
            const accessToken = createAccessToken({id: user._id})
            const refreshToken = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

           
            res.json({
                msg: 'login successfully!',
                accessToken,
                User: {
                    ...user._doc,
                    password: ''
                }
            })
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //this controller is for logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {
                path: '/api/refresh_token'
            })
            return res.json({msg: 'logged out successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //this controller is for generating accesstoken when login
   generateAccessToken: async (req, res) => {
        try {
                const refreshTokenUser = req.cookies.refreshtoken
                if(!refreshTokenUser){
                    return res.status(400).json({msg: 'Please login first!'})
                }
                jwt.verify(refreshTokenUser, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                    if(err) {
                        return res.status(400).json({msg: 'Please login first!'})
                    }
                    const user = await User.findById(result.id).select('-password')
                    .populate('followers following', '-password')

                    if(!user){
                        return res.status(400).json({msg: 'This does not even exist!'})
                    }

                    const access_token = createAccessToken({id: result.id})

                 res.json({
                        access_token,
                        user
                    })
                })
                
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    }
    }
        //this function is for creating a accesstoken
    const createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    }
        //this function is for refresh accesstoken / longterm
    const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
    }

module.exports = userController