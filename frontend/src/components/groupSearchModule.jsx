import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GroupSearchModule.css';
import GroupCreationModule from './groupCreationModule'; // Import the form component

const GroupSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Sample group data
  const groups = [
    { id: 1, name: 'Study Group A' },
    { id: 2, name: 'Study Group B' },
    { id: 3, name: 'Study Group C' },
  ];

  // Filter groups based on search term
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="group-search-page">
      <div className="sidebar"> {/* Left column (optional) */}
        {/* You can add additional content here */}
      </div>

      <div className="main-column"> {/* Middle column */}
        <div className="navbar">
          <h2>Navigation Bar</h2> {/* You can customize this */}
        </div>

        {isCreatingGroup ? (
          <GroupCreationModule /> // Reference the form from GroupCreationPage.jsx
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Find them smart bitches..."
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

      <div className="sidebar"> {/* Right column (optional) */}
        {/* You can add additional content here */}
      </div>
    </div>
  );
};

export default GroupSearchModule;
