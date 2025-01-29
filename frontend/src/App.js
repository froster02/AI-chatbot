import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send the user's input to the backend
      const res = await axios.post('http://localhost:5002/chat', {
        userQuery: inputValue
      });
      // We'll store the response in the "response" state
      setResponse(res.data.reply);
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with server");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My AI Chatbot</h1>
      <div>
        <input
          type="text"
          placeholder="Type your query..."
          value={inputValue}
          onChange={handleChange}
          style={{ width: '300px', padding: '10px' }}
        />
        <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '10px 20px' }}>
          Send
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Response: {response}</p>
      </div>
    </div>
  );
}

export default App;