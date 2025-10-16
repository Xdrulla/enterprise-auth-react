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
```

2. Verify configuration:
```javascript
// Ensure correct URL (no trailing slash)
const config = {
  url: 'http://localhost:8080',  // ✅ Correct
  url: 'http://localhost:8080/', // ❌ Wrong
};
```

3. Check browser console for CORS errors

---

### Token Expired Errors

**Symptoms:**
- API calls fail with 401
- Automatic logout

**Solutions:**

Token refresh is automatic, but you can force refresh:

```javascript
const { keycloak } = useKeycloak();
await keycloak.updateToken(30);
```

---

### Infinite Redirect Loop

**Symptoms:**
- Page keeps redirecting between login and app

**Solutions:**

1. Check `onLoad` configuration
2. Use `check-sso` instead of `login-required` for auto-redirect

---

### Type Errors (TypeScript)

**Symptoms:**
- Type errors in imports

**Solutions:**

```typescript
// Ensure types are imported
import type { KeycloakConfig } from 'enterprise-auth-react';
```

---

### React Version Conflicts

**Symptoms:**
- Peer dependency warnings
- Type conflicts

**Solutions:**

Ensure you're using React 18+:

```bash
npm install react@^18 react-dom@^18
# or
yarn add react@^18 react-dom@^18
```

---

## Getting Help

- 📖 [Documentation](./getting-started.md)
- 🐛 [Report Issues](https://github.com/yourusername/enterprise-auth-react/issues)
- 💬 [Discussions](https://github.com/yourusername/enterprise-auth-react/discussions)
