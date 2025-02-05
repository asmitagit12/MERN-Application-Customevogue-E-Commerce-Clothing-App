import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Install using `npm install jwt-decode`

interface ProtectedRouteProps {
  isAllowed: boolean; // Indicates if the user is authenticated
  allowedRoles: string[]; // Array of roles allowed to access the route
  redirectPath: string; // Path to redirect if not allowed
  children: React.ReactNode; // The component to render if access is allowed
}

interface DecodedToken {
  role: string; // Adjust this to match your token's payload structure
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  allowedRoles,
  redirectPath,
  children,
}) => {
  let userRole: string | null = null;

  // Decode the role from the token in sessionStorage
  const token = sessionStorage.getItem('authToken');
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      userRole = decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      userRole = null;
    }
  }

  // Check if the user is authenticated and their role is allowed
  if (!isAllowed || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
