import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  role: string;
  exp: number; // Token expiration time (optional, based on your token structure)
  // Add other fields based on your JWT payload structure
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role);
        } else {
          // Token is expired, remove it from localStorage
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []); // Runs once when the component mounts

  return { isAuthenticated, userRole };
};

export default useAuth;
