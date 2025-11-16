import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation - in real app, this would be API call
    if (credentials.email === 'admin@prou.com' && credentials.password === 'password') {
      onLogin({
        name: 'Siddarth R K',
        email: 'admin@prou.com',
        role: 'Admin'
      });
    } else {
      setError('Invalid credentials. Use: admin@prou.com / password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🚀 ProU Admin</h1>
          <p>Sign in to your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@prou.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;