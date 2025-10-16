/**
 * Simplified authentication hook
 * Returns only essential auth state and actions
 */
export declare const useAuth: () => {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
};
