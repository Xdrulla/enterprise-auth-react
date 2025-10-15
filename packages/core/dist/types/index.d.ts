import Keycloak from 'keycloak-js';
export interface KeycloakConfig {
    url: string;
    realm: string;
    clientId: string;
}
export interface KeycloakHookResult {
    keycloak: Keycloak | null;
    initialized: boolean;
    authenticated: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
    register: () => void;
}
