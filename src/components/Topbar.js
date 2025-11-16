import React, { useState } from 'react';

const Topbar = ({ user, notifications, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="topbar">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          style={{
            padding: '8px 15px',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            width: '300px'
          }}
        />
      </div>
      
      <div className="topbar-actions">
        {/* Notifications */}
        <div className="notifications-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span>🔔</span>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h4>Notifications</h4>
                <span className="notification-count">{unreadCount} unread</span>
              </div>
              <div className="notifications-list">
                {notifications.slice(0, 5).map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                    <div className="notification-icon">{notification.icon}</div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="user-menu-container">
          <div 
            className="user-info"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ cursor: 'pointer' }}
          >
            <div className="user-avatar">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span>{user.name}</span>
          </div>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-item">
                <span>👤</span> Profile
              </div>
              <div className="user-dropdown-item">
                <span>⚙️</span> Settings
              </div>
              <div className="user-dropdown-divider"></div>
              <div className="user-dropdown-item" onClick={onLogout}>
                <span>🚪</span> Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .notifications-container {
          position: relative;
        }
        
        .notification-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          position: relative;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        
        .notification-btn:hover {
          background: var(--light-gray);
        }
        
        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #e63946;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .notifications-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 350px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          z-index: 1000;
        }
        
        .notifications-header {
          padding: 15px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .notification-count {
          background: #4361ee;
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
        }
        
        .notifications-list {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .notification-item {
          padding: 12px 15px;
          border-bottom: 1px solid var(--border);
          display: flex;
          gap: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .notification-item:hover {
          background: var(--light-gray);
        }
        
        .notification-item.unread {
          background: #f0f7ff;
        }
        
        .notification-icon {
          font-size: 16px;
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-message {
          margin: 0;
          font-size: 14px;
        }
        
        .notification-time {
          font-size: 12px;
          color: var(--gray);
        }
        
        .notifications-footer {
          padding: 10px;
          text-align: center;
        }
        
        .view-all-btn {
          background: none;
          border: none;
          color: #4361ee;
          cursor: pointer;
          font-size: 14px;
        }
        
        .user-menu-container {
          position: relative;
        }
        
        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #4361ee;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 200px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          z-index: 1000;
        }
        
        .user-dropdown-item {
          padding: 12px 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s;
        }
        
        .user-dropdown-item:hover {
          background: var(--light-gray);
        }
        
        .user-dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default Topbar;