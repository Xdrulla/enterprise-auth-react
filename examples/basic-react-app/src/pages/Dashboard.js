import React from 'react';
import { useKeycloak } from 'enterprise-auth-react';
import { tokenManager } from 'enterprise-auth-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { token, logout } = useKeycloak();
  const navigate = useNavigate();

  const userInfo = token ? tokenManager.decodeToken(token) : null;
  const roles = token ? tokenManager.getUserRoles(token) : [];

  const handleLogout = () => {
    logout();
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>🏢 Enterprise Dashboard</h2>
        <div className="nav-actions">
          <button onClick={goToProfile} className="btn-secondary">
            Profile
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h1>Welcome, {userInfo?.preferred_username || 'User'}!</h1>
          <p>You are successfully authenticated with Keycloak</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p>{userInfo?.email || 'N/A'}</p>
          </div>

          <div className="info-card">
            <h3>👤 Username</h3>
            <p>{userInfo?.preferred_username || 'N/A'}</p>
          </div>

          <div className="info-card">
            <h3>🎭 Roles</h3>
            <div className="roles-list">
              {roles.length > 0 ? (
                roles.map(role => (
                  <span key={role} className="role-badge">{role}</span>
                ))
              ) : (
                <p>No roles assigned</p>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>🔑 Token Status</h3>
            <p className="token-status">
              {tokenManager.isTokenExpired(token) ? (
                <span className="status-error">❌ Expired</span>
              ) : (
                <span className="status-success">✅ Valid</span>
              )}
            </p>
          </div>
        </div>

        <div className="token-card">
          <h3>🔐 JWT Token Preview</h3>
          <pre className="token-preview">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
