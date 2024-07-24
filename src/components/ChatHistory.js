// src/components/ChatHistory.js
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatHistory = ({ messages }) => {
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-history" ref={chatHistoryRef}>
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}
        </div>
    );
};

export default ChatHistory;
