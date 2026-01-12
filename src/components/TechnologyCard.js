import { useState } from 'react';
import './TechnologyCard.css';
// Убираем неиспользуемый импорт
// import TechnologyResources from './TechnologyResources';

function TechnologyCard({ technology, onClick, onStatusUpdate }) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(technology.notes);
  
  // Убираем неиспользуемую переменную
  // const updateProgress = (newProgress) => {
  //   if (onStatusUpdate) {
  //     // Можно добавить логику для обновления прогресса
  //     console.log('Update progress to:', newProgress);
  //   }
  // };

  const getStatusColor = (status) => {
    switch(status) {
      case 'planned': return '#f39c12';
      case 'in-progress': return '#3498db';
      case 'completed': return '#2ecc71';
      case 'paused': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'planned': return 'Запланировано';
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      case 'paused': return 'Приостановлено';
      default: return status;
    }
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    const nextStatus = getNextStatus(technology.status);
    if (onStatusUpdate) {
      onStatusUpdate(technology.id, nextStatus);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'planned': 'in-progress',
      'in-progress': 'completed',
      'completed': 'paused',
      'paused': 'planned'
    };
    return statusFlow[currentStatus] || 'planned';
  };

  const handleSaveNotes = (e) => {
    e.stopPropagation();
    if (onStatusUpdate) {
      // Здесь можно добавить логику для сохранения заметок
      console.log('Notes saved:', notes);
    }
    setShowNotes(false);
  };

  return (
    <div 
      className="technology-card" 
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label={`Карточка технологии ${technology.title}. Статус: ${getStatusText(technology.status)}. Прогресс: ${technology.progress}%. Нажмите для подробностей.`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-header">
        <h3>{technology.title}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(technology.status) }}
          onClick={handleStatusClick}
          role="button"
          tabIndex="0"
          aria-label={`Текущий статус: ${getStatusText(technology.status)}. Нажмите для изменения статуса.`}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStatusClick(e);
            }
          }}
        >
          {getStatusText(technology.status)}
        </span>
      </div>
      
      <p className="description">{technology.description}</p>
      
      <div className="card-meta">
        <span className="category">{technology.category}</span>
        <span className="difficulty">Сложность: {technology.difficulty}</span>
      </div>
      
      <div className="progress-section">
        <div className="progress-label">
          <span>Прогресс:</span>
          <span>{technology.progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${technology.progress}%`,
              backgroundColor: getStatusColor(technology.status)
            }}
            aria-valuenow={technology.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
          />
        </div>
      </div>
      
      <div className="card-footer">
        <div className="dates">
          {technology.startedAt && (
            <span>Начало: {technology.startedAt}</span>
          )}
          {technology.completedAt && (
            <span>Завершено: {technology.completedAt}</span>
          )}
        </div>
        
        <button 
          className="btn-notes"
          onClick={(e) => {
            e.stopPropagation();
            setShowNotes(!showNotes);
          }}
          aria-label={showNotes ? "Скрыть заметки" : "Показать заметки"}
          aria-expanded={showNotes}
        >
          {showNotes ? 'Скрыть заметки' : 'Показать заметки'}
        </button>
      </div>
      
      {showNotes && (
        <div className="notes-section">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Добавьте заметки по изучению..."
            onClick={(e) => e.stopPropagation()}
            aria-label="Поле для заметок"
          />
          <button 
            className="btn-save"
            onClick={handleSaveNotes}
            aria-label="Сохранить заметки"
          >
            Сохранить
          </button>
        </div>
      )}
      
      {technology.resources && technology.resources.length > 0 && (
        <div className="resources-section">
          <p className="resources-label">Ресурсы:</p>
          <ul>
            {technology.resources.slice(0, 2).map((resource, index) => (
              <li key={index}>
                <a 
                  href={resource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ресурс ${index + 1} для изучения ${technology.title}`}
                >
                  {resource.length > 40 ? resource.substring(0, 40) + '...' : resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;