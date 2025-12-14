// components/TechnologyCard.jsx
import React, { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ 
  technology,
  isSelected, 
  onStatusChange, 
  onSelect 
}) {
  // Деструктуризация без id, так как он не используется
  const { title, description, status } = technology;
  const [isChanging, setIsChanging] = useState(false);
  
  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
      default:
        return 'Не начато';
    }
  };
  
  const getNextStatusText = () => {
    const statusFlow = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    
    const nextStatus = statusFlow[status];
    switch (nextStatus) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return 'Не начато';
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsChanging(true);
    
    if (onStatusChange) {
      onStatusChange();
    }
    
    setTimeout(() => setIsChanging(false), 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div 
      className={`technology-card ${status} ${isSelected ? 'selected' : ''} ${isChanging ? 'status-changing' : ''}`}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-section">
        <div className="card-content">
          <h3>{title} {isSelected && '📝'}</h3>
          <p className="description">{description}</p>
          <div className="tech-category">
            {technology.category}
          </div>
        </div>
        <div className="status-info">
          <button
            className={`status-badge ${status}`}
            onClick={handleStatusClick}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleStatusClick(e);
              }
            }}
            title={`Нажмите, чтобы изменить статус на: ${getNextStatusText()}`}
            style={{
              cursor: 'pointer',
              border: 'none',
              font: 'inherit'
            }}
            tabIndex={-1}
          >
            {getStatusText()}
            <span className="click-hint">(клик)</span>
          </button>
        </div>
      </div>
      
      <div className="next-status-hint">
        {isSelected ? ' Редактирование заметок' : `Нажмите для заметок | Следующий статус: ${getNextStatusText()}`}
      </div>
    </div>
  );
}

export default TechnologyCard;