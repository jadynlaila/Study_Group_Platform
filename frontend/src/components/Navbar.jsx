import React, { useEffect } from 'react';
import './NavBarStyle.css';
import logo from "./Public/StudySphere-White.svg";
import logo2 from "./Public/Vector.png"
import noPic from "./Public/no-pic.png";

const NavBar = ({group, user}) => {
  useEffect(() => {
    // Event listeners for navigation
    const handleUserClick = () => {
      window.location.href = '/userSettings';
    };

    const handleGroupClick = () => {
      window.location.href = '/groupSettings';
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

  }, [group, user]);

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img src= {logo} alt="Logo" className="logo" />
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <div className="group-chat">
          <img src={ group && group.profilePictureID ? group.profilePictureID : noPic } alt="Group Profile" className="group-profile" />
          <div className="group-info">
            <span className="group-name">{group ? group.name : "Select a Group"}</span> 
            <span className="field-of-study">{group ? group.majors : ""}</span> 
            <span className="user-count">{group && group.memberCount && group.memberLimit ? `${group.memberCount}/${group.memberLimit}` : ""}</span> 
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <div className="user-details">
          <img src={ user ? user.profilePicURL : noPic } alt="User Profile" className="user-profile" />
          <div className="user-info">
            <span className="user-name">{user ? `${user.firstName} ${user.lastName}` : ""}</span>
            <span className="user-major">{user ? user.major : ""}</span> 
            <span className="user-college">{user ? user.school : ""}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
