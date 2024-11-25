import React, { useEffect, useState } from 'react';
import './GroupChatModuleStyle.css'; // Import styles from the separate CSS file
import TextRegion from './TextRegion'; // Import the TextRegion component
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useAuthContext } from '../context/AuthContext';

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
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group chat
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search input
  const [filteredChats, setFilteredChats] = useState([]); 
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (authUser) { 
      console.log("logged in user:", authUser.username)
      fetchUserWithGroups();
    }
  }, [authUser])

  // Function to handle selecting a group chat
  const handleGroupSelect = async (groupId) => {
    try{ 
      const groupDetails = await getGroup(groupId);
      if (groupDetails) { 
        setSelectedGroup(groupDetails); 
        console.log(`Group details: `, JSON.stringify(groupDetails, null, 2))
      }
    }catch (error) { 
      console.error(`Group details not found`)
    }
  };


  const getGroup = async (groupId) => {
    try {
      const response = await axios.get(`${baseURL}/api/group/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group details:', error);
      return null;
    }
  };
  

  const fetchUserWithGroups = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/student/${authUser._id}`);
      console.log('User with groups:', response.data);
      console.log(response.data)
      const groupDetailsPromises = response.data.groups.map(groupId => getGroup(groupId));
      
      const populatedGroups = await Promise.all(groupDetailsPromises);
      
      const validGroups = populatedGroups.filter(group => group !== null);
  
      setGroups(validGroups); 
  
      const filtered = validGroups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);  
    } catch (error) {
      console.error('Error fetching user or groups:', error);
    }
  };

  return (
    <div>
    {/* include Navbar ON TOP*/}
    <Navbar/>
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
            <li key={item} className="groupChatItem">
              <button onClick={() => handleGroupSelect(item._id)} className="groupChatName">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the chat component if a group is selected */}
      <div className="chatContainer">
        {selectedGroup && (
          <TextRegion key={selectedGroup.id} group={selectedGroup} />
        )}
      </div>
    </div>
    </div>
  );
};

export default GroupChatModule;