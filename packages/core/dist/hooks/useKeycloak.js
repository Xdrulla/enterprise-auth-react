import { useContext } from 'react';
import { KeycloakContext } from '../context/KeycloakContext';
/**
 * Hook to access Keycloak instance and state
 * Must be used inside KeycloakProvider
 */
export const useKeycloak = () => {
    const context = useContext(KeycloakContext);
    if (context === undefined) {
        throw new Error('useKeycloak must be used within KeycloakProvider');
    }
    return context;
};
