import { useKeycloak }  from './useKeycloak';
import { KeycloakConfig } from '../types';

export const useAuth = (config: KeycloakConfig) => {
  const { authenticated, token, login, logout, initialized } = useKeycloak(config);

  const isAuthenticated = initialized && authenticated;
  const isLoading = !initialized;

  return {
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
  };
};