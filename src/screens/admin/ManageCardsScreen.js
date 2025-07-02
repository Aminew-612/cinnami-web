import React, { useState, useEffect } from 'react';
import NavigationMenu from '../../components/Navigation/NavigationMenu';
import styles from './ManageCardsScreen.module.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import globalstyles from '../../styles/globalStyles.module.css'

export default function ManageCardsScreen() {
  const [cards, setCards] = useState([
    { id: 1, code: 'A1B2C3', user: 'Juan Pérez', status: 'activa' },
    { id: 2, code: 'D4E5F6', user: 'María García', status: 'activa' },
    { id: 3, code: 'G7H8I9', user: 'Carlos López', status: 'bloqueada' },
    { id: 4, code: 'J1K2L3', user: 'Ana Martínez', status: 'activa' },
    { id: 5, code: 'M4N5O6', user: 'Luis Rodríguez', status: 'bloqueada' },
    { id: 6, code: 'P7Q8R9', user: 'Sofia Hernández', status: 'activa' },
    { id: 7, code: 'S1T2U3', user: 'Diego Torres', status: 'activa' },
    { id: 8, code: 'V4W5X6', user: 'Laura Jiménez', status: 'bloqueada' },
  ]);
  
  const [filteredCards, setFilteredCards] = useState(cards);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newCard, setNewCard] = useState({
    cardId: ''
  });

  const cardsPerPage = 6;
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    const filtered = cards.filter(card => 
      card.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  }, [searchTerm, cards]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCardStatus = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    const action = card.status === 'activa' ? 'bloquear' : 'desbloquear';
    
    if (window.confirm(`¿Está seguro de que desea ${action} la tarjeta ${card.code}?`)) {
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId 
            ? { ...card, status: card.status === 'activa' ? 'bloqueada' : 'activa' }
            : card
        )
      );
      alert(`Tarjeta ${card.code} ${card.status === 'activa' ? 'bloqueada' : 'desbloqueada'} exitosamente.`);
    }
  };

  const deleteCard = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    if (window.confirm(`¿Está seguro de que desea eliminar la tarjeta ${card.code}? Esta acción no se puede deshacer.`)) {
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      alert(`Tarjeta ${card.code} eliminada exitosamente.`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCard({ cardId: '' });
  };

  const saveCard = () => {
    if (!newCard.cardId.trim()) {
      alert('Por favor, ingrese el ID de la tarjeta.');
      return;
    }

    // Verificar si el ID de tarjeta ya existe
    const existingCard = cards.find(card => card.code === newCard.cardId);
    if (existingCard) {
      alert(`El ID de tarjeta ${newCard.cardId} ya está registrado.`);
      return;
    }

    const newId = Math.max(...cards.map(c => c.id)) + 1;
    const cardData = {
      id: newId,
      code: newCard.cardId,
      user: 'Sin asignar', // Usuario sin asignar por defecto
      status: 'activa' // Estado por defecto
    };

    setCards(prevCards => [...prevCards, cardData]);
    alert(`Tarjeta ${newCard.cardId} registrada exitosamente.`);
    closeModal();
  };

  const handleInputChange = (value) => {
    setNewCard({ cardId: value });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.containerPrincipal}>
      <NavigationMenu userType="admin" />
      
      <main className={styles.contenedorPrincipal}>
      <header className={globalstyles.header}>
          <h1 className={globalstyles.title}>Gestión de tarjetas</h1>
        </header>
        <div className={styles.barraHerramientas}>
          <div className={styles.campoBusqueda}>
            <input 
              type="text" 
              className={styles.inputBusqueda} 
              placeholder="Buscar tarjeta o usuario..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className={styles.iconoBusqueda}>🔍</span>
          </div>
          <button className={styles.botonRegistrar} onClick={openModal}>
            Registrar Nueva Tarjeta
          </button>
        </div>

        <div className={styles.cuadriculaTarjetas}>
          {currentCards.map(card => (
            <div key={card.id} className={styles.tarjetaUsuario}>
              <div className={styles.patronFondo}></div>
              <div className={styles.infoTarjeta}>
                <div className={styles.codigoTarjeta}>Tarjeta: {card.code}</div>
                <div className={styles.usuarioTarjeta}>Usuario: {card.user}</div>
                <span className={`${styles.estadoTarjeta} ${card.status === 'activa' ? styles.estadoActiva : styles.estadoBloqueada}`}>
                  Estado: {card.status === 'activa' ? 'Activa' : 'Bloqueada'}
                </span>
              </div>
              <div className={styles.botonesAccion}>
                <button 
                  className={`${styles.botonAccion} ${card.status === 'activa' ? styles.botonBloquear : styles.botonDesbloquear}`} 
                  onClick={() => toggleCardStatus(card.id)}
                >
                  {card.status === 'activa' ? 'Bloquear' : 'Desbloquear'}
                </button>
                <button 
                  className={`${styles.botonAccion} ${styles.botonEliminar}`} 
                  onClick={() => deleteCard(card.id)}
                >
                  Eliminar
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
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <IoIosArrowBack />
              Anterior
            </button>
            
            <div className={styles.pageIndicator}>
              Página {currentPage} de {totalPages}
            </div>
            
            <button 
              className={styles.paginationButton}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </main>

      {/* Modal para registrar nueva tarjeta */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContenido} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitulo}>Registrar Nueva Tarjeta</h2>
            
            <div className={styles.grupoCampo}>
              <label className={styles.etiquetaCampo}>ID de Tarjeta</label>
              <input 
                type="text" 
                className={styles.campoEntrada} 
                placeholder="Ej: A1B2C3"
                value={newCard.cardId}
                onChange={(e) => handleInputChange(e.target.value)}
                maxLength={10}
              />
            </div>

            <div className={styles.botonesModal}>
              <button className={styles.botonCancelar} onClick={closeModal}>
                Cancelar
              </button>
              <button className={styles.botonGuardar} onClick={saveCard}>
                Registrar Tarjeta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}