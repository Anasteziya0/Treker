// App.js
import React, { useState } from 'react';
import './App.css';
import useTechnologies from './hooks/useTechnologies';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';
import TechnologyNotes from './components/TechnologyNotes';

function App() {
  const { technologies, updateStatus, updateNotes, progress } = useTechnologies();
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => 
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTech = (id) => {
    setSelectedTechId(selectedTechId === id ? null : id);
  };

  const handleStatusChange = (id, currentStatus) => {
    const statusFlow = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    const nextStatus = statusFlow[currentStatus];
    updateStatus(id, nextStatus);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Дорожная карта изучения технологий</h1>
        <p className="roadmap-subtitle">Отслеживайте прогресс изучения технологий</p>
      </header>

      <main className="main-content">
        <div className="roadmap-container">
          {/* Общий прогресс */}
          <div className="progress-summary">
            <div className="progress-info">
              <h2>Общий прогресс</h2>
              <div className="progress-display">
                <span className="progress-number">{progress}%</span>
                <div className="progress-bar-large">
                  <div 
                    className="progress-fill-large"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* Поиск */}
          <div className="search-section">
            <h3>Поиск технологий...</h3>
            <input
              type="text"
              placeholder="Введите название технологии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-results">
              Найдено: <strong>{filteredTechnologies.length}</strong> из {technologies.length}
            </div>
            {searchQuery && (
              <button onClick={clearSearch} className="clear-search-btn">
                Очистить поиск
              </button>
            )}
          </div>

          <hr className="divider" />

          {/* Используем ProgressHeader для статистики */}
          <ProgressHeader technologies={filteredTechnologies} />

          {/* Список технологий */}
          <div className="technologies-list">
            {filteredTechnologies.length > 0 ? (
              filteredTechnologies.map(tech => (
                <div key={tech.id} className="technology-item">
                  <TechnologyCard
                    technology={tech}
                    isSelected={selectedTechId === tech.id}
                    onStatusChange={() => handleStatusChange(tech.id, tech.status)}
                    onSelect={() => handleSelectTech(tech.id)}
                  />
                  
                  {selectedTechId === tech.id && (
                    <TechnologyNotes
                      technology={tech}
                      onNotesChange={(newNotes) => updateNotes(tech.id, newNotes)}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Не найдено технологий по вашему запросу</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;