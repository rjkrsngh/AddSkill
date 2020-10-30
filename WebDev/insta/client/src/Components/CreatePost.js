import React , {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');


	// will be triggered as soon as the image url received from cloudinary is set in the app
	// It is also triggered on component mount, so prevent make a check
	useEffect(()=> {
		// make request only when the url is available
		console.log('url existence:', url);
		if(url){
			fetch('/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer '+localStorage.getItem('jwtToken')
					},
					body: JSON.stringify({
						title,
						body,
						imageUrl:url
					})
				}).then(res=>res.json())
				.then(data=>{
					if(!data.error){
						console.log(data);
						M.toast({html: 'create post successful', classes:'#00e676 green accent-3'});
						history.push('/');
					}
				})
				.catch(err=>{
					console.log('err: ', err);
					M.toast({html: 'create post failed', classes:'#c62828 red darken-3'});
				})		
		}
	}, [url]);


	const getImgUrlFrmCloudServerAndPost = ()=>{
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'insta-clone');
		data.append('cloud_name', 'rjkrsngh');

		fetch('https://api.cloudinary.com/v1_1/rjkrsngh/image/upload',{
			method: 'POST',
			body: data
		}).then(res=>res.json())
		.then(data=>{
			console.log('got image url from cloudinary server', data.url);

			// setUrl is asynchronous and takes a while.
			// To make it synchronous, we use the useEffect hook
			setUrl(data.url);
		})
		.catch(err=>{
			console.log('err getting url from cloudinary server');
			console.log('err details: ', err);
		});	
	}

    return (
        <div className='create-post card input-field' style={{margin:'30px auto', maxWidth:'500px', padding:'20px', textAlign:'center'}}>
			<input type='text' placeholder='title' value={title} onChange={(event)=>setTitle(event.target.value)}/>
			<input type='text' placeholder='body' value={body} onChange={(event)=>setBody(event.target.value)}/>
			<div className="file-field input-field">
		      <div className="btn #64b5f6 blue lighten-2">
		        <span>Choose</span>
		        <input type="file" onChange={(event)=>setImage(event.target.files[0])}/>
		      </div>
		      <div className="file-path-wrapper">
		        <input className="file-path validate" type="text" />
		      </div>
		    </div>	
		    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" 
		    name="action" onClick={()=>getImgUrlFrmCloudServerAndPost()}>Post</button>	
		</div>
    );
}

export default CreatePost;