import { useKeycloak } from './useKeycloak';

/**
 * Simplified authentication hook
 * Returns only essential auth state and actions
 */
export const useAuth = () => {
  const { authenticated, token, login, logout, initialized } = useKeycloak();

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