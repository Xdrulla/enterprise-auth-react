# Getting Started

## Prerequisites

- Node.js 16+
- React 18+
- Keycloak server (local or remote)

## Installation

```bash
npm install enterprise-auth-react
# or
yarn add enterprise-auth-react
```

## Basic Setup

### 1. Configure Keycloak

Create a configuration file:

```javascript
// config/keycloak.js
export const keycloakConfig = {
  url: 'https://your-keycloak-server.com',
  realm: 'your-realm',
  clientId: 'your-client-id',
};
```

### 2. Wrap Your App

```jsx
import { KeycloakProvider } from 'enterprise-auth-react';
import { keycloakConfig } from './config/keycloak';

function Root() {
  return (
    <KeycloakProvider config={keycloakConfig}>
      <App />
    </KeycloakProvider>
  );
}
```

### 3. Use Authentication

```jsx
import { useAuth, ProtectedRoute } from 'enterprise-auth-react';

function App() {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }

  return <Dashboard />;
}
```

## Next Steps

- [API Reference](./api-reference.md)
- [Examples](../examples/)
- [Troubleshooting](./troubleshooting.md)
