import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
)
