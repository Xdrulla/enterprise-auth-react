# 🔐 Enterprise Auth React

Professional authentication toolkit for React applications with Keycloak SSO integration.

[![npm version](https://img.shields.io/npm/v/enterprise-auth-react.svg)](https://www.npmjs.com/package/enterprise-auth-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔒 **Keycloak Integration** - Official Keycloak.js wrapper with React hooks
- 🎣 **React Hooks** - Simple hooks for authentication state
- 🛡️ **Protected Routes** - Easy route protection components
- 🔄 **Auto Token Refresh** - Automatic JWT token renewal
- 🔌 **API Interceptors** - Ready-to-use axios/fetch interceptors
- 📦 **TypeScript** - Full TypeScript support
- 🎨 **Framework Agnostic** - Works with any React setup

## 🚀 Quick Start

### Installation

```bash
npm install enterprise-auth-react
# or
yarn add enterprise-auth-react
Basic Usage
import { KeycloakProvider, useAuth, ProtectedRoute } from 'enterprise-auth-react';

// 1. Wrap your app with KeycloakProvider
const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'your-realm',
  clientId: 'your-client-id',
};

function App() {
  return (
    <KeycloakProvider config={keycloakConfig}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </KeycloakProvider>
  );
}

// 2. Use authentication hooks
function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  
  return <button onClick={login}>Login with SSO</button>;
}

// 3. Access user data
function Dashboard() {
  const { keycloak, token, logout } = useKeycloak();
  const user = keycloak?.tokenParsed;
  
  return (
    <div>
      <h1>Welcome, {user?.preferred_username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
📚 Documentation
Getting Started
API Reference
Examples
Troubleshooting
🎮 Examples
Live Demo
Check out the Basic React App for a complete working example.
Run Example Locally
# 1. Clone repository
git clone https://github.com/yourusername/enterprise-auth-react.git
cd enterprise-auth-react

# 2. Start Keycloak
cd docker
docker-compose up -d

# 3. Run example app
cd ../examples/basic-react-app
yarn install
yarn start
Test credentials:
User: testuser / test123
Admin: admin / admin123
🔧 API Reference
Hooks
useAuth()
Simplified authentication hook.
const { isAuthenticated, isLoading, token, login, logout } = useAuth();
useKeycloak()
Full Keycloak instance access.
const { keycloak, initialized, authenticated, token, login, logout, register } = useKeycloak();
Components
<KeycloakProvider>
Provides Keycloak context to your app.
<KeycloakProvider config={{ url, realm, clientId }}>
  <App />
</KeycloakProvider>
<ProtectedRoute>
Protects routes requiring authentication.
<ProtectedRoute fallback={<LoginPage />}>
  <ProtectedContent />
</ProtectedRoute>
Utils
tokenManager
Utilities for JWT token management.
import { tokenManager } from 'enterprise-auth-react';

const decoded = tokenManager.decodeToken(token);
const isExpired = tokenManager.isTokenExpired(token);
const roles = tokenManager.getUserRoles(token);
createApiInterceptor
Create authenticated API client.
import { createApiInterceptor, useKeycloak } from 'enterprise-auth-react';

const { keycloak } = useKeycloak();
const api = createApiInterceptor(keycloak);

// Use with fetch
const response = await api.fetchWithAuth('/api/users');

// Or get header
const header = await api.getAuthHeader();
🏗️ Project Structure
enterprise-auth-react/
├── packages/
│   └── core/              # Main NPM package
├── examples/
│   └── basic-react-app/   # Demo application
├── docker/                # Keycloak local setup
└── docs/                  # Documentation
🤝 Contributing
Contributions are welcome! Please read our Contributing Guide for details.
📄 License
MIT © [Your Name]
🙏 Acknowledgments
Keycloak - Identity and Access Management
keycloak-js - Official Keycloak JavaScript adapter
Made with ❤️ for enterprise React applications

---

### 📝 **Documentação Adicional**

#### `docs/getting-started.md`
```markdown
# Getting Started

## Prerequisites

- Node.js 16+
- React 18+
- Keycloak server (local or remote)

## Installation

```bash
npm install enterprise-auth-react
Basic Setup
1. Configure Keycloak
Create a configuration file:
// config/keycloak.js
export const keycloakConfig = {
  url: 'https://your-keycloak-server.com',
  realm: 'your-realm',
  clientId: 'your-client-id',
};
2. Wrap Your App
import { KeycloakProvider } from 'enterprise-auth-react';
import { keycloakConfig } from './config/keycloak';

function Root() {
  return (
    <KeycloakProvider config={keycloakConfig}>
      <App />
    </KeycloakProvider>
  );
}
3. Use Authentication
import { useAuth, ProtectedRoute } from 'enterprise-auth-react';

function App() {
  const { isAuthenticated, login } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }
  
  return <Dashboard />;
}
Next Steps
API Reference
Examples
Troubleshooting

---

#### `docs/api-reference.md`
```markdown
# API Reference

## Hooks

### `useAuth()`

Simplified authentication hook for common use cases.

**Returns:**
```typescript
{
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
}
Example:
const { isAuthenticated, login, logout } = useAuth();
useKeycloak()
Full access to Keycloak instance and state. Returns:
{
  keycloak: Keycloak | null;
  initialized: boolean;
  authenticated: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  register: () => void;
}
Example:
const { keycloak, token } = useKeycloak();
const user = keycloak?.tokenParsed;
Components
<KeycloakProvider>
Context provider for Keycloak authentication. Props:
{
  config: {
    url: string;
    realm: string;
    clientId: string;
  };
  children: ReactNode;
}
Example:
<KeycloakProvider config={keycloakConfig}>
  <App />
</KeycloakProvider>
<ProtectedRoute>
Component to protect routes requiring authentication. Props:
{
  children: ReactNode;
  fallback?: ReactNode;
}
Example:
<ProtectedRoute fallback={<LoginPage />}>
  <Dashboard />
</ProtectedRoute>
Utilities
tokenManager
Utilities for JWT token operations. Methods:
decodeToken(token: string)
Decode JWT token.
const decoded = tokenManager.decodeToken(token);
// { sub, email, roles, ... }
isTokenExpired(token: string)
Check if token is expired.
const expired = tokenManager.isTokenExpired(token);
getUserRoles(token: string)
Extract user roles from token.
const roles = tokenManager.getUserRoles(token);
// ['user', 'admin']
createApiInterceptor(keycloak)
Create API client with automatic auth headers. Methods:
fetchWithAuth(url, options)
Fetch with auto-injected auth header.
const api = createApiInterceptor(keycloak);
const response = await api.fetchWithAuth('/api/users');
getAuthHeader()
Get Authorization header value.
const header = await api.getAuthHeader();
// "Bearer eyJhbGci..."
TypeScript
Full TypeScript support included:
import type { 
  KeycloakConfig, 
  KeycloakContextValue 
} from 'enterprise-auth-react';

---

#### `docs/troubleshooting.md`
```markdown
# Troubleshooting

## Common Issues

### Keycloak Not Responding

**Symptoms:**
- App hangs on loading
- "Failed to initialize Keycloak" error

**Solutions:**

1. Check Keycloak is running:
```bash
curl http://localhost:8080
Verify configuration:
// Ensure correct URL (no trailing slash)
const config = {
  url: 'http://localhost:8080',  // ✅ Correct
  url: 'http://localhost:8080/', // ❌ Wrong
};
Check browser console for CORS errors
Token Expired Errors
Symptoms:
API calls fail with 401
Automatic logout
Solutions: Token refresh is automatic, but you can force refresh:
const { keycloak } = useKeycloak();
await keycloak.updateToken(30);
Infinite Redirect Loop
Symptoms:
Page keeps redirecting between login and app
Solutions:
Check onLoad configuration
Use check-sso instead of login-required for auto-redirect
Type Errors (TypeScript)
Symptoms:
Type errors in imports
Solutions:
// Ensure types are imported
import type { KeycloakConfig } from 'enterprise-auth-react';
Getting Help
📖 Documentation
🐛 Report Issues
💬 Discussions

---