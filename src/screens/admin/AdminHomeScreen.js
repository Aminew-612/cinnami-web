import React, { useState } from "react";
import NavigationMenu from "../../components/Navigation/NavigationMenu";
import styles from "./AdminHomeScreen.module.css";
import userfoto from "../../assets/icons/userfoto.png";


const AdminHomeScreen = () => {
  const [alertaVisible, setAlertaVisible] = useState(true);

  const cerrarAlerta = () => {
    setAlertaVisible(false);
  };

  const verHistorial = () => {
    alert("Navegando al historial completo...");
  };

  const accesosRecientes = [
    {
      nombre: "Juan Pérez",
      codigo: "A1B2C3",
      iniciales: "JP",
      ubicacion: "Principal",
      tiempo: "10:30 AM • 15 Jun 2023",
    },
    {
      nombre: "María García",
      codigo: "X4Y5Z6",
      iniciales: "MG",
      ubicacion: "Secundaria",
      tiempo: "11:45 AM • 15 Jun 2023",
    },
  ];

  return (
    <div className={styles.containerPrincipal}>
      {/* Menú de navegación */}
      <NavigationMenu userType="admin" />

      {/* Dashboard principal */}
      <div className={styles.dashboardContainer}>
        <main className={styles.contenedorDashboard}>
          {/* Alerta de puerta abierta */}
          {alertaVisible && (
            <div className={styles.alertaPuerta}>
              <span className={styles.textoAlerta}>
                La puerta ha estado abierta por más de 15 minutos
              </span>
              <button
                className={styles.botonCerrarAlerta}
                onClick={cerrarAlerta}
              >
                ×
              </button>
            </div>
          )}

          {/* Perfil personalizado del usuario */}
          <div className={styles.perfilUsuario}>
            <div className={styles.avatarPerfil}>
              <img
                className={styles.avatarPerfil}
                src={userfoto}
                alt="usuario"
              />
            </div>
            <div className={styles.informacionPerfil}>
              <div className={styles.encabezadoPerfil}>
                <h1>¡Hola, Javier Vazquez!</h1>
                <span className={styles.badgeAdministrador}>ADMINISTRADOR</span>
              </div>
              <p className={styles.textoBienvenida}>
                Bienvenido a tu panel de control
              </p>
            </div>
          </div>

          {/* Grid principal */}
          <div className={styles.gridDashboard}>
            {/* Contenedor unificado para tarjetas de personas y estado */}
            <div className={styles.contenedorTarjetasUnificado}>
              {/* Tarjeta de personas ingresadas */}
              <div className={styles.tarjetaPersonas}>
                <h2 className={styles.tituloPersonas}>Personas ingresadas</h2>
                <span className={styles.numeroPersonas}>1245</span>
                <span className={styles.etiquetaPersonas}>
                  Total de accesos
                </span>
              </div>

              {/* Tarjeta de estado de puerta */}
              <div className={styles.tarjetaEstado}>
                <h2 className={styles.tituloEstado}>Estado de puerta</h2>
                <span className={styles.estadoPuerta}>Abierta</span>
                <span className={styles.etiquetaEstado}>Estado actual</span>
              </div>
            </div>

            {/* Tarjeta de accesos recientes */}
            <div className={styles.tarjetaAccesos}>
              <div className={styles.encabezadoAccesos}>
                <h2 className={styles.tituloAccesos}>
                  Registro de accesos recientes
                </h2>
              </div>

              <div className={styles.listaAccesos}>
                {accesosRecientes.map((acceso, index) => (
                  <div key={index} className={styles.itemAcceso}>
                    <div className={styles.avatarAcceso}>
                      <img
                        className={styles.avatarUsers}
                        src={userfoto}
                        alt="usuario"
                      />
                    </div>
                    <div className={styles.infoAcceso}>
                      <div className={styles.nombreAcceso}>{acceso.nombre}</div>
                      <div className={styles.codigoAcceso}>
                        ({acceso.codigo})
                      </div>
                    </div>
                    <div className={styles.detallesAcceso}>
                      <div className={styles.ubicacionAcceso}>
                        {acceso.ubicacion}
                      </div>
                      <div className={styles.tiempoAcceso}>{acceso.tiempo}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className={styles.botonHistorial} onClick={verHistorial}>
                Ver historial completo
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
