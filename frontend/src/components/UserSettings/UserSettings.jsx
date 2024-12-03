import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSettings, updateUserSettings } from '../studentService'; // Import the service functions
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios'; // Corrected import statement


const UserSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser  } = useAuthContext();
  const navigate = useNavigate();
  
  function logout() {
    console.log("Logging out...")

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('student');
    navigate('/login');
  }

  // Fetch user settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      if (!authUser ) {
        setLoading(false); // Stop loading if authUser  is not available
        return;
      }

      const studentId = authUser._id; // Ensure the correct property name is used

      if (!studentId) {
        setError('No student ID found in the authenticated user.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserSettings(studentId); // Call the function to get user settings
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [authUser ]); // Dependency array includes authUser  

  // Handle form submission to update settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser ) {
      setError('No authenticated user found.');
      return;
    }

    const studentId = authUser._id; // Ensure the correct property name is used

    try {
      const updatedData = await updateUserSettings(studentId, settings); // Call the function to update user settings
      setSettings(updatedData);
      alert('Settings updated successfully!');

      // Update the token data so that the user information is updated.
      localStorage.setItem("student", JSON.stringify(updatedData));

      // Redirect back to the main page
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure that settings contain the necessary fields before rendering
  return (
    <form onSubmit={handleSubmit}>
      <h2>User Settings</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            value={settings.firstName || ''} // Default to an empty string if firstName is not available
            onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            value={settings.lastName || ''} // Default to an empty string if lastName is not available
            onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={settings.username || ''} // Default to an empty string if username is not available
            onChange={(e) => setSettings({ ...settings, username: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={settings.email || ''} // Default to an empty string if email is not available
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Profile Picture URL:
          <input
            type="text"
            value={settings.profilePicURL || ''} // Default to an empty string if profilePicURL is not available
            onChange={(e) => setSettings({ ...settings, profilePicURL: e.target.value })}
          />
        </label>
      </div>
      <button type="button" onClick={logout}>Log out</button>
      <button type="submit">Update Settings</button>
 </form>
  );
};

export default UserSettings;