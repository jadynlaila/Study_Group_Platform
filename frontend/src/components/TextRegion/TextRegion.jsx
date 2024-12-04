import React, { useEffect, useState } from 'react';
import './TextRegionStyle.css'; // Ensure this path is correct
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

let baseURL = `http://localhost:${process.env.EXPRESS_PORT || 6789}`



const TextRegion = ({ group }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isMeetingsOverlayOpen, setIsMeetingsOverlayOpen] = useState(false);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if (group) { 
      getMessages(group._id)
    }
  }, [group])

  const getMessages = async (groupId) => {
    try {
      const response = await axios.get(`${baseURL}/api/group/${groupId}/messages`)
      console.log(`Messages: ${JSON.stringify(response.data, null, 2)}`)
      setMessages(response.data)
    } catch(error) { 
      console.error('Error fetching messages:', error);
    }
  }

  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      // Add the message with a sender identifier 
      setMessages([...messages, { text: inputText, sender: 'me' }]);
      setInputText('');
    }
  };
  const handleGroupSettingsClick = () => {
    navigate(`/groupSettings/${group._id}`); // Include the group ID in the path
  };
  
  const handleMeetingsOverlayClick = () => {
    console.log(`Changing isMeetingsOverlayOpen from ${isMeetingsOverlayOpen} to ${!isMeetingsOverlayOpen}`)
    setIsMeetingsOverlayOpen(!isMeetingsOverlayOpen);
  }

  return (
    <div className="text-region">
      <div className="header">
        <h2>{group.name}</h2>
        <button onClick={handleGroupSettingsClick} className="settings-button">Settings</button>
        <button onClick={handleMeetingsOverlayClick} className="meetings-button">Meetings</button>
      </div>
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.author}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default TextRegion;