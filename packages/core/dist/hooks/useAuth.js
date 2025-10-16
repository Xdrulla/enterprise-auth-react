import { useKeycloak } from './useKeycloak';
export const useAuth = (config) => {
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
