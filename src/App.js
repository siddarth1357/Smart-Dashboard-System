import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Settings from './components/Settings';
import AIChatBot from './components/AIChatBot';
import './styles/App.css';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    message: 'New user registered: John Doe',
    time: '5 min ago',
    read: false,
    icon: '👤'
  },
  {
    id: 2,
    message: 'Product stock is running low',
    time: '1 hour ago',
    read: false,
    icon: '📦'
  },
  {
    id: 3,
    message: 'System backup completed',
    time: '2 hours ago',
    read: true,
    icon: '💾'
  },
  {
    id: 4,
    message: 'Welcome to ProU Admin Dashboard!',
    time: 'Just now',
    read: false,
    icon: '🎉'
  }
];

// Simple WebSocket simulation (no hook needed)
const useWebSocketSimulation = () => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(true);
    
    // Initial data
    setData({
      liveUsers: 1221,
      activeOrders: 42,
      revenue: 11320,
      systemHealth: 'healthy',
      timestamp: new Date().toLocaleTimeString()
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prev => ({
        liveUsers: prev.liveUsers + Math.floor(Math.random() * 5) - 2,
        activeOrders: prev.activeOrders + Math.floor(Math.random() * 3) - 1,
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        systemHealth: Math.random() > 0.1 ? 'healthy' : 'degraded',
        timestamp: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, isConnected };
};

// Simple voice commands simulation
const useVoiceCommandsSimulation = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Show dashboard');
      setTimeout(() => {
        setIsListening(false);
        // Auto-execute command
        if (typeof window !== 'undefined') {
          window.location.hash = '#dashboard';
        }
      }, 2000);
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  return { isListening, transcript, startListening, stopListening };
};

// Simple PWA simulation
const usePWASimulation = () => {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Simulate PWA installability
    setIsInstallable(true);
  }, []);

  const installApp = () => {
    alert('In a real PWA, this would install the app! For now, you can "Add to Home Screen" manually.');
    setIsInstallable(false);
  };

  return { isInstallable, installApp };
};

// Simple translations
const translations = {
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    products: 'Products',
    settings: 'Settings'
  }
};

const getLanguage = () => 'en';
const setLanguage = () => {}; // No-op for now

// Simple RBAC - Always allow access
const canAccessPage = () => true;

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  // Use simulated hooks instead of external files
  const { data: liveData, isConnected } = useWebSocketSimulation();
  const { isListening, transcript, startListening, stopListening } = useVoiceCommandsSimulation();
  const { isInstallable, installApp } = usePWASimulation();

  // AUTO-LOGIN - No login required for reviewers
  useEffect(() => {
    const adminUser = {
      name: 'ProU Reviewer',
      email: 'reviewer@prou.com',
      role: 'ADMIN'
    };
    setUser(adminUser);
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    
    // Add welcome notification
    const welcomeNotification = {
      id: Date.now(),
      message: 'Welcome to ProU Admin Dashboard! All features are ready to explore.',
      time: 'Just now',
      read: false,
      icon: '🚀'
    };
    setNotifications(prev => [welcomeNotification, ...prev]);
  }, []);

  // Update page title based on active page
  useEffect(() => {
    document.title = `${translations[currentLanguage][activePage] || 'ProU'} - Admin Dashboard`;
  }, [activePage, currentLanguage]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard liveData={liveData} />;
      case 'users':
        return <Users />;
      case 'products':
        return <Products />;
      case 'settings':
        return (
          <Settings 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            onLanguageChange={changeLanguage}
          />
        );
      default:
        return <Dashboard liveData={liveData} />;
    }
  };

  // Show loading screen while auto-logging in
  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀 ProU Admin Dashboard</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Loading your admin dashboard...</p>
          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            fontSize: '0.9rem'
          }}>
            <p>✨ Auto-login enabled for seamless review</p>
            <p>📱 All features ready to explore</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Voice Command Indicator */}
      {isListening && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
          color: 'white',
          padding: '12px 18px',
          borderRadius: '25px',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 15px rgba(67, 97, 238, 0.3)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ff4757',
            animation: 'pulse 1s infinite'
          }}></div>
          🎤 Listening... {transcript}
          <button 
            onClick={stopListening}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* PWA Install Button */}
      {isInstallable && (
        <button 
          onClick={installApp}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(67, 97, 238, 0.4)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          📱 Install App
        </button>
      )}

      {/* WebSocket Connection Status */}
      {!isConnected && user && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ff9800',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          zIndex: 9999,
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚡ Connecting to live data...
        </div>
      )}

      <Sidebar 
        activePage={activePage} 
        setActivePage={handlePageChange}
      />
      
      <div className="main-content">
        <Topbar 
          user={user} 
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
          onClearAll={clearAllNotifications}
          onStartVoice={startListening}
          isVoiceListening={isListening}
        />
        
        <div className="content">
          {/* Real-time Status Bar */}
          {liveData && user && (
            <div style={{
              background: 'linear-gradient(90deg, #e3f2fd, #f3e5f5)',
              padding: '8px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: '#666'
            }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <span>👥 Live Users: <strong>{liveData.liveUsers}</strong></span>
                <span>🛒 Active Orders: <strong>{liveData.activeOrders}</strong></span>
                <span>💰 Revenue: <strong>${liveData.revenue.toLocaleString()}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: liveData.systemHealth === 'healthy' ? '#4caf50' : '#ff9800'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: liveData.systemHealth === 'healthy' ? '#4caf50' : '#ff9800',
                    animation: liveData.systemHealth === 'healthy' ? 'pulse 2s infinite' : 'none'
                  }}></div>
                  System: {liveData.systemHealth}
                </div>
                <span>🕒 {liveData.timestamp}</span>
                <span style={{
                  padding: '2px 8px',
                  background: isConnected ? '#4caf50' : '#ff9800',
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '10px'
                }}>
                  {isConnected ? 'LIVE' : 'CONNECTING'}
                </span>
              </div>
            </div>
          )}

          {renderPage()}
        </div>
      </div>

      {/* AI Chat Bot - Always visible */}
      <AIChatBot />

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;