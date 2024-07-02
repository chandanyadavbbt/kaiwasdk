// src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.role}`}>
            <p>{message.content}</p>
        </div>
    );
};

export default ChatMessage;
