import React, { useEffect, useState } from 'react';
import './GroupChatModuleStyle.css'; // Import styles from the separate CSS file
import TextRegion from './TextRegion/TextRegion.jsx'; // Import the TextRegion component
import axios from 'axios';
import Navbar from './Navbar.jsx';
// import Cookies from 'js-cookie';
import { useAuthContext } from '../context/AuthContext.jsx';

/*
/  Axios Setup and Wrappers
*/

let baseURL = `http://localhost:${process.env.PORT || 6789}`

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
async function getDataFromURL(url, expectedStatus=200) {
  const response = await axios.get(url);

  if (response.status !== expectedStatus) {
    console.error(`Failed to obtain data from '${url}'.
      Obtained a status code ${response.status} instead of ${expectedStatus}.`);

    return;
  }

  return response.data;
}

async function getGroup(groupID) {
  return getDataFromURL(`${baseURL}/api/group/${groupID}`);
}

async function getUserData(userID) {
  return getDataFromURL(`${baseURL}/api/student/${userID}`);
}

async function getMessagesFromGroup(groupID) {
  return getDataFromURL(`${baseURL}/api/group/${groupID}/messages`);
}

async function getGroupDataFromGroupIDs(groupIDs) {
  let groups = [];

  for (const groupID in groupIDs) {
    const response = getDataFromURL(`${baseURL}/api/group/${groupID}`)

    if (response.status !== 200) {
      continue;
    }

    groups.push(response.data);
  }

  return groups;
}

/*
/  React Containers
*/

function GroupChatContents() {
  const [filteredChats, ] = useState([]);
  const [, setSelectedGroup] = useState('');

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
    <ul className="listContent">
      {filteredChats.map((item) => (
        <li key={item} className="groupChatItem">
          <button onClick={() => handleGroupSelect(item._id)} className="groupChatName">
            {item.name}
          </button>
        </li>
      ))}
    </ul>
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
  const [, setGroups] = useState([]);

  useEffect(() => {
    /*
    /  Helper Functions
    */

    async function updateGroupList() {
      const userData = await getUserData();

      // If we failed to get a user, don't do anything else
      if (!userData) {
        return;
      }

      const groupData = getGroupDataFromGroupIDs(userData.groups);

      // If we failed to get a group, don't do anything else
      if (!groupData) {
        return;
      }

      // Perform the react component update
      setGroups(groupData);
    }

    // Update the group list if the user is logged in
    //? Not sure why we're checking if we're logged in here.
    //? Shouldn't this check be done somewhere up the stack?
    if (authUser) updateGroupList();

  }, [authUser]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <GroupChatContents />
        <ChatContainer />
      </div>
    </div>
  );
}

export default GroupChatModule;