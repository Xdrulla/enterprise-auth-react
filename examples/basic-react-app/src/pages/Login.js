import React from 'react';
import { useAuth } from 'enterprise-auth-react';
import '../styles/Login.css';

const Login = () => {
  const { login, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Enterprise Auth React</h1>
        <p>Demo Application with Keycloak SSO</p>
        
        <button 
          className="login-button"
          onClick={login}
        >
          Login with Keycloak
        </button>

        <div className="info-box">
          <h3>Test Credentials:</h3>
          <p><strong>User:</strong> testuser / test123</p>
          <p><strong>Admin:</strong> admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
