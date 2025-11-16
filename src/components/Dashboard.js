import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { revenueData, mockUsers, products } from '../data/mockData';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeChart, setActiveChart] = useState('revenue');

  const stats = [
    { title: 'Total Users', value: mockUsers.length, change: '+12%', icon: '👥', type: 'primary', trend: 'up' },
    { title: 'Total Products', value: products.length, change: '+5%', icon: '📦', type: 'success', trend: 'up' },
    { title: 'Monthly Revenue', value: '$12,458', change: '+8%', icon: '💰', type: 'warning', trend: 'up' },
    { title: 'Active Sessions', value: '1,234', change: '-2%', icon: '🔗', type: 'danger', trend: 'down' },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: '📊', type: 'info', trend: 'up' },
    { title: 'Avg. Order Value', value: '$89.50', change: '+5.2%', icon: '🛒', type: 'secondary', trend: 'up' }
  ];

  // Enhanced chart data
  const enhancedRevenueData = [
    { month: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
    { month: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
    { month: 'Mar', revenue: 9800, profit: 2000, expenses: 7800 },
    { month: 'Apr', revenue: 3908, profit: 2780, expenses: 1128 },
    { month: 'May', revenue: 4800, profit: 1890, expenses: 2910 },
    { month: 'Jun', revenue: 3800, profit: 2390, expenses: 1410 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#4361ee' },
    { name: 'Furniture', value: 25, color: '#f72585' },
    { name: 'Home', value: 15, color: '#4cc9f0' },
    { name: 'Clothing', value: 10, color: '#7209b7' },
    { name: 'Books', value: 5, color: '#3a0ca3' }
  ];

  const performanceData = [
    { day: 'Mon', sales: 65, revenue: 1200 },
    { day: 'Tue', sales: 78, revenue: 1800 },
    { day: 'Wed', sales: 90, revenue: 2200 },
    { day: 'Thu', sales: 81, revenue: 1900 },
    { day: 'Fri', sales: 56, revenue: 1400 },
    { day: 'Sat', sales: 110, revenue: 2800 },
    { day: 'Sun', sales: 95, revenue: 2400 }
  ];

  // Real-time data simulation
  const [realTimeUsers, setRealTimeUsers] = useState(1234);
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#4361ee', '#f72585', '#4cc9f0', '#7209b7', '#3a0ca3'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '2px 0', 
              color: entry.color,
              fontSize: '12px'
            }}>
              {entry.name}: {entry.name.includes('$') ? '$' : ''}{entry.value}{entry.name.includes('$') ? '' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const exportDashboardData = () => {
    const data = {
      stats: stats,
      revenueData: enhancedRevenueData,
      products: products,
      users: mockUsers
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Dashboard data exported successfully!');
  };

  return (
    <div className="dashboard">
      {/* Header with Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0' }}>Dashboard Overview</h1>
          <p style={{ margin: 0, color: '#666' }}>Real-time analytics and performance metrics</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              background: 'white'
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button 
            className="btn btn-success"
            onClick={exportDashboardData}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ position: 'relative' }}>
            <div className={`stat-icon ${stat.type}`}>
              {stat.icon}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '12px',
                color: stat.trend === 'up' ? '#4caf50' : '#f44336'
              }}>
                {stat.trend === 'up' ? '↗' : '↘'}
              </div>
            </div>
            <div className="stat-info">
              <h3 style={{ 
                fontSize: '28px', 
                margin: '0 0 5px 0',
                background: stat.type === 'primary' ? 'linear-gradient(45deg, #4361ee, #3a0ca3)' :
                           stat.type === 'success' ? 'linear-gradient(45deg, #4caf50, #2e7d32)' :
                           stat.type === 'warning' ? 'linear-gradient(45deg, #ff9800, #f57c00)' :
                           stat.type === 'danger' ? 'linear-gradient(45deg, #f44336, #c62828)' :
                           stat.type === 'info' ? 'linear-gradient(45deg, #2196f3, #1565c0)' :
                           'linear-gradient(45deg, #9c27b0, #6a1b9a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {stat.title === 'Active Sessions' ? realTimeUsers : stat.value}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>{stat.title}</p>
              <small style={{ 
                color: stat.change.startsWith('+') ? '#4caf50' : '#f44336',
                fontWeight: '500'
              }}>
                {stat.change} from last month
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {['revenue', 'sales', 'performance', 'categories'].map(chart => (
          <button
            key={chart}
            onClick={() => setActiveChart(chart)}
            style={{
              padding: '8px 16px',
              border: `1px solid ${activeChart === chart ? '#4361ee' : '#ddd'}`,
              background: activeChart === chart ? '#4361ee' : 'white',
              color: activeChart === chart ? 'white' : '#333',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {chart.charAt(0).toUpperCase() + chart.slice(1)}
          </button>
        ))}
      </div>

      {/* Advanced Charts Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {/* Main Chart */}
        <div className="table-container" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>
              {activeChart === 'revenue' && 'Revenue Analytics'}
              {activeChart === 'sales' && 'Sales Performance'}
              {activeChart === 'performance' && 'Weekly Performance'}
              {activeChart === 'categories' && 'Product Categories'}
            </h3>
            <span style={{ color: '#666', fontSize: '14px' }}>{timeRange} view</span>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            {activeChart === 'revenue' && (
              <AreaChart data={enhancedRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#4361ee" fill="#4361ee" fillOpacity={0.3} />
                <Area type="monotone" dataKey="profit" stackId="1" stroke="#4cc9f0" fill="#4cc9f0" fillOpacity={0.3} />
              </AreaChart>
            )}
            {activeChart === 'sales' && (
              <BarChart data={products}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" fill="#f72585" />
                <Bar dataKey="stock" fill="#4cc9f0" />
              </BarChart>
            )}
            {activeChart === 'performance' && (
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#4361ee" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#f72585" strokeWidth={2} />
              </LineChart>
            )}
            {activeChart === 'categories' && (
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Side Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Stats */}
          <div className="table-container" style={{ padding: '20px', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 15px 0' }}>Quick Stats</h4>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4361ee' }}>
                  {mockUsers.filter(u => u.status === 'Active').length}/{mockUsers.length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f72585' }}>
                  ${products.reduce((sum, p) => sum + p.price * p.sales, 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Sales</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>
                  {Math.round(products.reduce((sum, p) => sum + p.sales, 0) / products.length)}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Avg. Sales/Product</div>
              </div>
            </div>
          </div>

          {/* Real-time Activity */}
          <div className="table-container" style={{ padding: '20px' }}>
            <h4 style={{ margin: '0 0 15px 0' }}>Real-time Activity</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Live Users:</span>
                <span style={{ fontWeight: 'bold', color: '#4361ee' }}>{realTimeUsers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Orders Today:</span>
                <span style={{ fontWeight: 'bold', color: '#f72585' }}>47</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>System Status:</span>
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>● Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Users */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent Users */}
        <div className="table-container">
          <div className="table-header">
            <h3>Recent Users</h3>
            <button className="btn btn-primary">View All</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.slice(0, 5).map(user => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#4361ee',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500' }}>{user.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      backgroundColor: user.status === 'Active' ? '#e8f5e8' : '#ffebee',
                      color: user.status === 'Active' ? '#4caf50' : '#f44336'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#666' }}>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Alerts */}
        <div className="table-container">
          <div className="table-header">
            <h3>System Alerts</h3>
            <span style={{ 
              padding: '4px 8px', 
              background: '#fff3cd', 
              color: '#856404',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              2 New
            </span>
          </div>
          <div style={{ padding: '15px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px',
              background: '#fff3cd',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <span>⚠️</span>
              <div>
                <div style={{ fontWeight: '500' }}>High server load</div>
                <div style={{ fontSize: '12px', color: '#666' }}>5 minutes ago</div>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px',
              background: '#d4edda',
              borderRadius: '8px'
            }}>
              <span>✅</span>
              <div>
                <div style={{ fontWeight: '500' }}>Backup completed</div>
                <div style={{ fontSize: '12px', color: '#666' }}>1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;