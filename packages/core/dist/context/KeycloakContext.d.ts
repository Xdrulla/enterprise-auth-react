import React, { ReactNode } from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakConfig } from '../types';
interface KeycloakContextValue {
    keycloak: Keycloak | null;
    initialized: boolean;
    authenticated: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
    register: () => void;
}
export declare const KeycloakContext: React.Context<KeycloakContextValue | undefined>;
interface KeycloakProviderProps {
    config: KeycloakConfig;
    children: ReactNode;
}
export declare const KeycloakProvider: React.FC<KeycloakProviderProps>;
export {};
