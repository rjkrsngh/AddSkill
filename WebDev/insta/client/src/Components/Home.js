import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';
import {Link} from 'react-router-dom';


const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    
    useEffect(()=>{
        fetch('/postlist', {
            method :'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log('before reversing:', res.posts);
            res.posts.reverse();
            console.log('after reversing:', res.posts);
            setData(res.posts);
        }).catch(err=>{
            console.log('err while fetching post list: ', err);
        })
    }, []);

    const likePost = (postId)=>{
        fetch('like', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                postId
            })
        }).then(res=>res.json())
        .then(result=>{
            let response_result = result.result;
            const newData = data.map(item=>{
                if(item._id == response_result._id){
                    return response_result
                }else{
                    return item
                }
            });
            setData(newData);
        })
        .catch(err=>{
            console.log('error sending increment like count req: ', err);
        });
    }

    const unlikePost = (postId)=>{
        fetch('unlike', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                postId
            })
        }).then(res=>res.json())
        .then(result=>{
            let response_result = result.result;
            const newData = data.map(item=>{
                if(item._id == response_result._id){
                    return response_result
                }else{
                    return item
                }
            });
            setData(newData);            
        })
        .catch(err=>{
            console.log('error sending decrement like count req: ', err);
        });
    }

    const createCommentOnPost = (postId, text) => {
        fetch('/comment', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body : JSON.stringify({
                text,
                postId
            })
        }).then(res=>res.json())
        .then(res=>{
            let response_result = res.result;
            const newData = data.map(item=>{
                if(item._id == response_result._id){
                    return response_result
                }else{
                    return item
                }
            });   
            setData(newData);         
        })
        .catch(err=>{
            console.log('error while fetching comments: ', err);
        });
    }

    const makeDeletePostReq = (postId)=>{
        fetch('/post/delete/'+postId, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then(res=>res.json())
        .then(result=>{
            let resp = result.result;
            const newData = data.filter(item=>{
                return item._id !== resp._id;
            });
            setData(newData);
        }).catch(err=>{
            console.log('error from server: ', err);
        })
    }

    const makeDeleteCommentReq = (commentId) => {
        fetch('/comment/delete/'+commentId, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log('result: ', result)
        })
        .catch(err=>{
            console.log('error while deleting comment: ', err);
        })
    }

    return (
        <div className="home">
        {
            data.map(item=>{
                return (
                    <div className='card home-card' key={item._id}>
                        <h5> <Link to={ item.postedBy._id != state._id ? "/user/"+item.postedBy._id : '/profile'}> 
                            {item.postedBy.name} </Link>
                            {item.postedBy._id == state._id &&
                                <i className="material-icons" style={{float:'right'}}
                                onClick={()=>makeDeletePostReq(item._id)}>delete</i> }
                        </h5>
                        
                        <div className='card-image'> 
                            <img src={item.photo}/>
                        </div>

                        <div className='card-content'>
                            <i className="material-icons">favorite</i>                          
                                {item.likes.includes(state._id) 
                              ? <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                              : <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }                             

                            <h6> {item.likes.length} likes </h6>
                            <h6> {item.title} </h6>
                            <p> {item.body} </p>

                            <hr/>
                            {
                                item.comments.length ?
                                    item.comments.map(comment=>{
                                        return (
                                            <div key={comment._id}>
                                                <h7> {comment.postedBy.name} : {comment.text}</h7>
                                            </div>
                                        )
                                    })
                                    : <div>
                                         <p> No comments! </p>
                                      </div>
                            }

                            <form onSubmit={(event)=>{
                                event.preventDefault();
                                createCommentOnPost(item._id, event.target[0].value);

                            }}> 
                                <input type='text' placeholder='comment'/>
                            </form>
                        </div>
                    </div>
                );
            })
        }
    	</div>
    );
}

export default Home;