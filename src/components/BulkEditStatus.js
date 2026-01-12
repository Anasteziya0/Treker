import { useState } from 'react';
import './BulkEditStatus.css';

function BulkEditStatus({ technologies, onUpdateStatus, onClose }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState('planned');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectAll = () => {
    if (selectedIds.length === technologies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(technologies.map(tech => tech.id));
    }
  };

  const handleSelectTechnology = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(techId => techId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Имитация задержки для визуальной обратной связи
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Применяем изменения ко всем выбранным технологиям
    selectedIds.forEach(id => {
      onUpdateStatus(id, newStatus);
    });
    
    setIsSubmitting(false);
    onClose();
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

  return (
    <div 
      className="bulk-edit-modal" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="bulk-edit-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="bulk-edit-title">Массовое редактирование статусов</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Закрыть окно редактирования"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bulk-edit-form">
          {/* область для скринридера */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {isSubmitting && 'Обновление статусов...'}
          </div>

          <div className="form-section">
            <label htmlFor="status-select">Новый статус для выбранных технологий:</label>
            <select
              id="status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              aria-describedby="status-help"
              disabled={isSubmitting}
            >
              <option value="planned">Запланировано</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
              <option value="paused">Приостановлено</option>
            </select>
            <p id="status-help" className="help-text">
              Этот статус будет применен ко всем выбранным технологиям
            </p>
          </div>

          <div className="form-section">
            <div className="select-controls">
              <button
                type="button"
                onClick={handleSelectAll}
                className="select-all-btn"
                aria-label={selectedIds.length === technologies.length ? 'Снять выделение со всех технологий' : 'Выбрать все технологии'}
                disabled={isSubmitting}
              >
                {selectedIds.length === technologies.length ? 'Снять выделение' : 'Выбрать все'}
              </button>
              <span className="selection-count">
                Выбрано: {selectedIds.length} из {technologies.length}
              </span>
            </div>

            <div 
              className="technologies-list" 
              role="listbox" 
              aria-label="Список технологий для выбора"
              aria-multiselectable="true"
            >
              {technologies.map(tech => (
                <div 
                  key={tech.id} 
                  className="technology-checkbox"
                  role="option"
                  aria-selected={selectedIds.includes(tech.id)}
                >
                  <input
                    type="checkbox"
                    id={`tech-${tech.id}`}
                    checked={selectedIds.includes(tech.id)}
                    onChange={() => handleSelectTechnology(tech.id)}
                    aria-labelledby={`tech-label-${tech.id}`}
                    disabled={isSubmitting}
                  />
                  <label 
                    id={`tech-label-${tech.id}`} 
                    htmlFor={`tech-${tech.id}`}
                    className={selectedIds.includes(tech.id) ? 'selected' : ''}
                  >
                    <span className="tech-title">{tech.title}</span>
                    <span 
                      className="tech-status"
                      data-status={tech.status}
                    >
                      {getStatusText(tech.status)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || selectedIds.length === 0}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Обновление...' : `Применить к ${selectedIds.length} технологиям`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BulkEditStatus;