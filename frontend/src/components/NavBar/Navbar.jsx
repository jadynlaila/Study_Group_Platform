import React, { useEffect } from 'react';
import './styles.css';

const NavBar = () => {
  useEffect(() => {
    // Event listeners for navigation
    const handleUserClick = () => {
      window.location.href = 'user-settings.html';
    };

    const handleGroupClick = () => {
      window.location.href = 'group-settings.html';
    };

    const userInfo = document.querySelector('.user-info');
    const groupChat = document.querySelector('.group-chat');

    if (userInfo) userInfo.addEventListener('click', handleUserClick);
    if (groupChat) groupChat.addEventListener('click', handleGroupClick);

    // Cleanup event listeners
    return () => {
      if (userInfo) userInfo.removeEventListener('click', handleUserClick);
      if (groupChat) groupChat.removeEventListener('click', handleGroupClick);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img src="public/StudySphere-White.svg" alt="Logo" className="logo" />
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <div className="group-chat">
          <img src="public/download.jpg" alt="Group Profile" className="group-profile" />
          <div className="group-info">
            <span className="group-name">Datastructures T_T</span> {/* Placeholder */}
            <span className="field-of-study">Computer Science</span> {/* Placeholder */}
            <span className="user-count">?/?</span> {/* Placeholder */}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <div className="user-details">
          <img src="public/vector.png" alt="User Profile" className="user-profile" />
          <div className="user-info">
            <span className="user-name">Valentino Valero</span> {/* Placeholder */}
            <span className="user-major">ComputerScience</span> {/* Placeholder */}
            <span className="user-college">NAU</span> {/* Placeholder */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
