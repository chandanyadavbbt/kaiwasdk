// src/App.js
import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';

const App = () => {
    const [messages, setMessages] = useState([]);

    const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="app">
            <h1>Chat with Llama</h1>
            <ChatHistory messages={messages} />
            <ChatBox onMessageSubmit={handleNewMessage} />
        </div>
    );
};

export default App;
