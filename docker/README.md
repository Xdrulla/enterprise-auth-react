# Keycloak Local Setup

## 🚀 Start Keycloak

```bash
docker-compose up -d
🔐 Access
Keycloak Admin Console: http://localhost:8080
Username: admin
Password: admin
👥 Test Users
Username	Password	Roles
testuser	test123	user
admin	admin123	admin, user
📝 Configuration
Realm: demo-realm
Client ID: react-app
Redirect URI: http://localhost:3000/*
🛑 Stop Keycloak
docker-compose down
🗑️ Reset (remove all data)
docker-compose down -v