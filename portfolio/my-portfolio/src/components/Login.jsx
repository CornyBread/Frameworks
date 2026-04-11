import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Llamamos al servicio de autenticación
      await loginUser(credentials.email, credentials.password);
      
      // Si el login es exitoso, redirigimos al portafolio
      navigate('/portfolio'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-modal">
        {/* Opcional: Puedes descomentar la siguiente línea si quieres que la X redirija a alguna parte */}
        {/* <span className="auth-close-icon" onClick={() => navigate('/')}>&times;</span> */}

        <h2 className="auth-title">Iniciar Sesión</h2>
        <p className="auth-subtitle">
          
        </p>
        
        {/* Mensaje de error visual */}
        {error && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', marginBottom: '1rem', textAlign: 'center', border: '1px solid #ef4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="ejemplo@email.com"
              required
              className="auth-input"
            />
          </div>
          
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              required
              className="auth-input"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="auth-button"
            style={{ marginTop: '10px' }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register" className="auth-link">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;