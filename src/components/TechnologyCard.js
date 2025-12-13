import React, { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  isSelected, 
  onStatusChange, 
  onSelect 
}) {
  const [isChanging, setIsChanging] = useState(false);
  
  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'planned':
        return 'Запланировано';
      default:
        return 'Запланировано';
    }
  };
  
  const getNextStatusText = () => {
    const statusFlow = {
      'planned': 'in-progress',
      'in-progress': 'completed',
      'completed': 'planned'
    };
    
    const nextStatus = statusFlow[status];
    switch (nextStatus) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'planned':
        return 'Запланировано';
      default:
        return 'Запланировано';
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsChanging(true);
    
    if (onStatusChange) {
      onStatusChange(id, status);
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