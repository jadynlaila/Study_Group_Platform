import React, { useEffect, useState } from 'react';
import { getUserSettings, updateUserSettings } from '../studentService'; // Import the service functions
import { useAuthContext } from '../context/AuthContext';

const UserSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser  } = useAuthContext();

  // Get student ID from the authenticated user
  const studentId = authUser._id; // Ensure the correct property name is used

  // Fetch user settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      if (!studentId) {
        setError('No student ID found in the authenticated user.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserSettings (studentId); // Call the function to get user settings
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [studentId]); // Dependency array should include studentId

  // Handle form submission to update settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      setError('No student ID found in the authenticated user.');
      return;
    }

    try {
      const updatedData = await updateUserSettings(studentId, settings); // Call the function to update user settings
      setSettings(updatedData);
      alert('Settings updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Settings</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            value={settings.firstName || ''}
            onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            value={settings.lastName || ''}
            onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={settings.username || ''}
            onChange={(e) => setSettings({ ...settings, username: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={settings.email || ''}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Profile Picture URL:
          <input
            type="text"
            value={settings.profilePicURL || ''}
            onChange={(e) => setSettings({ ...settings, profilePicURL: e.target.value })}
          />
        </label>
      </div>
      <button type="submit">Update Settings</button>
    </form>
  );
};

export default UserSettings;