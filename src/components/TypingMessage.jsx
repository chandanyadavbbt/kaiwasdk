import React, { useEffect, useState } from 'react';

const TypingMessage = ({ content }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 10; // Adjust typing speed (ms per character)

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedText((prev) => prev + content[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [content]);

  return <div>{displayedText}</div>;
};

export default TypingMessage;
