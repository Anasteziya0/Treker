import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import './components/TechnologyCard.css';
import './components/ProgressHeader.css';

function App() {
  // Создаем состояние для хранения массива технологий
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'planned'
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'planned'
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'planned'
    },
    {
      id: 4,
      title: 'React Hooks',
      description: 'Изучение всех основных хуков',
      status: 'planned'
    },
    {
      id: 5,
      title: 'React Router',
      description: 'Навигация в React приложениях',
      status: 'planned'
    },
    {
      id: 6,
      title: 'CSS Modules',
      description: 'Стилизация компонентов',
      status: 'planned'
    }
  ]);

  // Функция для обновления статуса технологии по id
  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для обработки изменения статуса в карточке
  const handleStatusChange = (id, currentStatus) => {
    // Определяем порядок смены статусов
    const statusFlow = {
      'planned': 'in-progress',
      'in-progress': 'completed',
      'completed': 'planned'
    };
    
    // Получаем следующий статус
    const nextStatus = statusFlow[currentStatus];
    
    // Вызываем функцию обновления статуса
    updateTechnologyStatus(id, nextStatus);
  };

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'planned' }))
    );
  };

  // Функция для отметки всех как завершенных
  const markAllAsCompleted = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для отметки всех как в процессе
  const markAllAsInProgress = () => {
    setTechnologies(techs => 
      techs.map(tech => ({ ...tech, status: 'in-progress' }))
    );
  };

  // Функция для добавления новой технологии
  const addNewTechnology = () => {
    const newId = technologies.length > 0 ? Math.max(...technologies.map(t => t.id)) + 1 : 1;
    const newTechnology = {
      id: newId,
      title: `Новая технология ${newId}`,
      description: 'Описание новой технологии',
      status: 'planned'
    };
    
    setTechnologies(prev => [...prev, newTechnology]);
  };

  // Рассчитываем статистику для отображения
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    planned: technologies.filter(t => t.status === 'planned').length
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Дорожная карта изучения технологий</h1>
        <p className="roadmap-subtitle">Отслеживайте прогресс изучения технологий</p>
      </header>

      <main className="main-content">
        <div className="roadmap-container">
          <ProgressHeader technologies={technologies} />
          
          <h2>Технологии для изучения</h2>
          
          {/* Информация о количестве карточек */}
          <div className="summary-info">
            <p>Всего: {stats.total} | Изучено: {stats.completed} | В процессе: {stats.inProgress} | Запланировано: {stats.planned}</p>
          </div>
          
          <div className="technologies-list">
            {technologies.map(tech => (
              <TechnologyCard
                key={tech.id}
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                // Передаем функцию изменения статуса в каждую карточку
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
          
          {/* Панель управления */}
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
            
            {/* Дополнительная информация */}
            <div className="instructions">
              <h3>Как пользоваться:</h3>
              <ul>
                <li>Кликните на любую карточку, чтобы изменить её статус</li>
                <li>Используйте кнопки управления для массовых действий</li>
                <li>Статусы меняются по кругу: Запланировано → В процессе → Изучено</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;