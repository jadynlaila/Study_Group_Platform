import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './GroupCreationModule.css'; // Import CSS for styling

const GroupCreationPage = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [courses, setCourses] = useState('');
  const [majors, setMajors] = useState('');
  const [memberLimit, setMemberLimit] = useState(10); // Default member limit
  const [ownerID, setOwnerID] = useState(''); // This should be set to the current user's ID
  const [profilePictureID, setProfilePictureID] = useState(''); // Optional

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/groups', {
        name: groupName,
        description: groupDescription,
        courses: courses.split(','), // Assuming courses are comma-separated
        majors: majors.split(','), // Assuming majors are comma-separated
        memberLimit,
        ownerID,
        profilePictureID,
      });
      console.log('Group created:', response.data);
      // Reset form or redirect as needed
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="group-creation-page">
      

      <div className="main-column"> {/* Middle column */}
        <div className="navbar">
          <h2>Create a New Group</h2>
        </div>

        <form className="group-creation-form" onSubmit={handleCreateGroup}>
          <label>
            Group Name:
            <input 
              type="text" 
              placeholder="Enter group name" 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="group-input"
              required
            />
          </label>
          <label>
            Group Description:
            <textarea 
              placeholder="Enter group description" 
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="group-input"
              required
            />
          </label>
          <label>
            Courses (comma-separated):
            <input 
              type="text" 
              placeholder="Enter courses" 
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              className="group-input"
            />
          </label>
          <label>
            Majors (optional, comma-separated):
            <input 
              type="text" 
              placeholder="Enter majors" 
              value={majors}
              onChange={(e) => setMajors(e.target.value)}
              className="group-input"
            />
          </label>
          <label>
            Member Limit:
            <input 
              type="number" 
              placeholder="Enter member limit" 
              value={memberLimit}
              onChange={(e) => setMemberLimit(e.target.value)}
              className="group-input"
              min="1"
            />
          </label>
          <label>
            Owner ID:
            <input 
              type="text" 
              placeholder="Enter owner ID" 
              value={ownerID}
              onChange={(e) => setOwnerID(e.target.value)}
              className="group-input"
              required
            />
          </label>
          <label>
            Profile Picture ID (optional):
            <input 
              type="text" 
              placeholder="Enter profile picture ID" 
              value={profilePictureID}
              onChange={(e) => setProfilePictureID(e.target.value)}
              className="group-input"
            />
          </label>
          <button type="submit" className="create-group-button">Create Group</button>
        </form>
      </div>

      
    </div>
  );
};

export default GroupCreationModule;