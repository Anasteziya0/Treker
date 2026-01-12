import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import TechnologySearch from '../components/TechnologySearch';
import BulkEditStatus from '../components/BulkEditStatus';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyList.css';

function TechnologyList() {
  const navigate = useNavigate();
  const { technologies, updateStatus, bulkUpdateStatus } = useTechnologies();
  const [filter, setFilter] = useState('all');
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  const filteredTechnologies = technologies.filter(tech => {
    if (filter === 'all') return true;
    if (filter === 'completed') return tech.status === 'completed';
    if (filter === 'in-progress') return tech.status === 'in-progress';
    if (filter === 'planned') return tech.status === 'planned';
    if (filter === 'paused') return tech.status === 'paused';
    return true;
  });

  const handleSearch = (searchTerm) => {
    // Поиск уже обрабатывается в компоненте TechnologySearch
    console.log('Search term:', searchTerm);
  };

  const handleCardClick = (id) => {
    navigate(`/technology/${id}`);
  };

  const handleStatusUpdate = (id, status) => {
    updateStatus(id, status);
  };

  const handleBulkUpdate = (ids, status) => {
    bulkUpdateStatus(ids, status);
    setShowBulkEdit(false);
  };

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <p>Управляйте вашим прогрессом изучения технологий</p>
      </div>

      <div className="controls">
        <TechnologySearch onSearch={handleSearch} />
        
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Фильтр по статусу"
          >
            <option value="all">Все статусы</option>
            <option value="planned">Запланировано</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
            <option value="paused">Приостановлено</option>
          </select>
          
          <button 
            className="btn-bulk-edit"
            onClick={() => setShowBulkEdit(true)}
            aria-label="Открыть массовое редактирование статусов"
          >
            Массовое редактирование
          </button>
          
          <button 
            className="btn-add"
            onClick={() => navigate('/add-technology')}
            aria-label="Добавить новую технологию"
          >
            + Добавить технологию
          </button>
        </div>
      </div>

      <div className="technologies-grid">
        {filteredTechnologies.length === 0 ? (
          <div className="empty-state">
            <p>Нет технологий для отображения</p>
            <button 
              onClick={() => navigate('/add-technology')}
              className="btn-primary"
            >
              Добавить первую технологию
            </button>
          </div>
        ) : (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onClick={() => handleCardClick(tech.id)}
              onStatusUpdate={handleStatusUpdate}
            />
          ))
        )}
      </div>

      {showBulkEdit && (
        <BulkEditStatus
          technologies={technologies}
          onUpdateStatus={handleBulkUpdate}
          onClose={() => setShowBulkEdit(false)}
        />
      )}
    </div>
  );
}

export default TechnologyList;