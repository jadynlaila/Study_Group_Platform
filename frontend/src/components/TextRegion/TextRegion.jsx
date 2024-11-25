import React, { useState } from 'react';
import './TextRegionStyle.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const TextRegion = ({ group }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
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
    navigate('/groupSettings'); // Navigate to the GroupSettings component
  };

  return (
    <div className="text-region">
      <div className="header">
        <h2>{group} Chat</h2>
        <button onClick={handleGroupSettingsClick} className="settings-button">Settings</button>
      </div>
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
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