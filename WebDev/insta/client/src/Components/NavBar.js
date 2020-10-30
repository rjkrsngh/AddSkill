import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UserContext} from '../App';

const NavBar = () => {
	const {state, dispatch} = useContext(UserContext);
	const history = useHistory();

	const renderList = ()=>{
		// show these links in the navbar only when there is user data
		if(state){
			return [
		        <li><Link to="/profile">Profile</Link></li>,
		        <li><Link to="/create">Post</Link></li>,
		        <li>
					<button className="btn waves-effect waves-light #f44336 red" type="submit" name="logout"
	                    onClick={()=>{
	                    	localStorage.clear();
	                    	dispatch({
	                    		type: 'CLEAR'
	                    	});
	                    	history.push('/signin');
	                    }}>Logout</button>
		        </li>
			]
		}else{
	        return [
	        	<li><Link to="/signin">Login</Link></li>,                                                                                                   
	        	<li><Link to="/signup">Register</Link></li>
	        ]
		}
	}

    return (
        <nav>
	    <div className="nav-wrapper white">
	      <Link to={state?'/':'/signin'} className="brand-logo">Instagram</Link>
	      <ul id="nav-mobile" className="right">
	      	{renderList()}
	      </ul>
	    </div>
	  </nav>
    );
}

export default NavBar;