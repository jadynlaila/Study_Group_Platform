import React, { useEffect, useState } from 'react';
import './App.css';
import GroupChatModule from './components/GroupChatModule/GroupChatModule.jsx';
import UserSettingsButton from './components/UserSettings/UserSettings.jsx'
import LoginPage from './Login/LogIn';
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";

const App = () => {
  const { authUser , setAuthUser  } = useAuthContext(); 
  const [showUserSettings, setShowUserSettings] = useState(false); // State to manage UserSettings visibility

  useEffect(() => {
    const storedUser  = localStorage.getItem("student");
    if (storedUser ) {
      setAuthUser (JSON.parse(storedUser ));
    }
  }, [setAuthUser ]);

  const handleUserSettingsToggle = () => {
    setShowUserSettings(prev => !prev); // Toggle UserSettings visibility
  };

  return (
    <div>
      <UserSettingsButton onClick={handleUserSettingsToggle} /> {/* Pass the toggle function to the button */}
      {showUserSettings && <UserSettings />} {/* Conditionally render UserSettings */}
      
      <Routes>
        <Route path='/' element={authUser  ? <GroupChatModule /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser  ? <Navigate to='/' /> : <LoginPage />} />
      </Routes>
    </div>
  );
};

export default App; // This line is crucial for default export