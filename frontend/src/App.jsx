import React from 'react';
import './App.css';
import GroupChatModule from './components/GroupChatModule';
import LoginPage from './Login/LogIn';
import {Navigate, Route, Routes} from "react-router-dom"
import { useAuthContext } from "./context/AuthContext.jsx";
import {useEffect, useState} from 'react'

const App = () => {
  const {authUser, setAuthUser} = useAuthContext(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("student");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, [setAuthUser]);

  return (
    <div>
      <Routes>
      <Route path='/' element={authUser ? <GroupChatModule /> : <Navigate to={"/login"} />} />
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />
      </Routes>
    </div>
  );
};

export default App; // This line is crucial for default export