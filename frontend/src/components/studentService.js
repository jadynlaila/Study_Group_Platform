// src/studentService.js
import axios from 'axios';
import getApiUrl from '../utils/apiUrl.js'

const apiURL = getApiUrl();

export const getUserSettings = async (studentId) => {
  try{
    const response = await axios.get(`${apiURL}/api/student/${studentId}`);
    console.log(`student data is ${response.data}`)
  return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching user details:',error);
    return null; // Return null if the request fails
  }
};

export const updateUserSettings = async (studentId, userData) => {
  try {
  const response = await axios.put(`${apiURL}/api/student/${studentId}`, userData);
  return response.data; // Return the updated user data
  } catch (error) {
    console.error('Error updating user details:', error);
    return null; // Return null if the request fails
  }
};