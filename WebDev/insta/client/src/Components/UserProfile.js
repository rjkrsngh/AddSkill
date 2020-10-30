import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';
import {Link, useParams} from 'react-router-dom';

const UserProfile = () => {
	// const [myPosts, setMyPosts] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [userPosts, setUserPosts] = useState([]);
	const {state, dispatch} = useContext(UserContext);
	const {userId} = useParams();

	useEffect(()=>{
		fetch('/user/'+userId, {
			method : 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
			}
		}).then(res=>res.json())
		.then(res=>{
			setUserInfo(res.user);
			setUserPosts(res.posts);
		}).catch(err=>{
			console.log('error fetching myposts from db', err);
		})
	}, []);

	// const makeFollowUserReq = (userId) => {
	// 	console.log(state._id, userId);
	// 	fetch('/user/follow/'+userId, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
	// 		}
	// 	}).then(res=>res.json())
	// 	.then(res=>{
	// 		console.log(res.result)
	// 		setUserInfo(res.result);
	// 	})
	// 	.catch(err=>{
	// 		console.log('error is ', err);
	// 	})
	// }

	// const makeUnfollowUserReq = (userId) => {
	// 	console.log(state._id, userId);
	// 	fetch('/user/unfollow/'+userId, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
	// 		}
	// 	}).then(res=>res.json())
	// 	.then(res=>{
	// 		setUserInfo(res.result);
	// 	})
	// 	.catch(err=>{
	// 		console.log('error is ', err);
	// 	})
	// }	

	const makeFollowUserReq = (userId) => {
		console.log(state._id, userId);
		fetch('/user/follow/'+userId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
			}
		}).then(res=>res.json())
		.then(res=>{
			console.log(res.result.followers);
			setUserInfo(res.result.followers);
		})
		.catch(err=>{
			console.log('error is ', err);
		})
	}

	const makeUnfollowUserReq = (userId) => {
		console.log(state._id, userId);
		fetch('/user/unfollow/'+userId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
			}
		}).then(res=>res.json())
		.then(res=>{
			console.log(res.result.followers);
			setUserInfo(res.result.followers);
		})
		.catch(err=>{
			console.log('error is ', err);
		})
	}

    return (
        <div style={{ maxWidth:'550px', margin:'0px auto'}}>
	        <div style={{ display: 'flex', justifyContent:'space-around', margin:"25px 0px", borderBottom:"1px solid gray"}}>
	        	<div>
	        		<img style={{width:"160px", height:"160px", borderRadius:"80px"}}
	        		src={userInfo.photo == undefined ? '/default-profile-picture.jpg' : userInfo.photo} alt='No photo'/>
	        	</div>

	        	<div>
	        		<h4>{userInfo.name}</h4>
	        		<h5>{userInfo.email}</h5>
	        		<div>
	        			<h8> {userPosts.length ? userPosts.length : 0} posts </h8>
	        			<h8> {userInfo.following ? userInfo.following.length : 0} following </h8>
	        			<h8> {userInfo.followers ? userInfo.followers.length : 0} followers </h8>
	        		</div>
	        			
	        		{userInfo.followers && userInfo.followers.includes(state._id)
	        			? <h7 onClick={()=>makeUnfollowUserReq(userInfo._id)}> unfollow </h7> 
	        			: <h7 onClick={()=>makeFollowUserReq(userInfo._id)}> follow </h7> 
	        		}

	        	</div>
	    	</div>

	    	<div className='gallery'>
	    	{
				userPosts.map(item=>{
					return (<img key={item._id} className='item' src={item.photo} alt={item.title}/>)
				})   		
	    	}	   
	    	</div>
    	</div>
    );
}

export default UserProfile;