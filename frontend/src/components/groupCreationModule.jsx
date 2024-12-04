import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './GroupCreationModule.css'; // Import CSS for styling
import GroupSearchModule from './groupSearchModule';

let baseURL = `http://localhost:${process.env.PORT || 6789}`;

const GroupCreationModule = ({ user }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [courses, setCourses] = useState('');
  const [majors, setMajors] = useState('');
  const [memberLimit, setMemberLimit] = useState(10);
  const [isCancelling, setIsCancellingGroup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/group`, {
        name: groupName,
        description: groupDescription,
        courses: courses.split(','), // Assuming courses are comma-separated
        majors: majors.split(','), // Assuming majors are comma-separated
        memberLimit,
        ownerID: user._id,
      });
      console.log('Group created:', response.data);
      setSuccessMessage('Group created successfully!'); // Set success message

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Adjust the delay as needed (2000 ms = 2 seconds)
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="group-creation-page">
      {isCancelling ? (
        <GroupSearchModule />
      ) : (
        <>
          <h2>Create a New Group</h2>

          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}

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
              <input
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

            <button type="submit" className="create-group-button">Create Group</button>
            <button
              type="button"
              className='back-to-group-search'
              onClick={() => window.location.reload()} // Refresh the page
            >
              Back
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default GroupCreationModule;