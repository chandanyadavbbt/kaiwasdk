// src/components/ChatHistory.js
import React from 'react';
import ChatMessage from './ChatMessage';

const ChatHistory = ({ messages }) => {
    return (
        <div className="chat-history">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}
        </div>
    );
};

export default ChatHistory;
