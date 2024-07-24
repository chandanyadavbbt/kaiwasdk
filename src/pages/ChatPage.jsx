// import React, { useState } from 'react';
// import ChatBox from '../components/ChatBox';

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = async (message) => {
//     // const response = await fetch('http://ec2-54-206-173-68.ap-southeast-2.compute.amazonaws.com:8000/v1/chat/completions', 
//     const response = await fetch('http://localhost:8001/v1/chat/completions', 
//     // const response = await fetch('https://0b02-54-206-173-68.ngrok-free.app/v1/chat/completions', 
//       {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'llama-7b',
//         messages: [{ role: 'user', content: message }],
//         max_tokens: 100,
//         temperature: 0.7,
//         stream: false,
//       }),
//     });
//     const data = await response.json();
//     console.log(data)
//     setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: data.choices[0].message.content}]);
//   };

//   return (
//     <div className="chat-page">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={x} className={`message ${msg.role}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <ChatBox onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatPage;

import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';

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
        messages: [{ role: 'user', content: "hi" }],
        max_tokens: 100,
        temperature: 0.7,
        stream: false,
      }),
    });
    const data = await response.json();
    console.log(data,"this is data")
    setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: data.choices[0].message.content}]);
  };
  console.log(message,"from chatpage")

  return (
    <div className="chat-page">
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;


