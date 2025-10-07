import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './MessageList.css';

function MessageList({ messages = [], isTyping }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="message-list-container">
      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          className={`message-wrapper ${msg.sender}`}
        >
          {msg.sender === 'bot' && (
            <div className="message-avatar">
              <img src="/logo.png" alt="DreamFlow AI" />
            </div>
          )}

          <div className="message-bubble">
            {msg.sender === 'bot' ? (
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
                    h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
                    h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
                    p: ({ children }) => <p className="md-p">{children}</p>,
                    ul: ({ children }) => <ul className="md-ul">{children}</ul>,
                    ol: ({ children }) => <ol className="md-ol">{children}</ol>,
                    li: ({ children }) => <li className="md-li">{children}</li>,
                    strong: ({ children }) => <strong className="md-strong">{children}</strong>,
                    code: ({ children }) => <code className="md-code">{children}</code>,
                    blockquote: ({ children }) => <blockquote className="md-quote">{children}</blockquote>,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-content">{msg.text}</div>
            )}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="message-wrapper bot typing">
          <div className="message-avatar">
            <img src="/logo.png" alt="bot" />
          </div>
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

export default MessageList;
