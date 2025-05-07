import React from "react";

function ChatMessage({ message }) {
  const renderMessageWithLinks = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`chat-message ${
        message.role === "bot"
          ? "bot self-start bg-white text-black border-gray-200"
          : "user self-end bg-black text-white border-black"
      } border p-2 md:p-3 rounded-xl max-w-[85%] text-xs md:text-sm shadow-sm`}
    >
      <div>{renderMessageWithLinks(message.content)}</div>
      <div className="timestamp text-[10px] md:text-xs text-gray-400 mt-1 text-right">
        {message.timestamp}
      </div>
    </div>  
  );
}

export default ChatMessage;