// UserSettingsButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const UserSettingsButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  return (
    <button 
      className="user-settings-button" 
      onClick={() => navigate('/user-settings')} // Navigate to user settings page
    >
      User Settings
    </button>
  );
};

export default UserSettingsButton;