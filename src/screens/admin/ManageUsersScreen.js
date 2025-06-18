import React, { useState, useEffect } from 'react';
import NavigationMenu from '../../components/Navigation/NavigationMenu';
import styles from './ManageUsersScreen.module.css';
import globalstyles from '../../styles/globalStyles.module.css'
import {
  FaSave,
  FaPen ,
  FaTimes,
  FaSearch,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import { BiSolidTrash } from "react-icons/bi";


// Datos simulados de usuarios
const initialUsers = [
  { id: 1, nombre: 'Pedro Sanchez', materia: 'Español', fecha: '2025-04-06', edificio: 'B' },
  { id: 2, nombre: 'María González', materia: 'Matemáticas', fecha: '2025-04-05', edificio: 'A' },
  { id: 3, nombre: 'Carlos López', materia: 'Historia', fecha: '2025-04-04', edificio: 'C' },
  { id: 4, nombre: 'Ana Martínez', materia: 'Ciencias', fecha: '2025-04-03', edificio: 'D' },
  { id: 5, nombre: 'Luis Rodríguez', materia: 'Inglés', fecha: '2025-04-02', edificio: 'E' },
  { id: 6, nombre: 'Carmen Díaz', materia: 'Arte', fecha: '2025-04-01', edificio: 'A' },
  { id: 7, nombre: 'Roberto Silva', materia: 'Educación Física', fecha: '2025-03-31', edificio: 'B' },
  { id: 8, nombre: 'Elena Torres', materia: 'Química', fecha: '2025-03-30', edificio: 'C' }
];

export default function ManageUsersScreen() {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    materia: '',
    fecha: new Date().toISOString().split('T')[0],
    edificio: 'A'
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fecha.includes(searchTerm)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(prev =>
        prev.map(user => (user.id === editingUser.id ? { ...user, ...formData } : user))
      );
      setIsEditing(false);
      setEditingUser(null);
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers(prev => [newUser, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      materia: user.materia,
      fecha: user.fecha,
      edificio: user.edificio
    });
    setEditingUser(user);
    setIsEditing(true);
    
    // Hacer scroll hacia arriba de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      materia: '',
      fecha: new Date().toISOString().split('T')[0],
      edificio: 'A'
    });
    setIsEditing(false);
    setEditingUser(null);
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
              placeholder="Buscar por nombre o fecha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className={styles.searchIcon}><FaSearch /></span>
          </div>

          {/* Formulario */}
          <div className={styles.formContainer}>
            <input
              type="text"
              name="nombre"
              className={styles.input}
              placeholder="Nombre completo"
              value={formData.nombre}
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
            <div className={styles.actions}>
              <button onClick={handleSubmit} className={styles.saveButton}>
                {isEditing ? <><FaPen  style={{ marginRight: '6px' }} /> Actualizar</> : <><FaSave style={{ marginRight: '6px' }} /> Guardar</>}
              </button>
              {isEditing && (
                <button type="button" className={styles.cancelButton} onClick={resetForm}>
                  <FaTimes style={{ marginRight: '6px' }} /> Cancelar
                </button>
              )}
            </div>
          </div>

          {/* Grid de usuarios responsivo */}
          <div className={styles.usersGrid}>
            {currentUsers.map(user => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userInfo}>
                  <h3 className={styles.userName}>{user.nombre}</h3>
                  <div className={styles.userDetails}>
                    <p>Fecha: {formatDate(user.fecha)}</p>
                    <p>Materia: {user.materia}</p>
                    <p>Edificio: {user.edificio}</p>
                  </div>
                </div>
                <div className={styles.userActions}>
                  <button className={styles.editButton} onClick={() => handleEdit(user)}>
                    <FaPen  />
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                    <BiSolidTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nueva navegación de páginas */}
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
    </div>
  );
}