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
```

**Example:**
```jsx
const { isAuthenticated, login, logout } = useAuth();
```

---

### `useKeycloak()`

Full access to Keycloak instance and state.

**Returns:**
```typescript
{
  keycloak: Keycloak | null;
  initialized: boolean;
  authenticated: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  register: () => void;
}
```

**Example:**
```jsx
const { keycloak, token } = useKeycloak();
const user = keycloak?.tokenParsed;
```

---

## Components

### `<KeycloakProvider>`

Context provider for Keycloak authentication.

**Props:**
```typescript
{
  config: {
    url: string;
    realm: string;
    clientId: string;
  };
  children: ReactNode;
}
```

**Example:**
```jsx
<KeycloakProvider config={keycloakConfig}>
  <App />
</KeycloakProvider>
```

---

### `<ProtectedRoute>`

Component to protect routes requiring authentication.

**Props:**
```typescript
{
  children: ReactNode;
  fallback?: ReactNode;
}
```

**Example:**
```jsx
<ProtectedRoute fallback={<LoginPage />}>
  <Dashboard />
</ProtectedRoute>
```

---

## Utilities

### `tokenManager`

Utilities for JWT token operations.

**Methods:**

#### `decodeToken(token: string)`
Decode JWT token.

```typescript
const decoded = tokenManager.decodeToken(token);
// { sub, email, roles, ... }
```

#### `isTokenExpired(token: string)`
Check if token is expired.

```typescript
const expired = tokenManager.isTokenExpired(token);
```

#### `getUserRoles(token: string)`
Extract user roles from token.

```typescript
const roles = tokenManager.getUserRoles(token);
// ['user', 'admin']
```

---

### `createApiInterceptor(keycloak)`

Create API client with automatic auth headers.

**Methods:**

#### `fetchWithAuth(url, options)`
Fetch with auto-injected auth header.

```typescript
const api = createApiInterceptor(keycloak);
const response = await api.fetchWithAuth('/api/users');
```

#### `getAuthHeader()`
Get Authorization header value.

```typescript
const header = await api.getAuthHeader();
// "Bearer eyJhbGci..."
```

---

## TypeScript

Full TypeScript support included:

```typescript
import type {
  KeycloakConfig,
  KeycloakContextValue
} from 'enterprise-auth-react';
```
