import Keycloak from 'keycloak-js';

/**
 * Creates an API interceptor that adds auth token to requests
 */
export const createApiInterceptor = (keycloak: Keycloak | null) => {
  return {
    /**
     * Add Authorization header to fetch requests
     */
    fetchWithAuth: async (url: string, options: RequestInit = {}) => {
      if (!keycloak || !keycloak.token) {
        throw new Error('Not authenticated');
      }

      // Refresh token if needed
      await keycloak.updateToken(30);

      const headers = {
        ...options.headers,
        Authorization: `Bearer ${keycloak.token}`,
      };

      return fetch(url, { ...options, headers });
    },

    /**
     * Get Authorization header value
     */
    getAuthHeader: async (): Promise<string | null> => {
      if (!keycloak || !keycloak.token) {
        return null;
      }

      await keycloak.updateToken(30);
      return `Bearer ${keycloak.token}`;
    },
  };
};