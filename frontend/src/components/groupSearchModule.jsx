import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GroupSearchModule.css';
import GroupCreationModule from './groupCreationModule'; // Import the form component

const GroupSearchModule = (user) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Sample group data
  const groups = [
    { id: 1, name: 'Study Group A' },
    { id: 2, name: 'Study Group B' },
    { id: 3, name: 'Study Group C' },
  ];

  // Filter groups based on search term
  const fetchGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMessages = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/group/messages/${authUser._id}`);
        console.log('Messages:', response.data);
        return response.data
    } catch (error) {
        console.error("WERIUHERGUH AXIOS ERGHUIAERWGUIHERAGIUH")

        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Error response:', error.response.data);
        }
        if (error.request) {
          // Request was made but no response received
          console.error('Error request:', error.request);
        }
        if (error.message) {
          // Something else caused the error
          console.error('Error message:', error.message);
        }
    }
};

  return (
    <div className="group-search-page">

        {isCreatingGroup ? (
          <GroupCreationModule /> // Reference the form from GroupCreationPage.jsx
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Find a study group"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <Link to={`/group/${group.id}`} key={group.id}>
                  <button className="group-item">{group.name}</button>
                </Link>
              ))}
            </div>
          </>
        )}
      
        
      
    </div>
  );
};

export default GroupSearchModule;
