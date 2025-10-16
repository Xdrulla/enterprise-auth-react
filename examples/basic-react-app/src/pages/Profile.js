import React, { useState } from 'react';
import { useKeycloak, createApiInterceptor } from 'enterprise-auth-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { keycloak, logout } = useKeycloak();
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null);

  const userInfo = keycloak?.tokenParsed;
  const apiInterceptor = createApiInterceptor(keycloak);

  const handleLogout = () => {
    logout();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const testApiCall = async () => {
    try {
      const authHeader = await apiInterceptor.getAuthHeader();
      setApiResponse({
        status: 'success',
        header: authHeader,
        message: 'Authorization header generated successfully!'
      });
    } catch (error) {
      setApiResponse({
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <h2>👤 User Profile</h2>
        <div className="nav-actions">
          <button onClick={goToDashboard} className="btn-secondary">
            Dashboard
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {userInfo?.preferred_username?.[0]?.toUpperCase() || 'U'}
            </div>
            <h1>{userInfo?.name || userInfo?.preferred_username || 'User'}</h1>
            <p className="email">{userInfo?.email || 'No email provided'}</p>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="label">Username:</span>
              <span className="value">{userInfo?.preferred_username || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{userInfo?.email || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">First Name:</span>
              <span className="value">{userInfo?.given_name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Last Name:</span>
              <span className="value">{userInfo?.family_name || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="api-test-card">
          <h3>🧪 Test API Interceptor</h3>
          <p>Test the API interceptor to see how it adds authentication headers</p>
          
          <button onClick={testApiCall} className="btn-test">
            Test API Call
          </button>

          {apiResponse && (
            <div className={`api-response ${apiResponse.status}`}>
              <h4>Response:</h4>
              {apiResponse.status === 'success' ? (
                <>
                  <p>{apiResponse.message}</p>
                  <pre>{apiResponse.header}</pre>
                </>
              ) : (
                <p className="error">{apiResponse.message}</p>
              )}
            </div>
          )}
        </div>

        <div className="account-actions">
          <h3>⚙️ Account Actions</h3>
          <div className="action-buttons">
            <button 
              onClick={() => keycloak?.accountManagement()}
              className="btn-action"
            >
              Manage Account
            </button>
            <button 
              onClick={handleLogout}
              className="btn-action danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
