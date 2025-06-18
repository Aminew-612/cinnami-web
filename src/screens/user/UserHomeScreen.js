import React, { useState } from "react";
import styles from "./UserHomeScreen.module.css";
import NavigationMenu from "../../components/Navigation/NavigationMenu";
import { LuHistory } from "react-icons/lu";
import userfoto2 from "../../assets/icons/userfoto2.png";
import { IoCardOutline } from "react-icons/io5";
import globalstyles from "../../styles/globalStyles.module.css";
import candado from "../../assets/logos/candado.png";

export default function UserHomeScreen() {
  const toggleCandado = () => {
    console.log("Candado clickeado");
  };

  return (
    <div className={styles.containerPrincipal}>
      <NavigationMenu userType="user" />
      <div className={styles.contenidoConMargen}>
        {/* Sección principal de la página */}
        <section className={styles.seccionPrincipal}>
          <div className={styles.contenedorPrincipal}>
            {/* Contenido izquierdo - información del usuario */}
            <div className={styles.contenidoPrincipal}>
              {/* Perfil personalizado del usuario */}
              <div className={styles.perfilUsuario}>
                <div className={styles.avatarPerfil}>
                  <img
                    className={styles.avatarPerfil}
                    src={userfoto2}
                    alt="Logo de CINNAMI"
                  />
                </div>
                <div className={styles.informacionPerfil}>
                  <h1>¡Hola, Javier Vazquez!</h1>
                  <p className={styles.textoBienvenida}>
                    Bienvenido a tu panel de control
                  </p>
                </div>
              </div>

              {/* Información detallada del último acceso */}
              <div className={styles.tarjetaAcceso}>
                <div className={styles.encabezadoAcceso}>
                  <h2 className={styles.tituloAcceso}>
                    Último Acceso Registrado
                  </h2>
                </div>

                {/* Lista de detalles del acceso */}
                <div className={styles.detallesAcceso}>
                  <div className={styles.elementoDetalle}>
                    <span className={styles.etiquetaDetalle}>
                      Ubicación de Acceso
                    </span>
                    <span className={styles.valorDetalle}>
                      Puerta Principal
                    </span>
                  </div>
                  <div className={styles.elementoDetalle}>
                    <span className={styles.etiquetaDetalle}>Fecha y Hora</span>
                    <span className={styles.valorDetalle}>
                      15 Jun 2025, 10:30 AM
                    </span>
                  </div>
                  <div className={styles.elementoDetalle}>
                    <span className={styles.etiquetaDetalle}>
                      Estado del Acceso
                    </span>
                    <span
                      className={`${styles.valorDetalle} ${styles.estadoExitoso}`}
                    >
                      <span className={styles.puntoEstado}></span>
                      Acceso Permitido
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de control visual */}
            <div className={styles.visualPrincipal}>
              <div className={styles.panelControl}>
                {/* Patrón de fondo decorativo */}
                <div className={styles.patronTecnologico}></div>

                {/* Encabezado del panel */}
                <div className={styles.encabezadoPanel}>
                  <h3 className={styles.tituloPanel}>Panel de Control</h3>
                  <p className={styles.subtituloPanel}>Gestiona tu acceso</p>
                </div>

                {/* Contenedor del candado */}
                <div className={styles.contenedorCandado}>
                  <div className={styles.imagenCandado} onClick={toggleCandado}>
                    <img
                      src={candado}
                      alt="Candado de seguridad"
                      className={styles.candadoImagen}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>

                {/* Botones de acción principales */}
                <div className={styles.cuadriculaAcciones}>
                  <button
                    className={`${styles.botonAccion} ${styles.botonPrimario}`}
                  >
                    <span className={styles.iconoBoton}>
                      <IoCardOutline />
                    </span>
                    Mi Tarjeta de Acceso
                  </button>
                  <button
                    className={`${styles.botonAccion} ${styles.botonSecundario}`}
                  >
                    <span className={styles.iconoBoton}>
                      <LuHistory />
                    </span>
                    Ver Historial Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
