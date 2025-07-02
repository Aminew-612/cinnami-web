import React, { useState, useEffect } from 'react';
import NavigationMenu from '../../components/Navigation/NavigationMenu';
import styles from './ManageUsersScreen.module.css';
import globalstyles from '../../styles/globalStyles.module.css'
import {
  FaSave,
  FaPen,
  FaTimes,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { BiSolidTrash } from "react-icons/bi";

// Datos simulados de usuarios - 10 usuarios
const initialUsers = [
  { 
    id: 1, 
    fullName: 'Pedro Sanchez', 
    materia: 'Español', 
    fecha: '2025-04-06', 
    edificio: 'B',
    username: 'psanchez',
    email: 'pedro.sanchez@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Pedro',
    surnames: 'Sanchez',
    uid: 'UID001'
  },
  { 
    id: 2, 
    fullName: 'María González', 
    materia: 'Matemáticas', 
    fecha: '2025-04-05', 
    edificio: 'A',
    username: 'mgonzalez',
    email: 'maria.gonzalez@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'María',
    surnames: 'González',
    uid: 'UID002'
  },
  { 
    id: 3, 
    fullName: 'Carlos López', 
    materia: 'Historia', 
    fecha: '2025-04-04', 
    edificio: 'C',
    username: 'clopez',
    email: 'carlos.lopez@escuela.edu',
    password: 'admin123',
    role: 'Admin',
    names: 'Carlos',
    surnames: 'López',
    uid: 'UID003'
  },
  { 
    id: 4, 
    fullName: 'Ana Martínez', 
    materia: 'Ciencias', 
    fecha: '2025-04-03', 
    edificio: 'D',
    username: 'amartinez',
    email: 'ana.martinez@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Ana',
    surnames: 'Martínez',
    uid: 'UID004'
  },
  { 
    id: 5, 
    fullName: 'José García', 
    materia: 'Física', 
    fecha: '2025-04-02', 
    edificio: 'E',
    username: 'jgarcia',
    email: 'jose.garcia@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'José',
    surnames: 'García',
    uid: 'UID005'
  },
  { 
    id: 6, 
    fullName: 'Laura Rodríguez', 
    materia: 'Química', 
    fecha: '2025-04-01', 
    edificio: 'A',
    username: 'lrodriguez',
    email: 'laura.rodriguez@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Laura',
    surnames: 'Rodríguez',
    uid: 'UID006'
  },
  { 
    id: 7, 
    fullName: 'Miguel Torres', 
    materia: 'Inglés', 
    fecha: '2025-03-31', 
    edificio: 'B',
    username: 'mtorres',
    email: 'miguel.torres@escuela.edu',
    password: 'admin123',
    role: 'Admin',
    names: 'Miguel',
    surnames: 'Torres',
    uid: 'UID007'
  },
  { 
    id: 8, 
    fullName: 'Carmen Díaz', 
    materia: 'Biología', 
    fecha: '2025-03-30', 
    edificio: 'C',
    username: 'cdiaz',
    email: 'carmen.diaz@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Carmen',
    surnames: 'Díaz',
    uid: 'UID008'
  },
  { 
    id: 9, 
    fullName: 'Roberto Herrera', 
    materia: 'Educación Física', 
    fecha: '2025-03-29', 
    edificio: 'D',
    username: 'rherrera',
    email: 'roberto.herrera@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Roberto',
    surnames: 'Herrera',
    uid: 'UID009'
  },
  { 
    id: 10, 
    fullName: 'Isabel Morales', 
    materia: 'Arte', 
    fecha: '2025-03-28', 
    edificio: 'E',
    username: 'imorales',
    email: 'isabel.morales@escuela.edu',
    password: 'password123',
    role: 'Docente',
    names: 'Isabel',
    surnames: 'Morales',
    uid: 'UID010'
  }
];

export default function ManageUsersScreen() {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    materia: '',
    fecha: new Date().toISOString().split('T')[0],
    edificio: 'A',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Docente',
    names: '',
    surnames: '',
    uid: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  const getUsersPerPage = () => {
    if (window.innerWidth >= 1400) return 9;
    if (window.innerWidth >= 1024) return 6;
    return 5;
  };

  const [usersPerPage, setUsersPerPage] = useState(getUsersPerPage());

  useEffect(() => {
    const handleResize = () => {
      setUsersPerPage(getUsersPerPage());
      setCurrentPage(1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fecha.includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdificioSelect = (edificio) => {
    setFormData(prev => ({ ...prev, edificio }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert('Por favor ingrese un nombre válido');
      return false;
    }
    if (!formData.username.trim()) {
      alert('Por favor ingrese un nombre de usuario');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Por favor ingrese un email válido');
      return false;
    }
    if (modalType === 'add' && formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    if (modalType === 'add' && !formData.password.trim()) {
      alert('Por favor ingrese una contraseña');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (modalType === 'edit') {
      setUsers(prev =>
        prev.map(user => (user.id === editingUser.id ? { ...user, ...formData } : user))
      );
    } else {
      const newUser = { 
        id: Date.now(), 
        ...formData
      };
      setUsers(prev => [newUser, ...prev]);
    }
    closeModal();
  };

  const openAddModal = () => {
    setModalType('add');
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setModalType('edit');
    setFormData({
      fullName: user.fullName,
      materia: user.materia,
      fecha: user.fecha,
      edificio: user.edificio,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      role: user.role,
      names: user.names,
      surnames: user.surnames,
      uid: user.uid
    });
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('add');
    setEditingUser(null);
    resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      materia: '',
      fecha: new Date().toISOString().split('T')[0],
      edificio: 'A',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Docente',
      names: '',
      surnames: '',
      uid: ''
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.container}>
        <NavigationMenu userType="admin" />
        <div className={styles.mainContent}>
          <header className={globalstyles.header}>
            <h1 className={globalstyles.title}>Administración de usuarios</h1>
          </header>

          <div className={styles.panel}>
            {/* Barra de búsqueda */}
            <div className={styles.searchBar}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Buscar por nombre, usuario, email o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className={styles.searchIcon}><FaSearch /></span>
            </div>

            {/* Botón para agregar usuario */}
            <div className={styles.addButtonContainer}>
              <button onClick={openAddModal} className={styles.addButton}>
                <FaPlus style={{ marginRight: '8px' }} />
                Agregar nuevo usuario
              </button>
            </div>

            {/* Grid de usuarios responsivo */}
            <div className={styles.usersGrid}>
              {currentUsers.map(user => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>
                      {user.fullName}
                    </h3>
                    <div className={styles.userDetails}>
                      <p>Fecha: {formatDate(user.fecha)}</p>
                      <p>Materia: {user.materia}</p>
                      <p>Usuario: {user.username}</p>
                      <p>Rol: <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase()]}`}>{user.role}</span></p>
                      <p>Edificio: {user.edificio}</p>
                    </div>
                  </div>
                  <div className={styles.userActions}>
                    <button 
                      className={styles.editButton} 
                      onClick={() => openEditModal(user)}
                      title="Editar"
                    >
                      <FaPen />
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(user.id)}
                      title="Eliminar"
                    >
                      <BiSolidTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navegación de páginas */}
            {totalPages > 1 && (
              <div className={styles.newPaginationContainer}>
                <button
                  className={styles.paginationButton}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft />
                  Anterior
                </button>
                
                <div className={styles.pageIndicator}>
                  Página {currentPage} de {totalPages}
                </div>
                
                <button
                  className={styles.paginationButton}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>
                {modalType === 'add' && 'Agregar nuevo usuario'}
                {modalType === 'edit' && 'Editar usuario'}
              </h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formColumn}>
                  <input
                    type="text"
                    name="fullName"
                    className={styles.input}
                    placeholder="Nombre completo"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="names"
                    className={styles.input}
                    placeholder="Nombre(s)"
                    value={formData.names}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="surnames"
                    className={styles.input}
                    placeholder="Apellido(s)"
                    value={formData.surnames}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="materia"
                    className={styles.input}
                    placeholder="Materia"
                    value={formData.materia}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="date"
                    name="fecha"
                    className={styles.input}
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formColumn}>
                  <input
                    type="text"
                    name="username"
                    className={styles.input}
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={styles.input}
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={modalType === 'add'}
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {modalType === 'add' && (
                    <div className={styles.passwordContainer}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={styles.input}
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    name="uid"
                    className={styles.input}
                    placeholder="UID de Tarjeta"
                    value={formData.uid}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Selector de rol */}
              <div className={styles.roleSelector}>
                <label className={styles.roleLabel}>Rol:</label>
                <div className={styles.roleButtons}>
                  {['Docente', 'Admin'].map(role => (
                    <button
                      key={role}
                      type="button"
                      className={`${styles.roleButton} ${formData.role === role ? styles.active : ''}`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de edificio */}
              <div className={styles.buildingSelector}>
                <label className={styles.buildingLabel}>Edificio:</label>
                <div className={styles.buildingButtons}>
                  {['A', 'B', 'C', 'D', 'E'].map(edificio => (
                    <button
                      key={edificio}
                      type="button"
                      className={`${styles.buildingButton} ${formData.edificio === edificio ? styles.active : ''}`}
                      onClick={() => handleEdificioSelect(edificio)}
                    >
                      {edificio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className={styles.modalActions}>
                {modalType === 'add' && (
                  <button type="submit" className={styles.saveButton}>
                    <FaSave style={{ marginRight: '6px' }} />
                    Guardar
                  </button>
                )}
                {modalType === 'edit' && (
                  <button type="submit" className={styles.updateButton}>
                    <FaPen style={{ marginRight: '6px' }} />
                    Actualizar
                  </button>
                )}
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                  <FaTimes style={{ marginRight: '6px' }} />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}