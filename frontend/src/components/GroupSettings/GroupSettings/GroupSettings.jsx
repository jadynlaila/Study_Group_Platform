import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams for navigation and route parameters
import axios from 'axios'; // Import axios for making API requests
import './GroupSettings.css'; // Import the CSS file


const BASE_URL = 'http://localhost:3000'; // Adjust the base URL as needed


const GroupSettings = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { groupId } = useParams(); // Get the group ID from the route parameters
  const [groupData, setGroupData] = useState(null); // State to store group data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/groups/${groupId}`); // Fetch group data from API using the getGroup endpoint
        setGroupData(response.data); // Set the group data in state
      } catch (err) {
        setError('Error fetching group data'); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

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
      <div className="group-info">
        <p><strong>Description:</strong> {groupData.description}</p>
        <p><strong>Courses:</strong> {groupData.courses}</p>
        <p><strong>Majors:</strong> {groupData.majors}</p>
        <p><strong>Member Limit:</strong> {groupData.memberLimit}</p>
        <p><strong>Current Members:</strong> {groupData.memberCount}</p>
        {/* Display member list */}
        <p><strong>Members:</strong></p>
        <ul>
          {groupData.memberIDs.map(memberID => (
            <li key={memberID}>{memberID}</li> // Replace with actual member info if available
          ))}
        </ul>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default GroupSettings;