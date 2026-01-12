import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, removeTechnology } = useTechnologies();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(id));
    setTechnology(tech);
  }, [id, technologies]);

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(id), newStatus);
    setTechnology(prev => ({ ...prev, status: newStatus }));
  };

  const handleDelete = () => {
    if (window.confirm('Удалить эту технологию?')) {
      removeTechnology(parseInt(id));
      navigate('/technologies');
    }
  };

  if (!technology) {
    return (
      <div className="technology-detail-page not-found">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {id} не существует.</p>
        <Link to="/technologies" className="btn btn-primary">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'not-started': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="technology-detail-page">
      <div className="detail-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <div className="header-actions">
          <button onClick={handleDelete} className="btn btn-danger">
            Удалить
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <h1 className="detail-title">{technology.title}</h1>
          
          <div className="detail-meta">
            <span className="category-badge">{technology.category}</span>
            <span className="difficulty-badge">{technology.difficulty}</span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(technology.status) }}
            >
              {technology.status === 'completed' ? 'Изучено' : 
               technology.status === 'in-progress' ? 'В процессе' : 'Не начато'}
            </span>
          </div>

          <div className="detail-section">
            <h3>Описание</h3>
            <p className="description">{technology.description}</p>
          </div>

          {technology.notes && (
            <div className="detail-section">
              <h3>Мои заметки</h3>
              <div className="notes-box">
                <p>{technology.notes}</p>
              </div>
            </div>
          )}

          <div className="detail-section">
            <h3>Ресурсы для изучения</h3>
            <div className="resources-list">
              {technology.resources && technology.resources.length > 0 ? (
                technology.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    📚 Ресурс {index + 1}
                  </a>
                ))
              ) : (
                <p className="no-resources">Ресурсы не добавлены</p>
              )}
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="status-controls">
            <h3>Статус изучения</h3>
            <div className="status-buttons">
              <button
                onClick={() => handleStatusChange('not-started')}
                className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
                style={{ backgroundColor: '#F44336' }}
              >
                Не начато
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
                style={{ backgroundColor: '#FF9800' }}
              >
                В процессе
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
                style={{ backgroundColor: '#4CAF50' }}
              >
                Завершено
              </button>
            </div>
          </div>

          <div className="progress-section">
            <h3>Прогресс</h3>
            <div className="progress-display">
              <div className="progress-value">{technology.progress}%</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${technology.progress}%`,
                    backgroundColor: getStatusColor(technology.status)
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="dates-info">
            <h3>Даты</h3>
            <div className="dates-list">
              {technology.createdAt && (
                <div className="date-item">
                  <span className="date-label">Добавлено:</span>
                  <span className="date-value">{technology.createdAt}</span>
                </div>
              )}
              {technology.startedAt && (
                <div className="date-item">
                  <span className="date-label">Начало изучения:</span>
                  <span className="date-value">{technology.startedAt}</span>
                </div>
              )}
              {technology.completedAt && (
                <div className="date-item">
                  <span className="date-label">Завершение:</span>
                  <span className="date-value">{technology.completedAt}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;