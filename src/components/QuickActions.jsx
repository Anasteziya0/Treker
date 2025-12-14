// components/QuickActions.jsx
import React from 'react';
import './QuickActions.css';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAllStatuses, 
  onExportData,
  disabled = false 
}) {
  const handleExport = () => {
    if (onExportData) {
      const data = localStorage.getItem('technologies');
      if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'technologies_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <div className="quick-actions">
      <h3 className="actions-title">Быстрые действия</h3>
      <p className="actions-subtitle">Управление всеми технологиями</p>
      
      <div className="actions-grid">
        <button
          className="action-btn action-complete"
          onClick={onMarkAllCompleted}
          disabled={disabled}
          title="Отметить все технологии как выполненные"
        >
          <span className="action-icon">✅</span>
          <span className="action-text">Отметить все как выполненные</span>
        </button>
        
        <button
          className="action-btn action-reset"
          onClick={onResetAllStatuses}
          disabled={disabled}
          title="Сбросить статусы всех технологий"
        >
          <span className="action-icon">🔄</span>
          <span className="action-text">Сбросить все статусы</span>
        </button>
        
        <button
          className="action-btn action-export"
          onClick={handleExport}
          disabled={disabled}
          title="Экспортировать данные в JSON файл"
        >
          <span className="action-icon">📤</span>
          <span className="action-text">Экспорт данных</span>
        </button>
      </div>
      
      <div className="actions-info">
        <p>💡 Используйте эти действия для быстрого управления всеми технологиями</p>
      </div>
    </div>
  );
}

export default QuickActions;