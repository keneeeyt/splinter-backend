const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    content: {
        type:String
    },
    images: {
        type:Array,
        required:true,
    },
    likes: [{type:mongoose.Types.ObjectId, ref: 'user'}],
    comments: [{type:mongoose.Types.ObjectId, ref: 'comment'}],
    user: {type:mongoose.Types.ObjectId, ref: 'comment'}

},{timestamps: true})

module.exports = mongoose.model('Post', PostSchema);