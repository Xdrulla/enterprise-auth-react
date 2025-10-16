# 🐳 Keycloak Local Setup

Local development environment with Keycloak and PostgreSQL using Docker Compose.

## 🚀 Start Keycloak

```bash
docker-compose up -d
```

Wait ~20 seconds for Keycloak to fully initialize.

## 🔐 Access

### Keycloak Admin Console

- **URL:** http://localhost:8080
- **Username:** `admin`
- **Password:** `admin`

## 👥 Test Users

Pre-configured users for testing:

| Username | Password  | Roles       |
|----------|-----------|-------------|
| testuser | test123   | user        |
| admin    | admin123  | admin, user |

## 📝 Configuration

### Realm Configuration

- **Realm:** `demo-realm`
- **Client ID:** `react-app`
- **Redirect URI:** `http://localhost:3000/*`
- **Web Origins:** `http://localhost:3000`

### Client Settings

```javascript
{
  clientId: 'react-app',
  publicClient: true,
  redirectUris: ['http://localhost:3000/*'],
  webOrigins: ['http://localhost:3000']
}
```

## 🛑 Stop Keycloak

```bash
docker-compose down
```

## 🗑️ Reset (remove all data)

To completely reset Keycloak and start fresh:

```bash
docker-compose down -v
docker-compose up -d
```

This will:
- Remove all containers
- Delete all volumes (PostgreSQL data)
- Reimport the realm configuration

## 🔍 Troubleshooting

### Check Container Status

```bash
docker-compose ps
```

### View Logs

```bash
# All logs
docker-compose logs

# Keycloak logs only
docker-compose logs keycloak

# Follow logs in real-time
docker-compose logs -f keycloak
```

### Restart Services

```bash
docker-compose restart
```

### Keycloak Not Responding

1. Check if containers are running:
```bash
docker-compose ps
```

2. Verify port 8080 is not in use:
```bash
lsof -i :8080
```

3. Check logs for errors:
```bash
docker-compose logs keycloak | tail -50
```

## 📦 What's Included

### Services

- **Keycloak 23.0:** Identity and Access Management server
- **PostgreSQL 15:** Database for Keycloak

### Volumes

- `postgres_data`: Persistent PostgreSQL data

### Network

- `keycloak-network`: Bridge network for service communication

## 🔧 Customization

### Modify Realm Configuration

Edit `keycloak/realm-config.json` and restart:

```bash
docker-compose restart keycloak
```

### Add More Test Users

Edit the `users` array in `keycloak/realm-config.json`:

```json
{
  "username": "newuser",
  "enabled": true,
  "email": "newuser@example.com",
  "credentials": [{
    "type": "password",
    "value": "password123",
    "temporary": false
  }],
  "realmRoles": ["user"]
}
```

### Change Admin Credentials

In `docker-compose.yml`, modify:

```yaml
environment:
  KEYCLOAK_ADMIN: your-admin-username
  KEYCLOAK_ADMIN_PASSWORD: your-admin-password
```

## 🌐 Production Notes

⚠️ **This setup is for DEVELOPMENT only!**

For production:
- Use `start` instead of `start-dev`
- Enable HTTPS (`sslRequired: external`)
- Use strong passwords
- Configure proper database backups
- Set up monitoring and logging
- Use environment-specific realms

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak Docker Images](https://quay.io/repository/keycloak/keycloak)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Part of the [Enterprise Auth React](../README.md) project**
