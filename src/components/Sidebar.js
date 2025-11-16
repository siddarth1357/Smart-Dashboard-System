import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🚀 ProU Admin</h2>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={activePage === item.id ? 'active' : ''}
            onClick={() => setActivePage(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;