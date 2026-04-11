import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth'; // Importamos tu servicio

const Navbar = ({ onOpenContact }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Borra el token y el usuario del localStorage
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        Mi<span>Portafolio</span>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button 
          className="nav-contact-btn"
          onClick={onOpenContact}
        >
          Contactar
        </button>
        
        {/* Nuevo botón de cerrar sesión con un color rojo para distinguirlo */}
        <button 
          className="nav-contact-btn"
          style={{ backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ef4444';
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;