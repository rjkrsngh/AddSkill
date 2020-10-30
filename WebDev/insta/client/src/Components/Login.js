import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../App';

const Login = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {state, dispatch} = useContext(UserContext);

    const makeLoginRequest = ()=>{
        if((!name) || (!password)){
            M.toast({html: 'invalid credentials', classes:'#c62828 red darken-3'});
        }else{
            fetch('/signin', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    password
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:'#c62828 red darken-3'});
                }else{
                    localStorage.setItem('jwtToken', data.token);
                    localStorage.setItem('userdata', JSON.stringify(data.user)); // localStorage stores only string data

                    dispatch({
                        type: 'USER',
                        payload: data.user
                    });

                    M.toast({html: 'signin successful', classes:'#00e676 green accent-3'});
                    history.push('/');
                }
            }).catch(err=>{
                console.log('err: ', err);
            });
        }
    }

    return (
        <div className='login-card'>
    		<div className='card auth-card'>
    			<h2>Login</h2>

    			<input type='text' placeholder='username' required value={name} 
                    onChange={(event)=>setName(event.target.value)}/>
    			<input type='password' placeholder='password' required value={password}
                    onChange={(event)=>setPassword(event.target.value)}/>

				<button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action"
                    onClick={()=>makeLoginRequest()}>Login</button>
				<h5 className='existing-user'> <Link to="/signup"> new user? </Link> </h5>	                                                                     
    		</div>
    	</div>
    );
}

export default Login;