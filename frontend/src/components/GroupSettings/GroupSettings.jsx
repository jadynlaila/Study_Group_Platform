import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams for navigation and route parameters
import axios from 'axios'; // Import axios for making API requests
import './GroupSettings.css'; // Import the CSS file

const BASE_URL = 'http://localhost:6789'; // Adjust the base URL as needed

const GroupSettings = (groupData) => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { groupId } = useParams(); // Get the group ID from the route parameters
  const [groupData, setGroupData] = useState(null); // State to store group data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode


  // Function to handle updating group data
  const handleUpdateGroup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.put(`${BASE_URL}/api/groups/${groupId}`, groupData); // Update group data
      setGroupData(response.data); // Update local state with the new group data
      console.log(response.data)
      setIsEditing(false); // Exit edit mode
      alert('Group settings updated successfully!'); // Notify user of success
    } catch (err) {
      setError('Error updating group data'); // Handle error
    }
  };
  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="group-settings">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <h1 className="group-title">{groupData.name} Settings</h1>
      <form onSubmit={handleUpdateGroup}>
        <div className="group-info">
          <p>
            <strong>Description:</strong>
            {isEditing ? (
              <input
                type="text"
                value={groupData.description}
                onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
              />
            ) : (
              ` ${groupData.description}`
            )}
          </p>
          <p>
            <strong>Courses:</strong>
            {isEditing ? (
              <input
                type="text"
                value={groupData.courses}
                onChange={(e) => setGroupData({ ...groupData, courses: e.target.value })}
              />
            ) : (
              ` ${groupData.courses}`
            )}
          </p>
          <p>
            <strong>Majors:</strong>
            {isEditing ? (
              <input
                type="text"
                value={groupData.majors}
                onChange={(e) => setGroupData({ ...groupData, majors: e.target.value })}
              />
            ) : (
              ` ${groupData.majors}`
            )}
          </p>
          <p>
            <strong>Member Limit:</strong>
            {isEditing ? (
              <input
                type="number"
                value={groupData.memberLimit}
                onChange={(e) => setGroupData({ ...groupData, memberLimit: e.target.value })}
              />
            ) : (
              ` ${groupData.memberLimit}`
            )}
          </p>
          <p>
            <strong>Current Members:</strong> {groupData.memberCount}
          </p>
          <p><strong>Members:</strong></p>
          <ul>
            {groupData.studentIds.map(studentId => (
              <li key={studentId}>{studentId}</li> // Replace with actual member info if available
 ))}
          </ul>
        </div>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button type="submit">Save Changes</button>}
      </form>
    </div>
  );
};

export default GroupSettings;