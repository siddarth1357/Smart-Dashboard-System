import React, { useState, useRef, useEffect } from 'react';
import './AIChatBot.css';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Assistant. I can help you analyze data, navigate the dashboard, and answer questions about your business metrics. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Simulation
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Data analysis queries
    if (message.includes('revenue') || message.includes('sales')) {
      return "Based on current data, your revenue is trending upward with a 12% increase this month. The highest performing product is Laptop Pro with $1299 average order value. Would you like me to generate a detailed revenue report?";
    }
    
    if (message.includes('user') || message.includes('customer')) {
      return "You currently have 1,234 active users with a 3.2% monthly growth rate. User engagement is highest on mobile devices (68%). The churn rate has decreased by 0.8% this quarter.";
    }
    
    if (message.includes('product') || message.includes('inventory')) {
      return "Your product catalog shows 45 items in stock. The Wireless Mouse is your bestseller with 150 units sold this month. Desk Lamp inventory is running low (25 units left) - consider restocking soon.";
    }
    
    if (message.includes('dashboard') || message.includes('overview')) {
      return "Your dashboard shows strong performance: Revenue is up 8%, user growth is steady, and system health is optimal. The real-time metrics indicate peak activity between 2-4 PM daily.";
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
      return "I can help you with: 📊 Data analysis and insights 👥 User metrics and trends 📦 Product performance 🚀 Business recommendations 💡 Navigation assistance. Just ask me anything!";
    }
    
    if (message.includes('trend') || message.includes('analytics')) {
      return "Current trends show: Mobile traffic increased by 23%, European market shows 45% growth potential, Customer satisfaction scores improved by 8% this quarter. Would you like specific recommendations?";
    }
    
    if (message.includes('report') || message.includes('export')) {
      return "I can help you generate: 📈 Weekly performance reports 📊 Custom analytics exports 🎯 Competitor analysis 📋 Executive summaries. Which type of report would you like?";
    }
    
    // Default responses
    const defaultResponses = [
      "I understand you're asking about: " + userMessage + ". Let me analyze that data for you... Based on our metrics, I recommend focusing on user engagement and mobile optimization for better results.",
      "That's an interesting question! Looking at your business data, I see opportunities for growth in the European market and potential for 15% revenue increase with proper targeting.",
      "Great question! Analyzing your current performance, I suggest A/B testing your landing pages and implementing personalized recommendations to boost conversion rates by 8-12%.",
      "Based on your data patterns, I recommend: 1) Optimizing mobile experience 2) Implementing referral program 3) Personalizing user journeys. This could increase retention by 20%."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    "Show revenue insights",
    "User growth trends",
    "Product performance",
    "System recommendations"
  ];

  return (
    <>
      {/* Chat Bot Floating Button */}
      {!isOpen && (
        <button 
          className="ai-chat-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="pulse-dot"></span>
          🤖 AI
        </button>
      )}

      {/* Chat Bot Modal */}
      {isOpen && (
        <div className="ai-chat-modal">
          <div className="ai-chat-header">
            <div className="ai-bot-info">
              <div className="ai-avatar">🤖</div>
              <div>
                <h3>AI Business Assistant</h3>
                <span className="status online">● Online</span>
              </div>
            </div>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => {
                  setInputText(action);
                  setTimeout(handleSendMessage, 100);
                }}
              >
                {action}
              </button>
            ))}
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your data, trends, or business insights..."
              className="chat-input"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="send-button"
            >
              📤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;