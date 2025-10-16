import Keycloak from 'keycloak-js';
/**
 * Creates an API interceptor that adds auth token to requests
 */
export declare const createApiInterceptor: (keycloak: Keycloak | null) => {
    /**
     * Add Authorization header to fetch requests
     */
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
    /**
     * Get Authorization header value
     */
    getAuthHeader: () => Promise<string | null>;
};
