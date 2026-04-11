import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';

// Componente Guardián (Protected Route)
const ProtectedRoute = ({ children }) => {
  // Verificamos si el usuario tiene un token de sesión guardado
  const isAuthenticated = localStorage.getItem('authToken');
  
  // Si no está autenticado, lo devolvemos a la ruta de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, renderizamos el componente que pidió (el Portfolio)
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz al login por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas públicas (cualquiera puede verlas) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta PROTEGIDA (solo para usuarios que iniciaron sesión) */}
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;