import React, { useState } from 'react';
import styles from './LoginScreen.module.css';
import logoCinnami from '../assets/logos/CINNAMILOGO.png'
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";


export default function LoginScreen({ setRole, navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Usuarios locales para testing
  const localUsers = {
    'admin@cinnami.com': { password: 'admin123', role: 'admin' },
    'empleado@cinnami.com': { password: 'empleado123', role: 'user' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = localUsers[email];
    if (user && user.password === password) {
      setRole(user.role);
      if (navigate) {
        navigate(user.role === 'admin' ? '/admin' : '/user');
      }
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
   
      <div className={styles.body}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.contenidoHeader}>
          <div>
            <div className={styles.infoEmpresa}>CINNAMI</div>
            <div className={styles.infoContacto}>Smart solutions for a connected world</div>
          </div>
          <div className={styles.infoContacto}>
            contacto@cinnami.com | (618) 456-7890
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className={styles.contenidoPrincipal}>
        <div className={styles.contenedorLogin}>
          {/* Logo y marca principal */}
          <div className={styles.seccionLogoPrincipal}>
            <div className={styles.logoPrincipal}> <img
            className={styles.logoPrincipal}
            src={logoCinnami}
            alt="Logo de CINNAMI"
          /></div>
            <div className={styles.textoMarcaPrincipal}>
              <div className={styles.nombreMarcaPrincipal}>CINNAMI</div>
              <div className={styles.lemaMarcaPrincipal}>Sistema de Control de Acceso</div>
            </div>
          </div>

          {/* Tarjeta de login */}
          <div className={styles.tarjetaLogin}>
            <h1 className={styles.tituloLogin}>control de acceso</h1>
            
            <form className={styles.formularioLogin} onSubmit={handleSubmit}>
              {/* Campo de correo electrónico */}
              <div className={styles.campoInput}>
                <span className={styles.iconoInput}><CiMail /></span>
                <input 
                  type="email" 
                  className={styles.inputLogin}
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Campo de contraseña */}
              <div className={styles.campoInput}>
                <span className={styles.iconoInput}><IoLockClosedOutline /></span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className={styles.inputLogin}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className={styles.togglePassword}
                  onClick={togglePassword}
                >
                  {showPassword ? <LuEyeOff /> : <MdOutlineRemoveRedEye />}
                </button>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              {/* Botón de login */}
              <button 
                type="submit"
                className={styles.botonLogin}
              >
                Iniciar Sesión
              </button>
            </form>

            {/* Enlace de contraseña olvidada */}
            <div className={styles.enlaceOlvido}>
              <a href="#forgot-password" className={styles.enlaceOlvidoA}>¿Olvidaste tu contraseña?</a>
            </div>

            {/* Usuarios de prueba */}
            <div className={styles.usuariosPrueba}>
              <h3 className={styles.usuariosPruebaH3}>Usuarios de prueba:</h3>
              <p className={styles.usuariosPruebaP}><strong>Admin:</strong> admin@cinnami.com / admin123</p>
              <p className={styles.usuariosPruebaP}><strong>Empleado:</strong> empleado@cinnami.com / empleado123</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}