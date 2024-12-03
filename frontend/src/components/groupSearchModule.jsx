import React, { useState, useEffect } from 'react';
import './GroupSearchModule.css';
import GroupCreationModule from './groupCreationModule';
import axios from 'axios';

let baseURL = `http://localhost:${process.env.PORT || 6789}`


const GroupSearchModule = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const[allGroups, setAllGroups] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])

  useEffect(() => {
    if (user) { 
      console.log('userrr', user.username)
      fetchAllGroups(); 
    }
  }, [user])

  const fetchAllGroups = async () => {
    try {
          const response = await axios.get(`${baseURL}/api/group`);
          const groups = response.data
          console.log('groups', groups)
          console.log('user', user.username)
          const availableGroups = groups.filter(group =>
            !user.groups.includes(group._id)
          )
          
          setAllGroups(groups)
          setFilteredGroups(availableGroups)
    } catch (error) {
          console.error("Error fetching groups", error)
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)

    const filtered = allGroups.filter((group) => 
      group.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
      !user.groups.includes(group._id)
    )
    setFilteredGroups(filtered)
  }


  const addGroup = async(groupId) => {
    try{ 
      const updatedUser = await axios.put(`${baseURL}/api/student/${user._id}`, {
        groups: [...user.groups, groupId]
      })
      console.log('updated user', updatedUser)
      setFilteredGroups(filteredGroups.filter(group => group._id !== groupId))
    }catch(error) { 
      console.error('error adding group', error)
    }
  }


  return (
    <div className="group-search-page">

        {isCreatingGroup ? (
          <GroupCreationModule user={user}/> // Reference the form from GroupCreationPage.jsx
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Find a study group"
                value={searchTerm}
                onChange= {handleSearchChange}
                className="search-input"
              />
            </div>

            <div className="group-list">
              <button
                className="create-group-button"
                onClick={() => setIsCreatingGroup(true)}
              >
                <span>+</span> Create New Group
              </button>
              {filteredGroups.map((group) => (
                  <button className="group-item" key={group._id} onClick={() => addGroup(group._id)}>
                    <div>{group.name}</div>
                    <div>{group.courses}</div>
                    <div>{group.memberCount && group.memberLimit ? `${group.memberCount}/${group.memberLimit} members` : ""}</div>
                  </button>
              ))}
            </div>
          </>
        )}
      
        
      
    </div>
  );
};

export default GroupSearchModule;
