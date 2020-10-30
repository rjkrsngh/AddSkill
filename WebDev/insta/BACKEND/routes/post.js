const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../keys');
const reqLogin = require('../middlewares/authorization');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

const handleCreatePostReq = (req, res, next) => {
    const { title, body, imageUrl } = req.body;

    if (!title || !body || !imageUrl) {
        return res.status(400).json({
            error: "post title or body empty"
        });
    } else {
        req.user.password = undefined;
        const post = new Post({
            title,
            body,
            photo:imageUrl,
            postedBy: req.user
        });

        post.save().then(result => {
            res.json({
                message: 'post creation successful',
                post: result
            });
        }).catch(err => {
            console.log('post creating failed with error: ', err);
            res.json({
                error: 'post creation failed'
            });
        });
    }
}

const handleListPostByAllUsersReq = (req, res, next) => {
    Post.find().populate('postedBy', 'name') // populate will pick only the name from the user object
        .populate('comments.postedBy', '_id name')
        .then(posts => {
            res.json({
                posts
            });
        }).catch(err => {
            console.log('error: ', err);
        })
}

const handleListPostBySelfReq = (req, res, next) => {
    Post.find({ postedBy: req.user._id }).
    populate('postedBy', 'name')
        .then(posts => {
            res.json({
                posts
            });
        }).catch(err => {
            console.log('error getting my posts: ', err);
        })
}

const handleLikePostReq = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{
            likes:req.user._id
        }
    },{ new : true}).exec((err, result)=>{
        if(err){
            return res.json({
                error : err
            });
        }else{
            return res.json({
                result
            });
        }
    });
}

const handleUnlikePostReq = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{
            likes:req.user._id
        }
    },{ new : true}).exec((err, result)=>{
        if(err){
            return res.json({
                error : err
            });
        }else{
            return res.json({
                result
            });
        }
    });
}

const handleCommentOnPostReq = (req, res, next) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push:{
            comments:comment
        }
    },{ new : true})
    .populate('comments.postedBy', '_id, name')
    .populate('postedBy', '_id, name')
    .exec((err, result)=>{
        if(err){
            return res.json({
                error : err
            });
        }else{
            return res.json({
                result
            });
        }
    });
}

const handleDeletePostReq = (req, res, next) => {
    Post.findOne({_id:req.params.postId})
    .populate('postedBy', '_id')
    .exec((err, post)=>{
        if (err || !post){
            return res.status(400).json({
                message : 'invalid post id'
            })
        }else if (post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json({
                    result
                })
            }).catch(err=>{
                console.log('error deleting the post ', err);
            })
        }
    })
}

const handleDeleteCommentReq = (req, res, next) => {
    console.log('received delete comment request with commentId: ');
    console.log(`userId: ${req.user._id}, commentId: ${req.params.commentId}`);
    Post.find({'comments._id' : req.params.commentId})
    .populate('comments.postedBy', '_id, name')
    .exec((err, comment)=>{
        if(err || !comment){
            return res.status(400).json({
                message : 'invalid comment id'
            });
        }else{
            comment.forEach(comm=>{
                console.log('comm: ', comm);
                console.log('comm.postedBy: ', comm.postedBy);
            });
        }
    });
}

const handleGetMyInfoReq = (req, res, next) => {
    User.findOne({_id:req.user._id})
    .select('-password')
    .exec((err, user)=>{
        if(err){
            console.log('error sending user info for profile', err);
            return res.status(400).json({
                user
            });
        }else{
            console.log('sending user info for profile', user);
            return res.json({
                user
            });
        }
    })
}

router.get('/postlist', reqLogin,handleListPostByAllUsersReq);
router.get('/myposts', reqLogin, handleListPostBySelfReq);
router.post('/create', reqLogin, handleCreatePostReq);
router.put('/like', reqLogin, handleLikePostReq);
router.put('/unlike', reqLogin, handleUnlikePostReq);
router.put('/comment', reqLogin, handleCommentOnPostReq);
router.delete('/post/delete/:postId', reqLogin, handleDeletePostReq);
router.delete('/comment/delete/:commentId', reqLogin, handleDeleteCommentReq);
router.get('/myinfo', reqLogin, handleGetMyInfoReq);

module.exports = router;