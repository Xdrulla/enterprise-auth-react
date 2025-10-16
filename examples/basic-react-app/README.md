# Basic React App - Enterprise Auth Demo

Demo application showcasing the `enterprise-auth-react` library with Keycloak integration.

## 🚀 Quick Start

### 1. Start Keycloak (from project root)

```bash
cd ../../docker
docker-compose up -d
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start App

```bash
yarn start
```

### 4. Open Browser

```
http://localhost:3000
```

## 👥 Test Credentials

| Username | Password  | Role        |
|----------|-----------|-------------|
| testuser | test123   | user        |
| admin    | admin123  | admin, user |

## 📚 Features Demonstrated

- ✅ SSO Login with Keycloak
- ✅ Protected Routes
- ✅ Token Management
- ✅ User Profile Display
- ✅ Role-Based Information
- ✅ API Interceptor Example
- ✅ Logout Functionality

## 🔧 Configuration

Configuration is in `src/config/keycloak.js`:

```javascript
export const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'demo-realm',
  clientId: 'react-app',
};
```

## 📖 Library Usage Examples

### Basic Setup

```javascript
import { KeycloakProvider } from 'enterprise-auth-react';
import { keycloakConfig } from './config/keycloak';

<KeycloakProvider config={keycloakConfig}>
  <App />
</KeycloakProvider>
```

### Protected Route

```javascript
import { ProtectedRoute } from 'enterprise-auth-react';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Using Auth Hook

```javascript
import { useAuth } from 'enterprise-auth-react';

const MyComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  // ...
};
```

## 🛠️ Troubleshooting

### Keycloak Not Responding

```bash
# Check containers
docker-compose ps

# Restart
docker-compose restart
```

### Token Issues

Clear browser cache and cookies for `localhost:3000` and `localhost:8080`.

## 📦 Project Structure

```
src/
├── pages/
│   ├── Login.js          # Login page with SSO button
│   ├── Dashboard.js      # Protected dashboard with user info
│   └── Profile.js        # User profile with API test
├── styles/
│   ├── Login.css
│   ├── Dashboard.css
│   └── Profile.css
├── config/
│   └── keycloak.js       # Keycloak configuration
├── App.js                # Main app with routing
└── index.js              # Entry point
```

## 🎯 What This Example Demonstrates

1. **Authentication Flow:**
   - Keycloak SSO login
   - Automatic token refresh
   - Session management

2. **Route Protection:**
   - Using `<ProtectedRoute>` component
   - Redirect to login when not authenticated
   - Protected Dashboard and Profile pages

3. **User Information:**
   - Display user profile data
   - Show user roles
   - JWT token decoding

4. **API Integration:**
   - Using `createApiInterceptor`
   - Automatic auth header injection
   - Token expiration handling

5. **UI/UX:**
   - Modern, responsive design
   - Loading states
   - Error handling

## 🔗 Related Documentation

- [Main README](../../README.md)
- [API Reference](../../docs/api-reference.md)
- [Getting Started Guide](../../docs/getting-started.md)

---

**Built with `enterprise-auth-react` ❤️**
