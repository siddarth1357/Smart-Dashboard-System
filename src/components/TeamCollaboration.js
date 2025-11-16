import React, { useState, useEffect } from 'react';
import './TeamCollaboration.css';

const TeamCollaboration = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [teamActivity, setTeamActivity] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [teamMessages, setTeamMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Simulate online users
  useEffect(() => {
    const mockOnlineUsers = [
      {
        id: 1,
        name: 'You',
        role: 'Admin',
        status: 'online',
        avatar: '👤',
        lastActive: 'Now',
        currentTask: 'Reviewing analytics'
      },
      {
        id: 2,
        name: 'Sarah Chen',
        role: 'Manager',
        status: 'online',
        avatar: '👩‍💼',
        lastActive: '2 min ago',
        currentTask: 'Updating products'
      },
      {
        id: 3,
        name: 'Mike Rodriguez',
        role: 'Developer',
        status: 'away',
        avatar: '👨‍💻',
        lastActive: '15 min ago',
        currentTask: 'Fixing bugs'
      },
      {
        id: 4,
        name: 'Emily Davis',
        role: 'Designer',
        status: 'online',
        avatar: '👩‍🎨',
        lastActive: '5 min ago',
        currentTask: 'UI improvements'
      }
    ];
    setOnlineUsers(mockOnlineUsers);
  }, []);

  // Simulate team activity
  useEffect(() => {
    const mockActivity = [
      {
        id: 1,
        user: 'Sarah Chen',
        action: 'added new product',
        target: 'Wireless Keyboard',
        time: '2 minutes ago',
        icon: '📦'
      },
      {
        id: 2,
        user: 'Mike Rodriguez',
        action: 'completed task',
        target: 'Dashboard optimization',
        time: '15 minutes ago',
        icon: '✅'
      },
      {
        id: 3,
        user: 'Emily Davis',
        action: 'commented on',
        target: 'User profile design',
        time: '1 hour ago',
        icon: '💬'
      },
      {
        id: 4,
        user: 'You',
        action: 'exported report',
        target: 'Monthly analytics',
        time: '2 hours ago',
        icon: '📊'
      }
    ];
    setTeamActivity(mockActivity);
  }, []);

  // Simulate active tasks
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Update product inventory',
        assignee: 'Sarah Chen',
        priority: 'high',
        progress: 75,
        dueDate: 'Today',
        comments: 3
      },
      {
        id: 2,
        title: 'Fix mobile responsive issues',
        assignee: 'Mike Rodriguez',
        priority: 'medium',
        progress: 40,
        dueDate: 'Tomorrow',
        comments: 1
      },
      {
        id: 3,
        title: 'Design new dashboard widgets',
        assignee: 'Emily Davis',
        priority: 'low',
        progress: 20,
        dueDate: 'In 3 days',
        comments: 5
      }
    ];
    setActiveTasks(mockTasks);
  }, []);

  // Simulate team chat
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        user: 'Sarah Chen',
        message: 'Just updated the product catalog. Can someone review?',
        time: '10:30 AM',
        avatar: '👩‍💼'
      },
      {
        id: 2,
        user: 'Mike Rodriguez',
        message: 'Working on the dashboard performance issues. Almost done!',
        time: '10:25 AM',
        avatar: '👨‍💻'
      },
      {
        id: 3,
        user: 'Emily Davis',
        message: 'New design mockups are ready for feedback in Figma',
        time: '9:45 AM',
        avatar: '👩‍🎨'
      }
    ];
    setTeamMessages(mockMessages);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      time: 'Just now',
      avatar: '👤'
    };

    setTeamMessages(prev => [message, ...prev]);
    setNewMessage('');
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#e63946',
      medium: '#ff9f1c',
      low: '#2a9d8f'
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      online: '#4caf50',
      away: '#ff9800',
      offline: '#666'
    };
    return colors[status];
  };

  return (
    <div className="team-collaboration">
      <div className="collaboration-header">
        <div className="header-left">
          <h2>👥 Team Collaboration</h2>
          <p>Real-time teamwork and communication</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{onlineUsers.filter(u => u.status === 'online').length}</span>
            <span className="stat-label">Online</span>
          </div>
          <div className="stat">
            <span className="stat-number">{activeTasks.length}</span>
            <span className="stat-label">Active Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-number">{teamActivity.length}</span>
            <span className="stat-label">Activities</span>
          </div>
        </div>
      </div>

      <div className="collaboration-grid">
        {/* Online Team Members */}
        <div className="team-card">
          <div className="card-header">
            <h3>🟢 Online Team</h3>
            <span className="online-count">{onlineUsers.filter(u => u.status === 'online').length} online</span>
          </div>
          <div className="team-members">
            {onlineUsers.map(user => (
              <div key={user.id} className="team-member">
                <div className="member-avatar">
                  <span className="avatar">{user.avatar}</span>
                  <div 
                    className="status-indicator"
                    style={{ background: getStatusColor(user.status) }}
                  ></div>
                </div>
                <div className="member-info">
                  <div className="member-name">
                    {user.name}
                    {user.name === 'You' && <span className="you-badge">You</span>}
                  </div>
                  <div className="member-role">{user.role}</div>
                  <div className="member-task">{user.currentTask}</div>
                </div>
                <div className="member-status">
                  <span className="last-active">{user.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="activity-card">
          <div className="card-header">
            <h3>📝 Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {teamActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-text">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-target">{activity.target}</span>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks */}
        <div className="tasks-card">
          <div className="card-header">
            <h3>✅ Active Tasks</h3>
            <button className="add-task-btn">+ Add Task</button>
          </div>
          <div className="tasks-list">
            {activeTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-header">
                  <h4 className="task-title">{task.title}</h4>
                  <span 
                    className="priority-badge"
                    style={{ background: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{task.progress}%</span>
                </div>
                <div className="task-footer">
                  <div className="task-assignee">
                    <span className="assignee-avatar">👤</span>
                    <span>{task.assignee}</span>
                  </div>
                  <div className="task-meta">
                    <span className="due-date">📅 {task.dueDate}</span>
                    <span className="comment-count">💬 {task.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Chat */}
        <div className="chat-card">
          <div className="card-header">
            <h3>💬 Team Chat</h3>
            <div className="chat-indicators">
              <span className="typing-indicator">Mike is typing...</span>
              <span className="unread-count">3 new</span>
            </div>
          </div>
          <div className="chat-messages">
            {teamMessages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.user === 'You' ? 'own-message' : 'other-message'}`}
              >
                <div className="message-avatar">{message.avatar}</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">{message.user}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <div className="message-text">{message.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message to your team..."
              className="chat-input"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="send-button"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;