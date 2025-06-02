import { createRoot } from 'react-dom/client'
import { AuthProvider }  from './context/AuthContext.jsx';
import { RoomProvider } from './context/RoomContext.jsx';
import { BrowserRouter } from 'react-router';
import './styles/index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RoomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </RoomProvider> 
  </AuthProvider>
)