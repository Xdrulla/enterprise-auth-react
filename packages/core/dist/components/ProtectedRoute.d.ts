import React, { ReactNode } from 'react';
interface ProtectedRouteProps {
    children: ReactNode;
    fallback?: ReactNode;
}
/**
 * Component to protect routes requiring authentication
 * Shows fallback (or redirects to login) if not authenticated
 */
export declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export {};
