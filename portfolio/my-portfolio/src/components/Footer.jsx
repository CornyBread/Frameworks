import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} David. Todos los derechos reservados.</p>
      <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
        Desarrollado desde cero con React ⚛️
      </p>
    </footer>
  );
};

export default Footer;