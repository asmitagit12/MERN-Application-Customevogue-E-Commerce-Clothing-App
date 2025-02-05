// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useConfig } from '../hooks/use-config';
import { useMount } from '../hooks/useMount';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isAuth, setAuth] = useConfig();
  const mount = useMount();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if(isAuth.isAuth){
      setIsAuthenticated(true);
    }
  }, [isAuth]);

  const login = () => {
    setIsAuthenticated(true);
    setAuth({isAuth:true});
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuth({isAuth:false});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {mount && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
