import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <img src="src\img\IMG (1).png" alt="CredySmartJDL" className="footer-logo" />
            <p>Confianza, transparencia y soluciones financieras a tu medida.</p>
          </div>
          <div className="footer-links">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/simulador">Simulador</Link></li>
              <li><Link to="/solicitud">Solicitar Crédito</Link></li>
              <li><a href="#">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>📞 +57 300 123 4567</p>
            <p>✉️ contacto@credysmartjdl.com</p>
            <p>📍 Medellin, Colombia</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CredySmartJDL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;