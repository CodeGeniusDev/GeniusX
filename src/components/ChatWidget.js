import React, { useState } from 'react';
import ChatBox from './ChatBox';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget fixed bottom-6 right-6 z-50 sm:right-5">
      <button className="chat-toggle w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:bg-black transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-comment text-lg"></i>
      </button>
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default ChatWidget;