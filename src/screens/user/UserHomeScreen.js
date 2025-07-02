import React, { useState } from "react";
import NavigationMenu from "../../components/Navigation/NavigationMenu";
import { LuHistory } from "react-icons/lu";
import userfoto2 from "../../assets/icons/userfoto2.png";
import { IoCardOutline } from "react-icons/io5";
import { GiDoorHandle } from "react-icons/gi";
import globalstyles from "../../styles/globalStyles.module.css";
import candado from "../../assets/logos/candado.png";
import styles from "./UserHomeScreen.module.css";

export default function UserHomeScreen() {
  // Datos del usuario actualizados
  const userProfile = {
    name: 'Juan Pérez',
    role: 'Usuario',
    email: 'juan.perez@ejemplo.com',
    lastAccess: '25/06/2025 - 08:10 AM',
    foto: userfoto2
  };

  // Datos de accesos recientes
  const mockAccessData = [
    {
      id: 1,
      location: 'Puerta Principal',
      date: '15 Jun 2025',
      time: '10:30 AM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 2,
      location: 'Puerta Secundaria',
      date: '15 Jun 2025',
      time: '09:15 AM',
      status: 'failed',
      icon: <GiDoorHandle />
    },
    {
      id: 3,
      location: 'Puerta Principal',
      date: '14 Jun 2025',
      time: '04:45 PM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 4,
      location: 'Puerta Principal',
      date: '14 Jun 2025',
      time: '08:30 AM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 5,
      location: 'Puerta Secundaria',
      date: '13 Jun 2025',
      time: '06:20 PM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 6,
      location: 'Puerta Principal',
      date: '13 Jun 2025',
      time: '11:15 AM',
      status: 'failed',
      icon: <GiDoorHandle />
    },
    {
      id: 7,
      location: 'Puerta Secundaria',
      date: '12 Jun 2025',
      time: '03:30 PM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 8,
      location: 'Puerta Principal',
      date: '12 Jun 2025',
      time: '07:45 AM',
      status: 'failed',
      icon: <GiDoorHandle />
    },
    {
      id: 9,
      location: 'Puerta Secundaria',
      date: '11 Jun 2025',
      time: '02:20 PM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 10,
      location: 'Puerta Principal',
      date: '11 Jun 2025',
      time: '09:10 AM',
      status: 'success',
      icon: <GiDoorHandle />
    },
    {
      id: 11,
      location: 'Puerta Principal',
      date: '10 Jun 2025',
      time: '05:45 PM',
      status: 'failed',
      icon: <GiDoorHandle />
    },
    {
      id: 12,
      location: 'Puerta Secundaria',
      date: '10 Jun 2025',
      time: '08:15 AM',
      status: 'success',
      icon: <GiDoorHandle />
    }
  ];

  // Estados para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState(null);
  
  // Obtener solo los 2 accesos más recientes
  const recentAccesses = mockAccessData.slice(0, 2);

  // Calcular estadísticas
  const totalAllowed = mockAccessData.filter(log => log.status === 'success').length;
  const totalDenied = mockAccessData.filter(log => log.status === 'failed').length;
  const totalAccesses = mockAccessData.length;

  const toggleCandado = () => {
    console.log("Candado clickeado");
  };

  const handleShowDetails = (access) => {
    setSelectedAccess(access);
    setModalVisible(true);
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
                    src={userProfile.foto}
                    alt={`${userProfile.name} - usuario`}
                  />
                </div>
                <div className={styles.informacionPerfil}>
                  <h1>¡Hola, {userProfile.name}!</h1>
                  <div className={styles.detallesUsuario}>
                    <p>Bienvenido a tu panel de control</p>
                    <p className={styles.textoBienvenida}>{userProfile.email}</p>
                    <p className={styles.textoBienvenida}>Último acceso: {userProfile.lastAccess}</p>
                  </div>
                </div>
              </div>

             

             
              {/* Sección de accesos recientes */}
              <div className={styles.accesosRecientes}>
                <div className={styles.encabezadoAccesos}>
                  <h2 className={styles.tituloAccesos}>Accesos Recientes</h2>
                </div>
                
                {/* Lista de accesos - solo los 2 más recientes */}
                <div className={styles.listaAccesos}>
                  {recentAccesses.map((access) => (
                    <div key={access.id} className={styles.itemAcceso}>
                      <div className={styles.iconoAccesoItem}>
                        {access.icon}
                      </div>
                      <div className={styles.infoAcceso}>
                        <h3 className={styles.nombreAcceso}>{access.location}</h3>
                        <p className={styles.fechaAcceso}>{access.date}</p>
                        <p className={styles.horaAcceso}>{access.time}</p>
                      </div>
                      <div className={styles.estadoAcceso}>
                        <span className={`${styles.estadoBadge} ${access.status === 'success' ? styles.estadoExito : styles.estadoError}`}>
                          {access.status === 'success' ? 'Permitido' : 'Denegado'}
                        </span>
                        <button 
                          className={styles.botonDetalles}
                          onClick={() => handleShowDetails(access)}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))}
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
              </div>
               {/* Panel de estadísticas */}
               <div className={styles.estadisticasPanel}>
                <h2 className={styles.tituloEstadisticas}>Resumen de Accesos</h2>
                <div className={styles.estadisticasGrid}>
                  <div className={styles.estadisticaItem}>
                    <div className={styles.estadisticaIcono} style={{background: 'linear-gradient(135deg, #4CAF50, #66BB6A)'}}>
                      <GiDoorHandle />
                    </div>
                    <div className={styles.estadisticaTexto}>
                      <span className={styles.estadisticaNumero} style={{color: '#4CAF50'}}>{totalAllowed}</span>
                      <span className={styles.estadisticaLabel}>Permitidos</span>
                    </div>
                  </div>
                  
                  <div className={styles.estadisticaItem}>
                    <div className={styles.estadisticaIcono} style={{background: 'linear-gradient(135deg, #F44336, #E57373)'}}>
                      <GiDoorHandle />
                    </div>
                    <div className={styles.estadisticaTexto}>
                      <span className={styles.estadisticaNumero} style={{color: '#F44336'}}>{totalDenied}</span>
                      <span className={styles.estadisticaLabel}>Denegados</span>
                    </div>
                  </div>
                  
                  <div className={styles.estadisticaItem}>
                    <div className={styles.estadisticaIcono} style={{background: 'linear-gradient(135deg, var(--color-cobre-acento), var(--color-dorado-acento))'}}>
                      <GiDoorHandle />
                    </div>
                    <div className={styles.estadisticaTexto}>
                      <span className={styles.estadisticaNumero} style={{color: 'var(--color-cobre-acento)'}}>{totalAccesses}</span>
                      <span className={styles.estadisticaLabel}>Total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal para detalles del acceso */}
      {modalVisible && (
        <div className={styles.modalOverlay} onClick={() => setModalVisible(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseButton}
              onClick={() => setModalVisible(false)}
            >
              ×
            </button>
            
            {selectedAccess && (
              <div className={styles.modalBody}>
                <div className={styles.modalIcono}>
                  <GiDoorHandle />
                </div>
                <h3 className={styles.modalTitulo}>{selectedAccess.location}</h3>
                
                <div className={styles.modalDetalles}>
                  <div className={styles.modalDetalle}>
                    <span className={styles.modalEtiqueta}>Fecha:</span>
                    <span className={styles.modalValor}>{selectedAccess.date}</span>
                  </div>
                  <div className={styles.modalDetalle}>
                    <span className={styles.modalEtiqueta}>Hora:</span>
                    <span className={styles.modalValor}>{selectedAccess.time}</span>
                  </div>
                  <div className={styles.modalDetalle}>
                    <span className={styles.modalEtiqueta}>Estado:</span>
                    <span className={`${styles.modalValor} ${selectedAccess.status === 'success' ? styles.modalExito : styles.modalError}`}>
                      {selectedAccess.status === 'success' ? 'Acceso Permitido' : 'Acceso Denegado'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}