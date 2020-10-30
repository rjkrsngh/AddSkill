const mongoose = require('mongoose');
// const { ObjectId } = mongoose.ObjectId;
const { ObjectId } = mongoose.Schema.Types;
require('./user');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String, // as this will be a url
        required: true
    },
    likes: [{
        type: ObjectId, 
        ref: 'User'
    }],
    comments: [{
        text: String,
        postedBy:{
            type: ObjectId,
            ref: 'User'
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
});


mongoose.model('Post', PostSchema);