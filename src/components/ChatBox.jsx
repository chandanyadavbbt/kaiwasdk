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
            const response = await axios.post('http://localhost:8000/v1/chat/completions', {
                model: 'llama-7b', // Adjust according to your model ID
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatBox;
