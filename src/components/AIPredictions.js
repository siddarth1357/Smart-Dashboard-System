import React, { useState } from 'react';

const AIPredictions = () => {
  const [predictions, setPredictions] = useState([
    { metric: 'User Growth', current: '1,234', predicted: '1,567', confidence: '92%', trend: 'up' },
    { metric: 'Revenue', current: '$12.4K', predicted: '$15.8K', confidence: '88%', trend: 'up' },
    { metric: 'Churn Rate', current: '3.2%', predicted: '2.1%', confidence: '85%', trend: 'down' },
    { metric: 'Conversion', current: '4.5%', predicted: '5.8%', confidence: '79%', trend: 'up' }
  ]);

  const [aiInsights, setAiInsights] = useState([
    "📈 User engagement increased by 23% this week",
    "🎯 High conversion rates from mobile users",
    "⚠️ Churn risk detected for inactive users >30 days",
    "💡 Recommend: Target European market expansion"
  ]);

  return (
    <div className="ai-predictions">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>🤖 AI Predictions & Insights</h3>
        <span style={{
          padding: '4px 8px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          LIVE
        </span>
      </div>

      {/* AI Predictions Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '25px'
      }}>
        {predictions.map((pred, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${pred.trend === 'up' ? '#4caf50' : '#f44336'}`
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {pred.metric}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  {pred.current}
                </div>
                <div style={{ fontSize: '14px', color: pred.trend === 'up' ? '#4caf50' : '#f44336' }}>
                  → {pred.predicted}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                background: pred.confidence > '85%' ? '#e8f5e8' : '#fff3e0',
                color: pred.confidence > '85%' ? '#4caf50' : '#ff9800',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                {pred.confidence}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        borderRadius: '12px',
        color: 'white'
      }}>
        <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧠 AI Insights
        </h4>
        <div style={{ display: 'grid', gap: '10px' }}>
          {aiInsights.map((insight, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;