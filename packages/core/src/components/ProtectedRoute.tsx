import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component to protect routes requiring authentication
 * Shows fallback (or redirects to login) if not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated, isLoading, login } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Auto redirect to Keycloak login
    login();
    return <div>Redirecting to login...</div>;
  }

  // Render protected content
  return <>{children}</>;
};