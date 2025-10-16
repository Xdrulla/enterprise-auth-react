/**
 * Token management utilities
 */
export declare const tokenManager: {
    /**
     * Decode JWT token (simple base64 decode)
     */
    decodeToken: (token: string) => any;
    /**
     * Check if token is expired
     */
    isTokenExpired: (token: string) => boolean;
    /**
     * Get token expiration time in seconds
     */
    getTokenExpirationTime: (token: string) => number | null;
    /**
     * Extract user roles from token
     */
    getUserRoles: (token: string) => string[];
};
