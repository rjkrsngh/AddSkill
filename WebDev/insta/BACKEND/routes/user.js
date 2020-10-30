const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../keys');
const reqLogin = require('../middlewares/authorization');

// use mongoose to interact with the user schema
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');


const handleGetUserProfileReq = (req, res, next) => {
	const userId = req.params.userId;
	User.findOne({_id:userId})
	.select('-password')
	.then(user=>{
		Post.find({postedBy : userId})
		.populate('postedBy', '_id name')
		.exec((err, posts)=>{
			if(err){
				// send the user details without posts
				return res.status(412).json({
					error : 'error fetching posts for the user'
				});
			}else{
				return res.json({
					user,
					posts
				})
			}
		})
	})
	.catch(err=>{
		console.log('error finding user details ', err);
	})
}

// const handleFollowUserReq =  (req, res, next) => {
// 	console.log(req.user._id, req.params.userId);
// 	User.findByIdAndUpdate(req.params.userId, {
// 		$push:{
// 			followers:req.user._id
// 		}
// 	}, {new : true})
// 	.select('-password')
// 	.exec((err, result)=>{
// 		if(err){
// 			console.log('error finding user you want to follow', err);
// 			return res.status(400).json({
// 				error : 'invalid request'
// 			});
// 		}else{
// 			// console.log('res for follow:', followers);
// 			User.findByIdAndUpdate(req.user._id, {
// 				$push: {
// 					following: req.params.userId
// 				}
// 			}, {new : true})
// 			.select('-password')
// 			.exec((err, following)=>{
// 				if(err){
// 					console.log('error adding to followers list', err);
// 				}else{
// 					console.log('added to followings list', following);
// 					// let result = {
// 					// 	followers,
// 					// 	following						
// 					// }
// 					return res.json({
// 						result
// 					});					
// 				}
// 			})
// 		}
// 	})
// }

// const handleUnfollowUserReq = (req, res, next) => {
// 	console.log(req.user._id, req.params.userId);
// 	User.findByIdAndUpdate(req.params.userId, {
// 		$pull:{
// 			followers:req.user._id
// 		}
// 	}, {new : true})
// 	.select('-password')
// 	.exec((err, result)=>{
// 		if(err){
// 			console.log('error finding user you want to follow', err);
// 			return res.status(400).json({
// 				error : 'invalid request'
// 			});
// 		}else{
// 			User.findByIdAndUpdate(req.user._id, {
// 				$pull:{
// 					following: req.params.userId
// 				}
// 			}, {new : true})
// 			.select('-password')
// 			.exec((err, following)=>{
// 				if(err){
// 					console.log('could not pull from following list', err);
// 				}else{
// 					console.log('pulled from following list');
// 					// let result = {
// 					// 	followers,
// 					// 	following
// 					// }

// 					return res.json({
// 						result
// 					});					
// 				}
// 			});

// 		}
// 	})
// }

const handleFollowUserReq =  (req, res, next) => {
	console.log(req.user._id, req.params.userId);
	User.findByIdAndUpdate(req.params.userId, {
		$push:{
			followers:req.user._id
		}
	}, {new : true})
	.select('-password')
	.exec((err, followers)=>{
		if(err){
			console.log('error finding user you want to follow', err);
			return res.status(400).json({
				error : 'invalid request'
			});
		}else{
			console.log('res for follow:', followers);
			User.findByIdAndUpdate(req.user._id, {
				$push: {
					following: req.params.userId
				}
			}, {new : true})
			.select('-password')
			.exec((err, following)=>{
				if(err){
					console.log('error adding to followers list', err);
				}else{
					let result = {
						followers,
						following						
					}
					console.log('added to followings list', result);
					return res.json({
						result
					});					
				}
			})
		}
	})
}

const handleUnfollowUserReq = (req, res, next) => {
	console.log(req.user._id, req.params.userId);
	User.findByIdAndUpdate(req.params.userId, {
		$pull:{
			followers:req.user._id
		}
	}, {new : true})
	.select('-password')
	.exec((err, followers)=>{
		if(err){
			console.log('error finding user you want to follow', err);
			return res.status(400).json({
				error : 'invalid request'
			});
		}else{
			User.findByIdAndUpdate(req.user._id, {
				$pull:{
					following: req.params.userId
				}
			}, {new : true})
			.select('-password')
			.exec((err, following)=>{
				if(err){
					console.log('could not pull from following list', err);
				}else{
					console.log('pulled from following list');
					let result = {
						followers,
						following
					}
					console.log('added to followings list', result);
					return res.json({
						result
					});					
				}
			});

		}
	})
}

router.get('/user/:userId', reqLogin, handleGetUserProfileReq);
router.put('/user/follow/:userId', reqLogin, handleFollowUserReq);
router.put('/user/unfollow/:userId', reqLogin, handleUnfollowUserReq);

module.exports = router;