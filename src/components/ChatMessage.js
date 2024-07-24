import React, { useState } from 'react';
import GraphData from './GraphData';
import TypingMessage from './TypingMessage';

const ChatMessage = ({ message }) => {
    const [graph, setGraph] = useState(false);
    const [graphMessage, setGraphMessage] = useState(null);

    let mainMessage = message.content.split('JSONdata')[0].trim();
    let suggestions = "";

    // Check if mainMessage contains "Suggestions:"
    if (mainMessage.includes("Suggestions:")) {
        const parts = mainMessage.split("Suggestions:");
        if (parts.length > 1) {
            mainMessage = parts[0].trim(); // Update mainMessage to exclude Suggestions
            suggestions = parts[1].trim();
        }
    }

    // Function to handle graph display
    function handleGraph() {
        setGraph(true);
        setGraphMessage(message.content);
    }

    return (
        <div className={`chat-message ${message.role}`}>
            <p>
                {message.role === 'assistant' ? (
                    <TypingMessage content={mainMessage} />
                ) : (
                    mainMessage
                )}
                {message.role === 'assistant' && mainMessage.length > 3 && (
                    <div onClick={handleGraph} className="icon-container">
                        {suggestions && <br />}
                        {/* {suggestions && (
                            <span>
                                Suggestions: <br />
                                {suggestions.split('?').map((item, index) => (
                                    <span key={index}>
                                        {item.trim()}
                                        {index !== suggestions.split('?').length - 1 && '?'}
                                        <br />
                                        <br/>
                                    </span>
                                ))}
                            </span>
                        )} */}
                        {graph && <GraphData messageContent={graphMessage} />}
                        {
                            !mainMessage.length ? null:
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                        }
                    </div>
                )}
            </p>
        </div>
    );
};

export default ChatMessage;
