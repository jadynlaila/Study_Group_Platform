import React, { useState } from 'react';
import './TextRegionStyle.css'; // Ensure this path is correct

const TextRegion = ({ group }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      // Add the message with a sender identifier (for simplicity, we'll use 'me' for the user)
      setMessages([...messages, { text: inputText, sender: 'me' }]);
      setInputText('');
    }
  };

  return (
    <div className="text-region">
      <h2>{group} Chat</h2> {/* Display the group name */}
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