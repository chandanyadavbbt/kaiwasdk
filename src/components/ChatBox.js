// src/components/ChatBox.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = ({ onMessageSubmit }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            role: 'user',
            content: message,
        };

        // Clear input
        setMessage('');

        // Pass the message to the parent component
        onMessageSubmit(newMessage);

        // Send the message to the backend
        try {
            const response = await axios.post('http://localhost:8000/v1/chat/completions', 
                {
                model: 'llama-7b',
                messages: [newMessage],
                max_tokens: 100,
                temperature: 0.7,
                stream: false
            });
            // Pass the response back to the parent component
            onMessageSubmit(response.data.choices[0].message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    console.log(message,"from chatpage")

    return (
        <form onSubmit={handleSubmit} className="chat-box">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                className="chat-input"
            />
            <button type="submit" className="chat-send">
                <svg viewBox="0 0 24 24" className="send-icon">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
            </button>
        </form>
    );
};

export default ChatBox;
