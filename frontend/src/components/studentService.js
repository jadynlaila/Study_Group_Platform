// src/services/studentService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Adjust the base URL as needed

export const getUserSettings = async (studentId) => {
  try{
    const response = await axios.get(`${BASE_URL}/api/student/${studentId}`);
  return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching user details:',error);
    return null; // Return null if the request fails
  }
};

export const updateUserSettings = async (studentId, userData) => {
  try {
  const response = await axios.put(`${BASE_URL}/api/student/${studentId}`, userData);
  return response.data; // Return the updated user data
  } catch (error) {
    console.error('Error updating user details:', error);
    return null; // Return null if the request fails
  }
};