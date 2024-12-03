import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams for navigation and route parameters
import axios from 'axios'; // Import axios for making API requests
import './GroupSettings.css'; // Import the CSS file
import getApiUrl from '../../utils/apiUrl.js'

const apiURL = getApiUrl();

const GroupSettings = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { groupId } = useParams(); // Get the group ID from the route parameters
  const [groupData, setGroupData] = useState(null); // State to store group data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode


  console.log(groupId);
  console.log('HELLLOOOO');
  // Function to fetch group data
  const fetchGroupData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/groups/${groupId}`); // Fetch group data from API
      setGroupData(response.data); // Set the group data in state
    } catch (err) {
      setError('Error fetching group data'); // Set error message if request fails
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  // Function to handle updating group data
  const handleUpdateGroup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.put(`${apiURL}/api/groups/${groupId}`, groupData); // Update group data
      setGroupData(response.data); // Update local state with the new group data
      setIsEditing(false); // Exit edit mode
      alert('Group settings updated successfully!'); // Notify user of success
    } catch (err) {
      setError('Error updating group data'); // Handle error
    }
  };

  // Fetch group data when the component mounts
  useEffect(() => {
    fetchGroupData(); // Call the fetch function
  }, [groupId]); // Re-run effect if groupId changes

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

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