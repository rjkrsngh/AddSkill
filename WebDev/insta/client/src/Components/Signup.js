import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const makeSignupRequest = () => {
        // if (!name || !email || !password) {
        //     console.log('all fields are required');
        // } else {

        // validate Email
        if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            console.log(name, email, password);
            fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }).then(res=>res.json())
                .then(data => {
                    console.log('data: ', data);
                    if(data.error){
                         M.toast({html: data.error, classes:'#c62828 red darken-3'});
                    }else{
                        M.toast({html: data.message, classes:'#00e676 green accent-3'});
                        history.push('/home');
                    }
                }).catch(err=>{
                    console.log('err: ', err);
                });
        }else{
            M.toast({html: "invalid email", classes:'#c62828 red darken-3'});
        }
        // }
    }

    return (
        <div className='login-card'>
            <div className='card auth-card'>
                <h2>Signup</h2>

                <input type='text' placeholder='username' required value={name} name='name'
                    onChange={(e)=>setName(e.target.value)}/>
                <input type='email' placeholder='email' required value={email} name='email'
                    onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder='password' required value={password} name='password'
                    onChange={(e)=>setPassword(e.target.value)}/>

                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
                onClick={()=>makeSignupRequest()} type="submit" name="action">Register</button>
                
                <h5 className='existing-user'> <Link to="/signin"> Already a user? </Link> </h5>                                                                                                   
            </div>
        </div>
    );
}


export default Signup;