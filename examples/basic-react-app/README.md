# Basic React App - Enterprise Auth Demo

Demo application showcasing the `enterprise-auth-react` library with Keycloak integration.

## 🚀 Quick Start

### 1. Start Keycloak (from project root)
```bash
cd ../../docker
docker-compose up -d
2. Install Dependencies
yarn install
3. Start App
yarn start
4. Open Browser
http://localhost:3000
👥 Test Credentials
Username	Password	Role
testuser	test123	user
admin	admin123	admin, user
📚 Features Demonstrated
✅ SSO Login with Keycloak
✅ Protected Routes
✅ Token Management
✅ User Profile Display
✅ Role-Based Information
✅ API Interceptor Example
✅ Logout Functionality
🔧 Configuration
Configuration is in src/config/keycloak.js:
export const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'demo-realm',
  clientId: 'react-app',
};
📖 Library Usage Examples
Basic Setup
import { KeycloakProvider } from 'enterprise-auth-react';
import { keycloakConfig } from './config/keycloak';

<KeycloakProvider config={keycloakConfig}>
  <App />
</KeycloakProvider>
Protected Route
import { ProtectedRoute } from 'enterprise-auth-react';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
Using Auth Hook
import { useAuth } from 'enterprise-auth-react';

const MyComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  // ...
};
🛠️ Troubleshooting
Keycloak Not Responding
# Check containers
docker-compose ps

# Restart
docker-compose restart
Token Issues
Clear browser cache and cookies for localhost:3000 and localhost:8080.

---