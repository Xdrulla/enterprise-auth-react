import React from 'react';
import { useAuth } from '../hooks/useAuth';
/**
 * Component to protect routes requiring authentication
 * Shows fallback (or redirects to login) if not authenticated
 */
export const ProtectedRoute = ({ children, fallback }) => {
    const { isAuthenticated, isLoading, login } = useAuth();
    // Show nothing while loading
    if (isLoading) {
        return React.createElement("div", null, "Loading...");
    }
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        if (fallback) {
            return React.createElement(React.Fragment, null, fallback);
        }
        // Auto redirect to Keycloak login
        login();
        return React.createElement("div", null, "Redirecting to login...");
    }
    // Render protected content
    return React.createElement(React.Fragment, null, children);
};
