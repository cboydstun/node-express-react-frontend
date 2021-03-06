import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UserContext from './context/userContext';

import './App.css';

export default function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await axios.post('http://localhost:5001/users/tokenIsValid', null, {headers: {"x-auth-token": token}});

      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5001/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
        </UserContext.Provider>
    </BrowserRouter>
  );
}