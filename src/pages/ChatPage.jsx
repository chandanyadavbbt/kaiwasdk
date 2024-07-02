import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    const response = await fetch('http://localhost:8000/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-7b',
        messages: [{ role: 'user', content: message }],
        max_tokens: 100,
        temperature: 0.7,
        stream: false,
      }),
    });
    const data = await response.json();
    setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: data.choices[0].message.content }]);
  };

  return (
    <div className="chat-page">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
