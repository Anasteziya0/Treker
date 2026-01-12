import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StatisticsPage.css';

function StatisticsPage() {
  const [stats, setStats] = useState({
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    completionRate: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const techArray = JSON.parse(saved);
      
      const total = techArray.length;
      const notStarted = techArray.filter(t => t.status === 'not-started').length;
      const inProgress = techArray.filter(t => t.status === 'in-progress').length;
      const completed = techArray.filter(t => t.status === 'completed').length;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      setStats({
        total,
        notStarted,
        inProgress,
        completed,
        completionRate
      });
    }
  }, []);

  const ProgressBar = ({ value, label, color }) => (
    <div className="progress-item">
      <div className="progress-label">{label}</div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${value}%`,
            backgroundColor: color
          }}
        >
          <span className="progress-value">{value}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>📊 Статистика прогресса</h1>
        <Link to="/technologies" className="btn btn-secondary">
          ← Назад к технологиям
        </Link>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Всего технологий</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        
        <div className="stat-card">
          <h3>Не начато</h3>
          <div className="stat-number not-started">{stats.notStarted}</div>
        </div>
        
        <div className="stat-card">
          <h3>В процессе</h3>
          <div className="stat-number in-progress">{stats.inProgress}</div>
        </div>
        
        <div className="stat-card">
          <h3>Завершено</h3>
          <div className="stat-number completed">{stats.completed}</div>
        </div>
      </div>

      <div className="progress-section">
        <h2>Общий прогресс изучения</h2>
        <ProgressBar 
          value={stats.completionRate} 
          label="Завершено" 
          color="#4CAF50"
        />
        
        <h3>Распределение по статусам</h3>
        <div className="distribution-chart">
          {stats.total > 0 ? (
            <div className="chart-bars">
              <div 
                className="chart-bar not-started-bar"
                style={{ width: `${(stats.notStarted / stats.total) * 100}%` }}
                title={`Не начато: ${stats.notStarted}`}
              >
                <span className="bar-label">Не начато ({stats.notStarted})</span>
              </div>
              <div 
                className="chart-bar in-progress-bar"
                style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                title={`В процессе: ${stats.inProgress}`}
              >
                <span className="bar-label">В процессе ({stats.inProgress})</span>
              </div>
              <div 
                className="chart-bar completed-bar"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                title={`Завершено: ${stats.completed}`}
              >
                <span className="bar-label">Завершено ({stats.completed})</span>
              </div>
            </div>
          ) : (
            <p className="no-data">Нет данных для отображения</p>
          )}
        </div>
      </div>

      {stats.total > 0 && (
        <div className="recommendations">
          <h2>Рекомендации</h2>
          <ul className="recommendations-list">
            {stats.notStarted > 0 && (
              <li>Начните изучение {stats.notStarted} технологий из списка "Не начато"</li>
            )}
            {stats.inProgress > 0 && (
              <li>Продолжите работу над {stats.inProgress} технологиями в процессе</li>
            )}
            {stats.completed === stats.total && stats.total > 0 && (
              <li>🎉 Поздравляем! Вы изучили все технологии!</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;