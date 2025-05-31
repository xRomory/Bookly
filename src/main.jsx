import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router';
import './styles/index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </AuthProvider>
)
