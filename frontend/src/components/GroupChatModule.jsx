import React, { useEffect, useState } from 'react';
import './GroupChatModuleStyle.css'; // Import styles from the separate CSS file
import TextRegion from './TextRegion/TextRegion.jsx'; // Import the TextRegion component
import axios from 'axios';
import Navbar from './Navbar.jsx';
// import Cookies from 'js-cookie';
import { useAuthContext } from '../context/AuthContext.jsx';
// require('dotenv').config()   // npm is stupid, so this is not an option

/*
/  Axios Setup and Wrappers
*/

const baseURL = "http://localhost:6789"

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

/*
/  Helper Functions
*/
async function getDataFromURL(url, expectedStatus = 200) {
  try {
    const response = await axios.get(url);

    if (response.status !== expectedStatus) {
      console.error(`Failed to obtain data from '${url}'.
        Obtained a status code ${response.status} instead of ${expectedStatus}.`);

      return;
    }

    return response.data;
  } catch (error) {
    console.error(error.message)
  }
}

async function getGroup(groupID) {
  if (!groupID) {
    console.error("Tried to get group data when no group ID was provided.");
    return;
  }
  return await getDataFromURL(`${baseURL}/api/group/${groupID}`);
}

async function getUserData(userID) {
  if (!userID) {
    console.error("Tried to get user data when no user ID was provided.");
    return;
  }
  return await getDataFromURL(`${baseURL}/api/student/${userID}`);
}

async function getMessagesFromGroup(groupID) {
  if (!groupID) {
    console.error("Tried to get messages from a group when no group ID was provided.");
  }
  return await getDataFromURL(`${baseURL}/api/group/${groupID}/messages`);
}

async function getGroupDataFromGroupIDs(groupIDs) {
  let groups = [];

  for (const groupID in groupIDs) {
    if (!groupID || groupID == 0) continue;

    try {
      const response = await getDataFromURL(`${baseURL}/api/group/${groupID}`)

      if (response.status !== 200) {
        continue;
      }

      groups.push(response.data);
    } catch (error) {
      console.error(error.message)
    }
  }

  return groups;
}

/*
/  React Containers
*/

function GroupChatList() {
  const [userGroups, setUserGroups] = useState([]);
  const [, setSelectedGroup] = useState('');
  const { authUser } = useAuthContext();
  
  console.log(userGroups)

  async function handleGroupSelect(groupID) {
    try {
      const groupDetails = await getGroup(groupID);

      if (groupDetails) {
        setSelectedGroup(groupDetails);
      } else {
        console.error(`Failed to obtain group details for ${groupID}`)
      }

    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  function GroupChatList() {
    useEffect(() => {
      async function fetchUserGroups() {
        const userData = await getUserData(authUser._id);
        const groups = await getGroupDataFromGroupIDs(userData.groups);
        setUserGroups(groups);
      }

      fetchUserGroups();
    }, [authUser]);

    return (
      <ul className="listContent">
        {userGroups.map((currentGroup) => (
          <li key={currentGroup._id} className="groupChatItem">
            <button onClick={() => handleGroupSelect(currentGroup._id)} className="groupChatName">
              {currentGroup.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="groupChatContainer">
      <SearchContainer />
      <GroupChatList />
    </div>
  );
}

function ChatContainer() {
  const [selectedGroup,] = useState();

  return (
    <div className="chatContainer">
      {selectedGroup && (
        <TextRegion key={selectedGroup.id} group={selectedGroup} />
      )}
    </div>
  );
}

function SearchContainer() {
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search input

  return (
    <div className="searchContainer">
      <input
        className="searchInput"
        type="text"
        placeholder="Search groups..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />
    </div>
  )
}


/*
/  The final function being exported
*/
function GroupChatModule() {
  // Create context variables to be used by helper functions
  const { authUser } = useAuthContext();
  //! Variable names conflict with helper functions
  const [, setShownGroups] = useState([]);

  useEffect(() => {
    async function getUpdatedGroups() {
      const userData = getUserData(authUser._id);
  
      // If we failed to get a user, don't do anything else
      if (!userData) {
        return;
      }
  
      const groupData = getGroupDataFromGroupIDs(userData.groups);
  
      // If we failed to get a group, don't do anything else
      if (!groupData) {
        return;
      }
      
      return groupData;
    }

    // Update the group list if the user is logged in
    //? Not sure why we're checking if we're logged in here.
    //? Shouldn't this check be done somewhere up the stack?
    if (!authUser) {
      console.error("Unauthorized.");
      return;
    }
    
    // Perform the react component update
    if (authUser) {
      const groupData = getUpdatedGroups()
      setShownGroups(groupData);
    }

  }, [authUser]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <GroupChatList />
        <ChatContainer />
      </div>
    </div>
  );
}

export default GroupChatModule;