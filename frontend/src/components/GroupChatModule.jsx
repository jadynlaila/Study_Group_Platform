import React, { useState } from 'react';
import './GroupChatModuleStyle.css'; // Import styles from the separate CSS file
import TextRegion from './TextRegion'; // Import the TextRegion component

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

const GroupChatModule = () => {
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