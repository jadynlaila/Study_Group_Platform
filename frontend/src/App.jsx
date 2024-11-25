import React, { useEffect, useState } from 'react';
import './App.css';
import GroupChatModule from './components/GroupChatModule.jsx';
import UserSettings from './components/UserSettings/UserSettings.jsx';
import GroupSettings from './components/GroupSettings/GroupSettings.jsx';
import LoginPage from './Login/LogIn';
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";

const App = () => {
  const { authUser , setAuthUser  } = useAuthContext(); 
  
  useEffect(() => {
    const storedUser  = localStorage.getItem("student");
    if (storedUser ) {
      setAuthUser (JSON.parse(storedUser ));
    }
  }, [setAuthUser ]);


  return (
    <div>
      <Routes>
        <Route path='/' element={authUser  ? <GroupChatModule /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser  ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/userSettings' element={authUser ? <UserSettings/> : <Navigate to="/login" />} />
        <Route path='/groupSettings' element={authUser ? <GroupSettings/> : <Navigate to="/login" />} />        
      </Routes>
    </div>
  );
};

export default App; // This line is crucial for default export