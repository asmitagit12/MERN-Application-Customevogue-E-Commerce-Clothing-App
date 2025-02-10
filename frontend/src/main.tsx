import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </PersistGate>
  </Provider>
)
