// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import {jwtDecode} from 'jwt-decode'

interface AuthContextType {
  isAuthenticated: boolean
  role: string | null
  login: (token: string) => void
  logout: () => void
}

interface DecodedToken {
  role: string
  exp?: number // Optional expiration field
  [key: string]: any // Additional fields in the token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getInitialState = () => {
  const token = sessionStorage.getItem('authToken')
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token)
      const isExpired = decoded.exp ? Date.now() >= decoded.exp * 1000 : false
      return { isAuthenticated: !isExpired, role: isExpired ? null : decoded.role || null }
    } catch (error) {
      console.error('Invalid token:', error)
      return { isAuthenticated: false, role: null }
    }
  }
  return { isAuthenticated: false, role: null }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [authState, setAuthState] = useState(getInitialState)

  const login = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token)
      const isExpired = decoded.exp ? Date.now() >= decoded.exp * 1000 : false
      if (isExpired) {
        console.error('Token is already expired')
        return
      }
      setAuthState({ isAuthenticated: true, role: decoded.role || null })
      sessionStorage.setItem('authToken', token)
      sessionStorage.setItem('isAuth', JSON.stringify(true))
    } catch (error) {
      console.error('Failed to decode token during login:', error)
    }
  }

  const logout = () => {
    setAuthState({ isAuthenticated: false, role: null })
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('isAuth')
  }

  // Periodically check for token expiration
  useEffect(() => {
    const interval = setInterval(() => {
      const token = sessionStorage.getItem('authToken')
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token)
          const isExpired = decoded.exp ? Date.now() >= decoded.exp * 1000 : false
          if (isExpired) {
            logout()
          }
        } catch (error) {
          console.error('Error while decoding token:', error)
          logout()
        }
      }
    }, 60000) // Check every 60 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        role: authState.role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
