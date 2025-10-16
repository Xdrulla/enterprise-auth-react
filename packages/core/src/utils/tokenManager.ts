/**
 * Token management utilities
 */

export const tokenManager = {
  /**
   * Decode JWT token (simple base64 decode)
   */
  decodeToken: (token: string) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token: string): boolean => {
    const decoded = tokenManager.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const now = Date.now() / 1000;
    return decoded.exp < now;
  },

  /**
   * Get token expiration time in seconds
   */
  getTokenExpirationTime: (token: string): number | null => {
    const decoded = tokenManager.decodeToken(token);
    return decoded?.exp || null;
  },

  /**
   * Extract user roles from token
   */
  getUserRoles: (token: string): string[] => {
    const decoded = tokenManager.decodeToken(token);
    return decoded?.realm_access?.roles || [];
  },
};