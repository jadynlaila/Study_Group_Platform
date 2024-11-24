import React, { useEffect, useState } from 'react';
import './GroupChatModuleStyle.css'; // Import styles from the separate CSS file
import TextRegion from './TextRegion'; // Import the TextRegion component
import axios from 'axios';
import 
import Cookies from 'js-cookie'
import { useAuthContext } from '../context/AuthContext';

// Sample data for group chats
const groupChats = [
  { id: '1', name: 'Automata Theory Peeps' },
  { id: '2', name: 'THE bio gc' },
  { id: '3', name: 'Bio182Lab' },
  { id: '4', name: 'SENDHELP CS480gc' },
  { id: '5', name: 'CS460 Networks Midterm' },
  { id: '6', name: 'CS386 Midterm and Final' },
  { id: '7', name: 'CALC3 Exam 3' },
  { id: '8', name: 'CS126 f24' },
  { id: '9', name: 'The best group chat ever' },
];

// axios.defaults.baseURL = `http://localhost:${process.env.PORT || 3000}`
let baseURL = `http://localhost:${process.env.PORT || 6789}`

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})
    
axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

const GroupChatModule = () => {
  const {authUser} = useAuthContext(); 
  useEffect(() => {
    if (authUser) { 
      console.log("logged in user:", authUser.username)
      fetchGroups();
    }
  }, [authUser])

  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group chat
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search input

  // Function to handle selecting a group chat
  const handleGroupSelect = (group) => {
    setSelectedGroup(group); // Set the selected group, replacing any previous selection
  };

  // Filtered group chats based on the search query
  const filteredChats = groupChats.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch the list of students from the API
  const fetchMessages = async () => {
      try {
          const response = await axios.get(`${baseURL}/api/group/messages/${authUser._id}`);
          console.log('Students:', response.data);
          return response.data
      } catch (error) {
          console.error("WERIUHERGUH AXIOS ERGHUIAERWGUIHERAGIUH")

          if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response:', error.response.data);
          }
          if (error.request) {
            // Request was made but no response received
            console.error('Error request:', error.request);
          }
          if (error.message) {
            // Something else caused the error
            console.error('Error message:', error.message);
          }
      }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // this doesn't return a user's groups - just all possible groups!
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const fetchGroups = async () => {
    try{
      console.log(`Student groups:`, authUser.groups)
    }catch(error) { 
      console.error(error)
    }
  }

  // Call fetchMessages when the component mounts
  React.useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <div className="groupChatContainer">
        <div className="searchContainer">
          <input
            className="searchInput"
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </div>
        <ul className="listContent">
          {filteredChats.map((item) => (
            <li key={item.id} className="groupChatItem">
              <button onClick={() => handleGroupSelect(item)} className="groupChatName">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the chat component if a group is selected */}
      <div className="chatContainer">
        {selectedGroup && (
          <TextRegion key={selectedGroup.id} group={selectedGroup.name} />
        )}
      </div>
    </div>
  );
};

export default GroupChatModule;