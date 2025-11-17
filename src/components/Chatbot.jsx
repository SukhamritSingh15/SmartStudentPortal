///////////////////////////////////////////////////////////////////////
// START src/components/Chatbot.jsx
///////////////////////////////////////////////////////////////////////
import React, { useState, useRef, useEffect } from 'react';

// --- Configuration ---
// Your API Key
const API_KEY = 'AIzaSyCAHIPUxDoaO18QfSrH-sAWMjzo6fGQXhU';

// Your required API URL including key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const Chatbot = ({ handleClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatHistoryRef = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([
      { text: "Hello! I'm your AI study assistant. How can I help you with your portal questions today?", user: false }
    ]);

    chatHistoryRef.current.push({
      role: "system",
      parts: [{
        text: "You are a helpful and friendly AI assistant for a Smart Student Portal. Keep answers short and relevant."
      }]
    });
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText || loading) return;

    const userMessage = { text: userMessageText, user: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    chatHistoryRef.current.push({ role: "user", parts: [{ text: userMessageText }] });

    const payload = {
      contents: chatHistoryRef.current.filter(msg => msg.role !== 'system')
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const result = await response.json();
      const candidate = result.candidates?.[0];

      let fullResponse = "I couldn't understand that. Please try again.";

      if (candidate?.content?.parts?.[0]?.text) {
        fullResponse = candidate.content.parts[0].text;
      }

      const botMessage = { text: fullResponse, user: false };
      setMessages(prev => [...prev, botMessage]);

      chatHistoryRef.current.push({
        role: "model",
        parts: [{ text: fullResponse }]
      });

    } catch (err) {
      console.error(err);
      setError("AI Assistant Error: Check console for details.");
      chatHistoryRef.current.pop();
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3><i className="fas fa-robot"></i> AI Study Assistant</h3>
        <button className="chatbot-close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? "user-message" : "bot-message"}`}>
            {message.user ? <i className="fas fa-user"></i> : <i className="fas fa-robot"></i>}
            <p>{message.text}</p>
          </div>
        ))}

        {loading && (
          <div className="bot-message loading-indicator">
            <i className="fas fa-robot"></i>
            <p>Assistant is typing...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about attendance, CGPA, performance..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          <i className="fas fa-paper-plane"></i> Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
///////////////////////////////////////////////////////////////////////
// END src/components/Chatbot.jsx
///////////////////////////////////////////////////////////////////////
