import React, { useState, useEffect } from 'react';
import './GroupSearchModule.css';
import GroupCreationModule from './groupCreationModule';
import axios from 'axios';

let baseURL = `http://localhost:${process.env.PORT || 6789}`;

const GroupSearchModule = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('userrr', user.username);
      fetchAllGroups();
    }
  }, [user]);

  const fetchAllGroups = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/group`);
      const groups = response.data;
      console.log('groups', groups);
      console.log('user', user.username);
      const availableGroups = groups.filter(group =>
        !user.groups.includes(group._id)
      );

      setAllGroups(groups);
      setFilteredGroups(availableGroups);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const filtered = allGroups.filter((group) =>
      group.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
      !user.groups.includes(group._id)
    );
    setFilteredGroups(filtered);
  };

  const addGroup = async (groupId) => {
    try {
      // Update the user's groups in the backend
      await axios.put(`${baseURL}/api/student/${user._id}`, {
        groups: [...user.groups, groupId]
      });

      // Fetch the updated user data to ensure the local state is in sync
      const updatedUserResponse = await axios.get(`${baseURL}/api/student/${user._id}`);
      const updatedUser = updatedUserResponse.data;

      // Update the user state in your application (if you have a user state management)
      // For example, if you're using a context or Redux, you would dispatch an action here
      // setUser(updatedUser); // Uncomment this if you have a setUser function

      // Update the filtered groups to remove the joined group
      setFilteredGroups(filteredGroups.filter(group => group._id !== groupId));

      // Optionally, you can refresh the page if you want to ensure everything is reloaded
      // window.location.reload(); // Uncomment this if you want to refresh the page
    } catch (error) {
      console.error('Error adding group', error);
    }
  };

  return (
    <div className="group-search-page">
      {isCreatingGroup ? (
        <GroupCreationModule user={user} /> // Reference the form from GroupCreationPage.jsx
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Find a study group"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="group-list">
            <button
              className="create-group-button"
              onClick={() => setIsCreatingGroup(true)}
            >
              <span>+</span> Create New Group
            </button>
            {filteredGroups.map((group) => (
              <div className="group-item" key={group._id}>
                <div className="group-details-container">
                  <div className="group-details">
                    <h3 className="group-name">{group.name}</h3>
                    <p className="group-description">Description: {group.description}</p>
                    <div className="group-info">
                      <span className="group-members">
                        Members: {group.memberCount}/{group.memberLimit}
                      </span>
                      <span className="group-class">Course: {group.courses}</span>
                    </div>
                  </div>
                  <button className="join-group-button" onClick={() => addGroup(group._id)}>
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupSearchModule;