// components/ProgressHeader.jsx
import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies = [] }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const planned = technologies.filter(tech => tech.status === 'not-started').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      {/* Статистика вверху */}
      <div className="stats-row">
        <div className="stat">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Всего</div>
        </div>
        
        <div className="stat">
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat">
          <div className="stat-number">{inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat">
          <div className="stat-number">{planned}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>
      
      {/* Прогресс-бар */}
      <div className="progress-section">
        <div className="progress-info">
          <h3>Прогресс изучения</h3>
          <div className="percentage-display">
            <span className="percentage-number">{completionPercentage}%</span>
            <span className="percentage-text">выполнено</span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          >
            <span className="progress-text">{completionPercentage}%</span>
          </div>
        </div>
      </div>
      
      {/* Детальная статистика по процентам */}
      <div className="detailed-stats">
        <div className="stats-grid">
          <div className="stat-detail completed">
            <div className="detail-header">
              <span className="detail-title">Изучено</span>
              <span className="detail-count">{completed}</span>
            </div>
            <div className="detail-percentage">
              {total > 0 ? Math.round((completed / total) * 100) : 0}%
            </div>
          </div>
          
          <div className="stat-detail in-progress">
            <div className="detail-header">
              <span className="detail-title">В процессе</span>
              <span className="detail-count">{inProgress}</span>
            </div>
            <div className="detail-percentage">
              {total > 0 ? Math.round((inProgress / total) * 100) : 0}%
            </div>
          </div>
          
          <div className="stat-detail planned">
            <div className="detail-header">
              <span className="detail-title">Не начато</span>
              <span className="detail-count">{planned}</span>
            </div>
            <div className="detail-percentage">
              {total > 0 ? Math.round((planned / total) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;