import { KeycloakConfig } from '../types';
export declare const useAuth: (config: KeycloakConfig) => {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
};
