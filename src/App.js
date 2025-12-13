// App.js
import React from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import './components/TechnologyCard.css';
import './components/ProgressHeader.css';

function App() {
  const technologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов, props и жизненного цикла', status: 'completed' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX и его отличий от HTML', status: 'in-progress' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов через useState и useReducer', status: 'planned' },
    { id: 4, title: 'React Hooks', description: 'Изучение всех основных хуков: useEffect, useContext, useMemo', status: 'in-progress' },
    { id: 5, title: 'React Router', description: 'Навигация в React-приложениях с использованием React Router v6', status: 'planned' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Дорожная карта React</h1>
        <p className="roadmap-subtitle">Отслеживание прогресса изучения</p>
      </header>

      <main className="main-content">
        <div className="roadmap-container">
          <ProgressHeader technologies={technologies} />
          
          <h2>Технологии для изучения</h2>
          
          <div className="technologies-list">
            {technologies.map(tech => (
              <TechnologyCard
                key={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;