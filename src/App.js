import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import TechnologyNotes from './components/TechnologyNotes';
import './components/TechnologyCard.css';
import './components/ProgressHeader.css';
import './components/TechnologyNotes.css';

function App() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      console.log('Данные загружены из localStorage');
      return JSON.parse(saved);
    }
    
    return [
      {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'planned',
        notes: ''
      },
      {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'planned',
        notes: ''
      },
      {
        id: 3,
        title: 'State Management',
        description: 'Работа с состоянием компонентов',
        status: 'planned',
        notes: ''
      },
      {
        id: 4,
        title: 'React Hooks',
        description: 'Изучение всех основных хуков',
        status: 'planned',
        notes: ''
      },
      {
        id: 5,
        title: 'React Router',
        description: 'Навигация в React приложениях',
        status: 'planned',
        notes: ''
      },
      {
        id: 6,
        title: 'CSS Modules',
        description: 'Стилизация компонентов',
        status: 'planned',
        notes: ''
      }
    ];
  });

  const [selectedTechId, setSelectedTechId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  // Фильтрация технологий по поисковому запросу
  const filteredTechnologies = technologies.filter(tech => 
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const handleStatusChange = (id, currentStatus) => {
    const statusFlow = {
      'planned': 'in-progress',
      'in-progress': 'completed',
      'completed': 'planned'
    };
    
    const nextStatus = statusFlow[currentStatus];
    updateTechnologyStatus(id, nextStatus);
  };

  const handleSelectTech = (id) => {
    setSelectedTechId(selectedTechId === id ? null : id);
  };

  const resetAllStatuses = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'planned' }))
    );
  };

  const markAllAsCompleted = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const markAllAsInProgress = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'in-progress' }))
    );
  };

  const addNewTechnology = () => {
    const newId = technologies.length > 0 ? Math.max(...technologies.map(t => t.id)) + 1 : 1;
    const newTechnology = {
      id: newId,
      title: `Новая технология ${newId}`,
      description: 'Описание новой технологии',
      status: 'planned',
      notes: ''
    };
    
    setTechnologies(prev => [...prev, newTechnology]);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const completedCount = filteredTechnologies.filter(t => t.status === 'completed').length;
  const inProgressCount = filteredTechnologies.filter(t => t.status === 'in-progress').length;
  const plannedCount = filteredTechnologies.filter(t => t.status === 'planned').length;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Дорожная карта изучения технологий</h1>
        <p className="roadmap-subtitle">Отслеживайте прогресс изучения технологий</p>
      </header>

      <main className="main-content">
        <div className="roadmap-container">
          <ProgressHeader technologies={filteredTechnologies} />
          
          <h2>Технологии для изучения</h2>
          
          {/* Поле поиска */}
          <div className="search-container">
            <div className="search-box">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Поиск технологий по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn"
                    onClick={clearSearch}
                    title="Очистить поиск"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="search-stats">
                <span className="search-results">
                  Найдено: <strong>{filteredTechnologies.length}</strong> из {technologies.length}
                </span>
                {searchQuery && (
                  <span className="search-query">
                    По запросу: "{searchQuery}"
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="summary-info">
            <p>Всего: {filteredTechnologies.length} | 
               Изучено: {completedCount} | 
               В процессе: {inProgressCount} | 
               Запланировано: {plannedCount}
            </p>
          </div>
          
          <div className="technologies-list">
            {filteredTechnologies.length > 0 ? (
              filteredTechnologies.map(tech => (
                <div key={tech.id} className="technology-item">
                  <TechnologyCard
                    id={tech.id}
                    title={tech.title}
                    description={tech.description}
                    status={tech.status}
                    isSelected={selectedTechId === tech.id}
                    onStatusChange={handleStatusChange}
                    onSelect={handleSelectTech}
                  />
                  
                  {selectedTechId === tech.id && (
                    <TechnologyNotes
                      technology={tech}
                      onNotesChange={updateTechnologyNotes}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или 
                  <button 
                    className="clear-search-link"
                    onClick={clearSearch}
                  >
                    очистить поиск
                  </button>
                </p>
              </div>
            )}
          </div>
          
          <div className="controls">
            <div className="control-buttons">
              <button 
                className="control-btn reset-btn"
                onClick={resetAllStatuses}
              >
                Сбросить все статусы
              </button>
              
              <button 
                className="control-btn progress-btn"
                onClick={markAllAsInProgress}
              >
                Все в процессе
              </button>
              
              <button 
                className="control-btn complete-btn"
                onClick={markAllAsCompleted}
              >
                Все изучены
              </button>
              
              <button 
                className="control-btn add-btn"
                onClick={addNewTechnology}
              >
                + Добавить технологию
              </button>
            </div>
            
            <div className="instructions">
              <h3>Как пользоваться:</h3>
              <ul>
                <li>Используйте поле поиска для быстрого нахождения технологий</li>
                <li>Кликните на карточку технологии, чтобы открыть заметки</li>
                <li>Вводите заметки - они автоматически сохраняются</li>
                <li>Кликните на бейдж статуса, чтобы изменить статус</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;