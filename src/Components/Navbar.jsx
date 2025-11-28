// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="container_CS">
          <img src="src\images\IMG(1).png" alt="CredySmartJDL" className="logo-img" />
          CredySmartJDL
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/simulador">Simulador</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/solicitud">Solicitar crédito</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;