import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavigationMenu.module.css";
import logoCinnami from "../../assets/logos/CINNAMILOGO.png";
import { IoHome } from "react-icons/io5";
import { PiCardsThreeBold } from "react-icons/pi";
import { FaUsersGear } from "react-icons/fa6";
import { GiExitDoor } from "react-icons/gi";
import { GiLockedDoor } from "react-icons/gi";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";

export default function NavigationMenu({ userType }) {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation(); // Hook para obtener la ruta actual

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  // Cerrar menú al redimensionar la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMenuItems = () => {
    if (userType === "admin") {
      return [
        { to: "/admin", label: <span><IoHome /> Inicio</span> },
        { to: "/admin/doors", label: <span><GiLockedDoor /> Estado de Puertas</span> },
        { to: "/admin/cards", label: <span><PiCardsThreeBold /> Gestionar Tarjetas</span> },
        { to: "/admin/users", label: <span><FaUsersGear /> Administrar Usuarios</span> },
        { to: "/admin/manage-doors", label: <span><BsFillDoorClosedFill /> Administrar Puertas</span> },
        { to: "/", label: <span><GiExitDoor /> Cerrar Sesión</span> },
      ];
    } else {
      return [
        { to: "/user", label: <span><IoHome /> Inicio</span> },
        { to: "/user/cards", label: <span><IoCardOutline /> Estado de Tarjeta</span> },
        { to: "/user/history", label: <span><LuHistory /> Historial de Accesos</span> },
        { to: "/", label: <span><GiExitDoor /> Cerrar Sesión</span> },
      ];
    }
  };
  

  // Función para determinar si un enlace está activo
  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  return (
    <>
      {/* Header superior para móviles con logo */}
      <header className={styles.headerSuperior}>
        <div className={`${styles.logoHeader} ${menuActive ? styles.oculto : ""}`}>
          <img
            className={styles.logoPrincipal}
            src={logoCinnami}
            alt="Logo de CINNAMI"
          />

          <div className={styles.textoMarca}>
            <div className={styles.nombreMarca}>CINNAMI</div>
            <div className={styles.lemaMarca}>Smart solutions for a connected world</div>
          </div>
        </div>
      </header>

      {/* Overlay para cerrar el menú */}
      <div
        className={`${styles.overlayMenu} ${menuActive ? styles.activo : ""}`}
        onClick={toggleMenu}
      />

      {/* Botón hamburguesa para móviles y tablets */}
      <div
        className={`${styles.botonMenuMovil} ${menuActive ? styles.activo : ""}`}
        onClick={toggleMenu}
      >
        <div className={styles.lineaHamburguesa}></div>
        <div className={styles.lineaHamburguesa}></div>
        <div className={styles.lineaHamburguesa}></div>
      </div>

      {/* Barra de navegación lateral */}
      <nav className={`${styles.barraNavegacion} ${menuActive ? styles.activa : ""}`}>
        <div className={styles.contenedorNavegacion}>
          {/* Logo y marca de la empresa */}
          <div className={styles.seccionLogo}>
            <img
              className={styles.logoPrincipal}
              src={logoCinnami}
              alt="Logo de CINNAMI"
            />
            <div className={styles.textoMarca}>
              <div className={styles.brandName}>CINNAMI</div>
              <div className={styles.lemaMarca}>Smart solutions for a connected world</div>
            </div>
          </div>

          {/* Menú de navegación vertical */}
          <ul className={styles.menuNavegacion}>
            {getMenuItems().map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to} 
                  className={`${styles.enlaceMenu} ${isActiveLink(item.to) ? styles.activo : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}