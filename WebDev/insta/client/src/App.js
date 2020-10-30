import './App.css';
import React, {useEffect, createContext, useReducer, useContext} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Login from './Components/Login';
import Signup from './Components/Signup';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import CreatePost from './Components/CreatePost';
import UserProfile from './Components/UserProfile';
import {reducer, initialState} from './Reducers/userReducer';

// TODO: read on react hooks
export const UserContext = createContext();

// Whenever the state of a component changes, it is re-rendered
// So to grab and reflect the new change, we make use of useReducer
// It is similar to useState

const Routing = ()=>{
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userdata'));
    if(user){
      dispatch({
        type: 'USER',
        payload: user
      });
    }else{
      history.push('/signin');
    }
  }, []);

  return (
    // use switch or fragments
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
            
      <Route path='/signin'>                                                                                                                                
        <Login />
      </Route>

      <Route path='/signup'>                                                                                                                                
        <Signup />
      </Route>

      <Route exact path='/profile'>                                                                                                                               
        <Profile />
      </Route>

      <Route path='/create'>                                                                                                                               
        <CreatePost />
      </Route>

      <Route path='/user/:userId'>                                                                                                                               
        <UserProfile />
      </Route>      
    </Switch>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;