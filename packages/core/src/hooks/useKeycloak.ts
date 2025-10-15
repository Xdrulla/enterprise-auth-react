import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakConfig, KeycloakHookResult } from '../types';

export const useKeycloak = (config: KeycloakConfig): KeycloakHookResult => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar Keycloak
    const keycloakInstance = new Keycloak({
      url: config.url,
      realm: config.realm,
      clientId: config.clientId,
    });

    keycloakInstance
      .init({ 
        onLoad: 'check-sso',
        checkLoginIframe: false 
      })
      .then((authenticated) => {
        setKeycloak(keycloakInstance);
        setAuthenticated(authenticated);
        setToken(keycloakInstance.token || null);
        setInitialized(true);

        // Atualizar token automaticamente
        setInterval(() => {
          keycloakInstance.updateToken(70).catch(() => {
            console.error('Failed to refresh token');
          });
        }, 60000); // A cada 1 minuto
      })
      .catch((error) => {
        console.error('Keycloak initialization failed', error);
        setInitialized(true);
      });
  }, [config]);

  const login = () => keycloak?.login();
  const logout = () => keycloak?.logout();
  const register = () => keycloak?.register();

  return {
    keycloak,
    initialized,
    authenticated,
    token,
    login,
    logout,
    register,
  };
};