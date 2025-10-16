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

## 🚀 Installation

```bash
npm install enterprise-auth-react
# or
yarn add enterprise-auth-react
```

## 📖 Quick Start

### 1. Wrap your app with KeycloakProvider

```jsx
import { KeycloakProvider } from 'enterprise-auth-react';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'your-realm',
  clientId: 'your-client-id',
};

function App() {
  return (
    <KeycloakProvider config={keycloakConfig}>
      <YourApp />
    </KeycloakProvider>
  );
}
```

### 2. Use authentication hooks

```jsx
import { useAuth } from 'enterprise-auth-react';

function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return <button onClick={login}>Login with SSO</button>;
}
```

### 3. Protect routes

```jsx
import { ProtectedRoute } from 'enterprise-auth-react';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 4. Access user data

```jsx
import { useKeycloak } from 'enterprise-auth-react';

function Profile() {
  const { keycloak, token, logout } = useKeycloak();
  const user = keycloak?.tokenParsed;

  return (
    <div>
      <h1>Welcome, {user?.preferred_username}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🔧 API Reference

### Hooks

#### `useAuth()`

Simplified authentication hook for common use cases.

```typescript
const { isAuthenticated, isLoading, token, login, logout } = useAuth();
```

**Returns:**
- `isAuthenticated: boolean` - User authentication status
- `isLoading: boolean` - Loading state during initialization
- `token: string | null` - Current JWT token
- `login: () => void` - Redirect to Keycloak login
- `logout: () => void` - Logout user

#### `useKeycloak()`

Full access to Keycloak instance and state.

```typescript
const { keycloak, initialized, authenticated, token, login, logout, register } = useKeycloak();
```

**Returns:**
- `keycloak: Keycloak | null` - Keycloak instance
- `initialized: boolean` - Initialization status
- `authenticated: boolean` - Authentication status
- `token: string | null` - JWT token
- `login: () => void` - Login function
- `logout: () => void` - Logout function
- `register: () => void` - Registration function

### Components

#### `<KeycloakProvider>`

Context provider for Keycloak authentication.

```jsx
<KeycloakProvider config={{ url, realm, clientId }}>
  <App />
</KeycloakProvider>
```

**Props:**
- `config: KeycloakConfig` - Keycloak configuration object
- `children: ReactNode` - Child components

#### `<ProtectedRoute>`

Component to protect routes requiring authentication.

```jsx
<ProtectedRoute fallback={<LoginPage />}>
  <ProtectedContent />
</ProtectedRoute>
```

**Props:**
- `children: ReactNode` - Protected content
- `fallback?: ReactNode` - Optional fallback component when not authenticated

### Utilities

#### `tokenManager`

Utilities for JWT token operations.

```typescript
import { tokenManager } from 'enterprise-auth-react';

// Decode token
const decoded = tokenManager.decodeToken(token);

// Check if expired
const isExpired = tokenManager.isTokenExpired(token);

// Get user roles
const roles = tokenManager.getUserRoles(token);
```

**Methods:**
- `decodeToken(token: string)` - Decode JWT token
- `isTokenExpired(token: string)` - Check token expiration
- `getUserRoles(token: string)` - Extract user roles from token

#### `createApiInterceptor(keycloak)`

Create API client with automatic authentication headers.

```typescript
import { createApiInterceptor, useKeycloak } from 'enterprise-auth-react';

const { keycloak } = useKeycloak();
const api = createApiInterceptor(keycloak);

// Fetch with auto-injected auth header
const response = await api.fetchWithAuth('/api/users');

// Get auth header only
const header = await api.getAuthHeader();
```

## 💡 Examples

### Role-Based Access Control

```jsx
import { useKeycloak, tokenManager } from 'enterprise-auth-react';

function AdminPanel() {
  const { token } = useKeycloak();
  const roles = tokenManager.getUserRoles(token);

  if (!roles.includes('admin')) {
    return <div>Access Denied</div>;
  }

  return <div>Admin Panel</div>;
}
```

### API Integration

```jsx
import { useKeycloak, createApiInterceptor } from 'enterprise-auth-react';

function DataFetcher() {
  const { keycloak } = useKeycloak();
  const [data, setData] = useState(null);

  useEffect(() => {
    const api = createApiInterceptor(keycloak);

    api.fetchWithAuth('/api/data')
      .then(res => res.json())
      .then(setData);
  }, [keycloak]);

  return <div>{JSON.stringify(data)}</div>;
}
```

### Token Information Display

```jsx
import { useKeycloak, tokenManager } from 'enterprise-auth-react';

function TokenInfo() {
  const { token } = useKeycloak();

  if (!token) return null;

  const decoded = tokenManager.decodeToken(token);
  const isExpired = tokenManager.isTokenExpired(token);
  const roles = tokenManager.getUserRoles(token);

  return (
    <div>
      <p>User: {decoded.preferred_username}</p>
      <p>Email: {decoded.email}</p>
      <p>Status: {isExpired ? 'Expired' : 'Valid'}</p>
      <p>Roles: {roles.join(', ')}</p>
    </div>
  );
}
```

## 🛠️ TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  KeycloakConfig,
  KeycloakContextValue
} from 'enterprise-auth-react';

const config: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'my-realm',
  clientId: 'my-app',
};
```

## 🐳 Local Development with Keycloak

Need a local Keycloak for testing? Check out our [Docker setup](https://github.com/yourusername/enterprise-auth-react/tree/main/docker):

```bash
git clone https://github.com/yourusername/enterprise-auth-react.git
cd enterprise-auth-react/docker
docker-compose up -d
```

Includes:
- Pre-configured realm
- Test users (testuser/test123, admin/admin123)
- Ready-to-use configuration

## 📚 Resources

- [Full Documentation](https://github.com/yourusername/enterprise-auth-react)
- [API Reference](https://github.com/yourusername/enterprise-auth-react/blob/main/docs/api-reference.md)
- [Examples](https://github.com/yourusername/enterprise-auth-react/tree/main/examples)
- [Keycloak Documentation](https://www.keycloak.org/documentation)

## 🤝 Contributing

Contributions are welcome! Please visit our [GitHub repository](https://github.com/yourusername/enterprise-auth-react) for guidelines.

## 📄 License

MIT © Luan Drulla

## 🙏 Acknowledgments

- [Keycloak](https://www.keycloak.org/) - Identity and Access Management
- [keycloak-js](https://www.npmjs.com/package/keycloak-js) - Official Keycloak JavaScript adapter

---

**Need help?** Open an issue on [GitHub](https://github.com/yourusername/enterprise-auth-react/issues)

**Made with ❤️ for enterprise React applications**
