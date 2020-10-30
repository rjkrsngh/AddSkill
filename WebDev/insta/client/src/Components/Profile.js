import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';

const Profile = () => {
	const [myPosts, setMyPosts] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const {state, dispatch} = useContext(UserContext);

	useEffect(()=>{
		fetch('/myposts', {
			method : 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
			}
		}).then(res=>res.json())
		.then(res=>{
			console.log('res for myposts:', res.posts);
			setMyPosts(res.posts);
		}).catch(err=>{
			console.log('error fetching myposts from db', err);
		})

		fetch('/myinfo', {
			method : 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
			}
		}).then(res=>res.json())
		.then(res=>{
			console.log('received user info for Profile', res);
			setUserInfo(res.user);
		}).catch(err=>{
			console.log('error fetching myposts from db', err);
		})		
	}, []);

    return (
        <div style={{ maxWidth:'550px', margin:'0px auto'}}>
	        <div style={{ display: 'flex', justifyContent:'space-around', margin:"25px 0px", borderBottom:"1px solid gray"}}>
	        	<div>
	        		<img style={{width:"160px", height:"160px", borderRadius:"80px"}}
	        		src={userInfo.photo?userInfo.photo:'/default-profile-picture.jpg'} alt='No Photo'/>
	        	</div>

	        	<div>
	        		<h4>{state?state.name:'loading'}</h4>
	        		<h5>{state?state.email:'loading'}</h5>
	        		<div>
	        			<h8> {myPosts.length ? myPosts.length : 0} posts </h8>
	        			<h8> {userInfo && userInfo.following ? userInfo.following.length : 0} following </h8>
	        			<h8> {userInfo && userInfo.followers ? userInfo.followers.length : 0} followers </h8>
	        		</div>
	        	</div>
	    	</div>

	    	<div className='gallery'>
	    	{
				myPosts.map(item=>{
					return (<img key={item._id} className='item' src={item.photo} alt={item.title}/>)
				})   		
	    	}	   
	    	</div>
    	</div>
    );
}

export default Profile;