// src/App.js
import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';
// ("dotenv").config()
import './App.css';  // Import the CSS file for styling

// console.log(process.env)
const App = ({headerName,kaiwaPosition,name}) => {
    
    const [messages, setMessages] = useState([]);

    const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    // console.log(messages[1], "history")

    return (
        <div style={{top:kaiwaPosition.top,left:kaiwaPosition.left,bottom:kaiwaPosition.bottom,right:kaiwaPosition.right}}  className="chat-widget">
            <div style={{background:headerName}} className="chat-header">
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="User" className="user-image" />
                <div className="header-info">
                    <span className="user-name">Chat with {name}</span>
                    <span className="status">Powered of KAIWA AI</span>
                </div>
            </div>
            <ChatHistory messages={messages} />
            <ChatBox onMessageSubmit={handleNewMessage} />
        </div>
    );
};

export default App;
