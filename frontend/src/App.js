import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './Login/LogIn';
import './App.css';
// import TextRegion from './components/TextRegion'; // Ensure the casing matches
import GroupChatModule from './components/GroupChatModule';
import LoginPage from './Login/LogIn';

/*
const App = () => {
  return (
    <div>
      <h1>Group Chat Application</h1>
      <Navbar/>
     { <TextRegion /> Doesnt need to be rendered seperatly, it is imported into GroupChatModule and loaded  dynamically }
      { <GroupChatModule /> }
    </div>
  );
}; 
*/

const App = *() => {
  // state tracks log in status
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  // login success change to true
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {/* Route handling */}
        <Switch>
          <Route exact path="/" render={() => (isLoggedIn ? <Redirect to="/main" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />)} />
          <Route path="/main">
            {isLoggedIn ? <GroupChatModule onLogout={handleLogout} /> : <Redirect to="/" />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );

export default App; // This line is crucial for default export
