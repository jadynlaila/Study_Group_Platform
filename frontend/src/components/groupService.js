// src/groupService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:6789'; // Adjust the base URL as needed

export const getGroupSettings = async (studentId) => {
  try{
    const response = await axios.get(`${BASE_URL}/api/group/${groupId}`);
    console.log(`group data is ${response.data}`)
  return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching group details:',error);
    return null; // Return null if the request fails
  }
};

export const updateGroupSettings = async (groupId, groupData) => {
  try {
  const response = await axios.put(`${BASE_URL}/api/group/${groupId}`, groupData);
  return response.data; // Return the updated user data
  } catch (error) {
    console.error('Error updating group details:', error);
    return null; // Return null if the request fails
  }
};