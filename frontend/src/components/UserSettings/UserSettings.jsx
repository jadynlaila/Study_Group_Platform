import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { getUserSettings, updateUserSettings } from '../studentService'; // Import the service functions
import { useAuthContext } from '../../context/AuthContext';

const UserSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate

  function logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('student');
    window.location.href = '/login';
  }

  useEffect(() => {
    const fetchSettings = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      const studentId = authUser._id;

      if (!studentId) {
        setError('No student ID found in the authenticated user.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserSettings(studentId);
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) {
      setError('No authenticated user found.');
      return;
    }

    const studentId = authUser._id;

    try {
      const updatedData = await updateUserSettings(studentId, settings);
      setSettings(updatedData);
      alert('Settings updated successfully!');
      localStorage.setItem('student', JSON.stringify(updatedData));
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-settings-container">
      <button className="back-button" onClick={() => navigate(-1)}>← </button>
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
        <button type="button" onClick={logout}>Log out</button>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default UserSettings;
