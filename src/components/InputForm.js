import React, { useState, useEffect, useRef } from 'react';

function InputForm({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [input]);

  return (
    <div className="input-form flex justify-center items-center p-3 border-t border-black bg-white">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        disabled={disabled}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
        className="flex-1 p-2 border border-black rounded-lg text-sm focus:outline-none focus:border-primary resize-none min-h-[40px] max-h-[100px] disabled:bg-gray-200 disabled:text-gray-500"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="ml-2 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-black transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed animate-bounce"
      >
        <i className="fas fa-paper-plane text-lg"></i>
      </button>
    </div>
  );
}

export default InputForm;