import React, { useState } from 'react';

const Settings = ({ darkMode, setDarkMode }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    language: 'english',
    timezone: 'UTC-5'
  });

  const [profile, setProfile] = useState({
    name: 'Siddarth R K',
    email: 'siddarth.rk@email.com',
    phone: '+1 (555) 123-4567',
    department: 'Frontend Development'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    // In real app, you would make API call here
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    // In real app, you would make API call here
  };

  return (
    <div className="settings">
      <h1 style={{ marginBottom: '30px' }}>Settings</h1>

      <div style={{ display: 'grid', gap: '30px' }}>
        {/* Profile Settings */}
        <div className="table-container" style={{ padding: '25px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Profile Settings</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => handleProfileChange('department', e.target.value)}
              />
            </div>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={handleSaveProfile}
            style={{ marginTop: '20px' }}
          >
            Update Profile
          </button>
        </div>

        {/* Application Settings */}
        <div className="table-container" style={{ padding: '25px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Application Settings</h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4>Dark Mode</h4>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Switch between light and dark themes</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4>Email Notifications</h4>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Receive email alerts and updates</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4>SMS Notifications</h4>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Receive text message alerts</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4>Auto Backup</h4>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Automatically backup data daily</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option value="UTC-5">EST (UTC-5)</option>
                <option value="UTC-8">PST (UTC-8)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+5:30">IST (UTC+5:30)</option>
              </select>
            </div>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={handleSaveSettings}
            style={{ marginTop: '20px' }}
          >
            Save Settings
          </button>
        </div>

        {/* Danger Zone */}
        <div className="table-container" style={{ padding: '25px', border: '2px solid #f44336' }}>
          <h2 style={{ marginBottom: '20px', color: '#f44336' }}>Danger Zone</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4>Delete Account</h4>
              <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Permanently delete your account and all data</p>
            </div>
            <button className="btn btn-danger">Delete Account</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: var(--primary);
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default Settings;