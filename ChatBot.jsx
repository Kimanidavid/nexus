// components/ChatBot.jsx
import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    
    const response = await axios.post('/api/chat', { question: input });
    setMessages([...newMessages, { text: response.data.answer, isBot: true }]);
    setInput('');
  };

  return (
    <div className="chat-container bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="chat-messages h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg p-2 text-black"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};