import React from 'react';

// Recibimos onOpenContact como propiedad (prop)
const Navbar = ({ onOpenContact }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Mi<span>Portafolio</span>
      </div>
      <button 
        className="nav-contact-btn"
        onClick={onOpenContact} // Ejecutamos la función al hacer clic
      >
        Contactar
      </button>
    </nav>
  );
};

export default Navbar;