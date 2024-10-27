import React from 'react';
import './App.css';
import TextRegion from './components/TextRegion'; // Ensure the casing matches
import GroupChatModule from './components/GroupChatModule';

const App = () => {
  return (
    <div>
      <h1>Group Chat Application</h1>
     {/* <TextRegion /> Doesnt need to be rendered seperatly, it is imported into GroupChatModule and loaded  dynamically */}
      <GroupChatModule />
    </div>
  );
};

export default App; // This line is crucial for default export