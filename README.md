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
```

### Basic Usage

```jsx
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
```

## 📚 Documentation

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Examples](./examples/)
- [Troubleshooting](./docs/troubleshooting.md)

## 🎮 Examples

### Live Demo

Check out the [Basic React App](./examples/basic-react-app) for a complete working example.

### Run Example Locally

```bash
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
```

**Test credentials:**
- User: `testuser` / `test123`
- Admin: `admin` / `admin123`

## 🔧 API Reference

### Hooks

#### `useAuth()`
Simplified authentication hook.

```typescript
const { isAuthenticated, isLoading, token, login, logout } = useAuth();
```

#### `useKeycloak()`
Full Keycloak instance access.

```typescript
const { keycloak, initialized, authenticated, token, login, logout, register } = useKeycloak();
```

### Components

#### `<KeycloakProvider>`
Provides Keycloak context to your app.

```jsx
<KeycloakProvider config={{ url, realm, clientId }}>
  <App />
</KeycloakProvider>
```

#### `<ProtectedRoute>`
Protects routes requiring authentication.

```jsx
<ProtectedRoute fallback={<LoginPage />}>
  <ProtectedContent />
</ProtectedRoute>
```

### Utils

#### `tokenManager`
Utilities for JWT token management.

```typescript
import { tokenManager } from 'enterprise-auth-react';

const decoded = tokenManager.decodeToken(token);
const isExpired = tokenManager.isTokenExpired(token);
const roles = tokenManager.getUserRoles(token);
```

#### `createApiInterceptor`
Create authenticated API client.

```typescript
import { createApiInterceptor, useKeycloak } from 'enterprise-auth-react';

const { keycloak } = useKeycloak();
const api = createApiInterceptor(keycloak);

// Use with fetch
const response = await api.fetchWithAuth('/api/users');

// Or get header
const header = await api.getAuthHeader();
```

## 🏗️ Project Structure

```
enterprise-auth-react/
├── packages/
│   └── core/              # Main NPM package
├── examples/
│   └── basic-react-app/   # Demo application
├── docker/                # Keycloak local setup
└── docs/                  # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT © Luan Drulla

## 🙏 Acknowledgments

- [Keycloak](https://www.keycloak.org/) - Identity and Access Management
- [keycloak-js](https://www.npmjs.com/package/keycloak-js) - Official Keycloak JavaScript adapter

---

**Made with ❤️ for enterprise React applications**
