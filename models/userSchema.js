const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true,
        trim: true,
        maxlength: 25
    },
    userName: {
        type:String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type:String,
        required: true,
        trim: true,
        unique:true,
    },
    password: {
        type:String,
        required: true,
    },
    avatar: {
        type:String,
        default: 'https://res.cloudinary.com/dzosecp8f/image/upload/v1677940151/blank-profile-picture-g2b8faf720_1280_eks7er.png'
    },
    role: {
        type:String,
        default: 'user'
    },
    gender: {
        type:String,
        default: 'male'
    },
    mobile: {
        type:String,
        default: ''
    },
    address: {
        type:String,
        default: ''
    },
    bio: {
        type:String,
        default: '',
        maxlength: 100,
    },
    website: {
        type:String,
        default: ''
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
    
    
    
    
    


}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)