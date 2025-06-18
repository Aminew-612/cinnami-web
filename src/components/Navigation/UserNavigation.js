import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

export default function UserNavigation() {
  return (
    <nav className="nav-container">
      <ul>
        <li><Link to="/user">Inicio</Link></li>
        <li><Link to="/user/cards">Estado de Tarjetas</Link></li>
        <li><Link to="/user/history">Historial de Accesos</Link></li>
        <li><Link to="/">Cerrar Sesión</Link></li>
      </ul>
    </nav>
  );
}
