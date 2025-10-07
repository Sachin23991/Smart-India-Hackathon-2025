// src/components/MessageInput.jsx

import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.css';
import { MdSend } from 'react-icons/md';

function MessageInput({ onSendMessage, disabled, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled && !isLoading) {
      onSendMessage(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="message-input-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your career goals..."
        disabled={disabled || isLoading}
        rows="1"
      />
      <button
        type="submit"
        className={`send-button ${isLoading ? 'loading' : ''}`}
        disabled={!value.trim() || disabled || isLoading}
      >
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <MdSend />
        )}
      </button>
    </form>
  );
}

export default MessageInput;
