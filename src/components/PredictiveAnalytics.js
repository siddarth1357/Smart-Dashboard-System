import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './PredictiveAnalytics.css';

const PredictiveAnalytics = () => {
  const [forecastData, setForecastData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('6months');

  // Generate predictive data
  useEffect(() => {
    generateForecastData();
    detectAnomalies();
  }, [selectedMetric, timeRange]);

  const generateForecastData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseValue = selectedMetric === 'revenue' ? 10000 : 
                     selectedMetric === 'users' ? 1000 : 
                     selectedMetric === 'sales' ? 500 : 200;
    
    const data = [];
    let currentValue = baseValue;
    
    // Historical data (6 months)
    for (let i = 0; i < 6; i++) {
      const growth = Math.random() * 0.15 + 0.05; // 5-20% growth
      currentValue = currentValue * (1 + growth);
      data.push({
        month: months[i],
        actual: Math.round(currentValue),
        predicted: null,
        type: 'historical'
      });
    }
    
    // Forecast data (6 months)
    const lastActual = data[data.length - 1].actual;
    let forecastValue = lastActual;
    
    for (let i = 6; i < 12; i++) {
      const growth = Math.random() * 0.12 + 0.04; // 4-16% growth forecast
      forecastValue = forecastValue * (1 + growth);
      const confidence = 1 - (i - 5) * 0.08; // Confidence decreases over time
      
      data.push({
        month: months[i],
        actual: null,
        predicted: Math.round(forecastValue),
        confidence: Math.round(confidence * 100),
        type: 'forecast'
      });
    }
    
    setForecastData(data);
  };

  const detectAnomalies = () => {
    const mockAnomalies = [
      {
        id: 1,
        type: 'spike',
        metric: 'Revenue',
        value: '+47%',
        date: '2024-03-15',
        severity: 'high',
        description: 'Unusual revenue spike detected',
        recommendation: 'Investigate marketing campaign performance'
      },
      {
        id: 2,
        type: 'drop',
        metric: 'User Engagement',
        value: '-23%',
        date: '2024-04-22',
        severity: 'medium',
        description: 'User session duration decreased significantly',
        recommendation: 'Check for technical issues or content quality'
      },
      {
        id: 3,
        type: 'trend',
        metric: 'Conversion Rate',
        value: '+15%',
        date: '2024-05-10',
        severity: 'low',
        description: 'Positive trend in mobile conversions',
        recommendation: 'Allocate more budget to mobile advertising'
      }
    ];
    
    setAnomalies(mockAnomalies);
  };

  const getMetricConfig = () => {
    const configs = {
      revenue: {
        name: 'Revenue',
        color: '#4361ee',
        unit: '$',
        gradient: ['#4361ee', '#3a0ca3']
      },
      users: {
        name: 'Users',
        color: '#f72585',
        unit: '',
        gradient: ['#f72585', '#b5179e']
      },
      sales: {
        name: 'Sales',
        color: '#4cc9f0',
        unit: '',
        gradient: ['#4cc9f0', '#4895ef']
      },
      conversion: {
        name: 'Conversion Rate',
        color: '#7209b7',
        unit: '%',
        gradient: ['#7209b7', '#560bad']
      }
    };
    
    return configs[selectedMetric];
  };

  const metricConfig = getMetricConfig();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="prediction-tooltip">
          <p className="tooltip-label">{label}</p>
          {data.actual && (
            <p className="tooltip-value" style={{ color: metricConfig.color }}>
              Actual: {metricConfig.unit}{data.actual.toLocaleString()}
            </p>
          )}
          {data.predicted && (
            <>
              <p className="tooltip-value" style={{ color: '#ff9f1c' }}>
                Predicted: {metricConfig.unit}{data.predicted.toLocaleString()}
              </p>
              <p className="tooltip-confidence">
                Confidence: {data.confidence}%
              </p>
            </>
          )}
          <p className="tooltip-type">
            {data.type === 'historical' ? 'Historical Data' : 'AI Forecast'}
          </p>
        </div>
      );
    }
    return null;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: '#e63946',
      medium: '#ff9f1c',
      low: '#2a9d8f'
    };
    return colors[severity];
  };

  const getAnomalyIcon = (type) => {
    const icons = {
      spike: '📈',
      drop: '📉',
      trend: '🎯',
      pattern: '🔍'
    };
    return icons[type] || '⚠️';
  };

  return (
    <div className="predictive-analytics">
      <div className="analytics-header">
        <div className="header-left">
          <h2>🤖 Predictive Analytics</h2>
          <p>AI-powered forecasts and anomaly detection</p>
        </div>
        <div className="header-controls">
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="metric-select"
          >
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="sales">Sales</option>
            <option value="conversion">Conversion Rate</option>
          </select>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Forecast Chart */}
        <div className="forecast-card">
          <div className="card-header">
            <h3>📈 {metricConfig.name} Forecast</h3>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color historical"></div>
                <span>Historical</span>
              </div>
              <div className="legend-item">
                <div className="legend-color forecast"></div>
                <span>AI Prediction</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              {/* Historical Data */}
              <Area
                type="monotone"
                dataKey="actual"
                stroke={metricConfig.color}
                fill={metricConfig.color}
                fillOpacity={0.3}
                strokeWidth={3}
              />
              {/* Forecast Data */}
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#ff9f1c"
                fill="#ff9f1c"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="forecast-insights">
            <div className="insight-item">
              <span className="insight-label">Next Month Prediction:</span>
              <span className="insight-value">
                {metricConfig.unit}
                {forecastData.find(d => d.type === 'forecast')?.predicted?.toLocaleString()}
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Growth Trend:</span>
              <span className="insight-value positive">+12.4% ↗</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Confidence Level:</span>
              <span className="insight-value">87%</span>
            </div>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="anomalies-card">
          <div className="card-header">
            <h3>🚨 Anomaly Detection</h3>
            <span className="anomaly-count">{anomalies.length} detected</span>
          </div>
          <div className="anomalies-list">
            {anomalies.map(anomaly => (
              <div key={anomaly.id} className="anomaly-item">
                <div className="anomaly-icon">
                  {getAnomalyIcon(anomaly.type)}
                </div>
                <div className="anomaly-content">
                  <div className="anomaly-header">
                    <span className="anomaly-metric">{anomaly.metric}</span>
                    <span 
                      className="anomaly-value"
                      style={{ color: getSeverityColor(anomaly.severity) }}
                    >
                      {anomaly.value}
                    </span>
                  </div>
                  <p className="anomaly-description">{anomaly.description}</p>
                  <div className="anomaly-footer">
                    <span className="anomaly-date">{anomaly.date}</span>
                    <span 
                      className="severity-badge"
                      style={{ 
                        background: getSeverityColor(anomaly.severity),
                        color: 'white'
                      }}
                    >
                      {anomaly.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="anomaly-actions">
            <button className="btn-secondary">View All Reports</button>
            <button className="btn-primary">Generate Insights</button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metrics-card">
          <h3>📊 Prediction Accuracy</h3>
          <div className="accuracy-metrics">
            <div className="accuracy-item">
              <div className="accuracy-value">94.2%</div>
              <div className="accuracy-label">Revenue Forecast</div>
              <div className="accuracy-trend positive">+2.1%</div>
            </div>
            <div className="accuracy-item">
              <div className="accuracy-value">88.7%</div>
              <div className="accuracy-label">User Growth</div>
              <div className="accuracy-trend positive">+1.3%</div>
            </div>
            <div className="accuracy-item">
              <div className="accuracy-value">91.5%</div>
              <div className="accuracy-label">Sales Prediction</div>
              <div className="accuracy-trend negative">-0.8%</div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="recommendations-card">
          <h3>💡 AI Recommendations</h3>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <div className="rec-icon">🎯</div>
              <div className="rec-content">
                <strong>Optimize Mobile Experience</strong>
                <p>Mobile conversion rate is 23% lower than desktop. Consider improving mobile UI/UX.</p>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="rec-icon">📈</div>
              <div className="rec-content">
                <strong>Scale European Marketing</strong>
                <p>European market shows 45% growth potential. Increase ad spend by 15%.</p>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="rec-icon">🔄</div>
              <div className="rec-content">
                <strong>Reduce Churn Risk</strong>
                <p>12% of users show churn signals. Implement retention campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;