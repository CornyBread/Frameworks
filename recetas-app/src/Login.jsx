import React, { useState } from 'react';

// Credenciales simuladas (Hardcodeadas para este ejercicio)
const VALID_USER = 'admin';
const VALID_PASS = 'admin123';

export default function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificación de credenciales
    if (credentials.username === VALID_USER && credentials.password === VALID_PASS) {
      setError('');
      onLoginSuccess(); // Llama a la función del padre para darle acceso
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Acceso a Recetas</h2>
        
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.inputGroup}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>Ingresar</button>
      </form>
    </div>
  );
}

// Estilos básicos en línea para que funcione rápido sin CSS extra
// Estilos mejorados para el Login
// Estilos del Login - Tema Azul Oscuro
const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    /* Fondo degradado elegante en tonos azul oscuro */
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  form: { 
    padding: '2.5rem', 
    background: 'rgba(255, 255, 255, 0.95)', /* Mantenemos la caja blanca para que el texto sea legible */
    borderRadius: '16px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)', /* Sombra un poco más profunda */
    width: '320px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1.2rem',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: '#0f2027', /* Azul casi negro para el título */
    fontSize: '1.8rem'
  },
  inputGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.4rem',
    textAlign: 'left',
    color: '#334155' /* Gris azulado para las etiquetas */
  },
  input: { 
    padding: '0.8rem', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#f8fafc'
  },
  button: { 
    padding: '0.8rem', 
    backgroundColor: '#2563eb', /* Un azul vibrante y profesional para el botón */
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '0.5rem',
    transition: 'transform 0.1s, background-color 0.2s',
    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
  },
  error: { 
    color: '#c0392b', 
    fontSize: '0.9rem', 
    backgroundColor: '#fadbd8', 
    padding: '0.6rem', 
    borderRadius: '6px',
    fontWeight: '500'
  }
};