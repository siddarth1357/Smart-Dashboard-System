import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
    status: 'Active'
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      ...newUser,
      id: users.length + 1,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', role: 'User', status: 'Active' });
    
    // Show success notification
    alert('User added successfully!');
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully!');
    }
  };

  // CSV Export Function
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date', 'Last Login'];
    const csvData = [
      headers.join(','),
      ...filteredUsers.map(user => 
        `"${user.name}","${user.email}","${user.phone}","${user.role}","${user.status}","${user.joinDate}","${user.lastLogin}"`
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`Exported ${filteredUsers.length} users to CSV successfully!`);
  };

  // PDF Export Function (Simple version)
  const exportToPDF = () => {
    alert('PDF export would be implemented with a library like jsPDF in a real application!');
    // In real app: import jsPDF and generate PDF
  };

  return (
    <div className="users">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>User Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-success"
            onClick={exportToCSV}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            📥 Export CSV
          </button>
          <button 
            className="btn btn-warning"
            onClick={exportToPDF}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            📄 Export PDF
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            👤 Add New User
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          borderRadius: '8px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4361ee', margin: '0' }}>{users.length}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Total Users</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          borderRadius: '8px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4caf50', margin: '0' }}>
            {users.filter(user => user.status === 'Active').length}
          </h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Active Users</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          borderRadius: '8px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#ff9800', margin: '0' }}>
            {users.filter(user => user.role === 'Admin').length}
          </h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Admin Users</p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
        {searchTerm && (
          <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>Users List</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {filteredUsers.length} users
            </span>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#4361ee',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontWeight: '500' }}>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 
                      user.role === 'Admin' ? '#e3f2fd' : 
                      user.role === 'Manager' ? '#f3e5f5' : '#e8f5e8',
                    color: 
                      user.role === 'Admin' ? '#1976d2' : 
                      user.role === 'Manager' ? '#7b1fa2' : '#388e3c'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: user.status === 'Active' ? '#e8f5e8' : '#ffebee',
                    color: user.status === 'Active' ? '#4caf50' : '#f44336'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      className="btn btn-primary"
                      style={{ 
                        padding: '5px 10px', 
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      onClick={() => alert(`Edit user: ${user.name}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn btn-danger"
                      style={{ 
                        padding: '5px 10px', 
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      onClick={() => deleteUser(user.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  required
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{
                    padding: '10px 20px'
                  }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 500px;
          max-width: 90vw;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }
        
        .modal-header h2 {
          margin: 0;
          color: #333;
        }
        
        .modal-header button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        
        .modal-header button:hover {
          color: #333;
        }
        
        .btn-success {
          background: #4caf50;
          color: white;
        }
        
        .btn-warning {
          background: #ff9800;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Users;