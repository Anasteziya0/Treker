import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import RoadmapImporter from '../components/RoadmapImporter';
import './Home.css';

function Home() {
  const { getStats, technologies } = useTechnologies();
  const stats = getStats();

  // Получаем последние 3 добавленные технологии
  const recentTechnologies = [...technologies]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🚀 Трекер технологий</h1>
        <p className="hero-subtitle">
          Отслеживайте прогресс изучения технологий и достигайте целей!
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{stats.notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>

      <RoadmapImporter />

      {recentTechnologies.length > 0 && (
        <div className="recent-technologies">
          <div className="section-header">
            <h2>Недавно добавленные технологии</h2>
            <Link to="/technologies" className="view-all-link">
              Показать все →
            </Link>
          </div>
          <div className="recent-grid">
            {recentTechnologies.map(tech => (
              <div key={tech.id} className="recent-card">
                <h3>{tech.title}</h3>
                <p className="tech-description">{tech.description}</p>
                <div className="tech-meta">
                  <span className={`status-badge ${tech.status}`}>
                    {tech.status === 'completed' ? 'Изучено' : 
                     tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
                  </span>
                  <span className="category-badge">{tech.category}</span>
                </div>
                <Link to={`/technology/${tech.id}`} className="tech-link">
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <Link to="/add-technology" className="quick-action-btn">
          ➕ Добавить технологию
        </Link>
        <Link to="/technologies" className="quick-action-btn">
          📚 Все технологии
        </Link>
        <Link to="/statistics" className="quick-action-btn">
          📊 Статистика
        </Link>
        <Link to="/settings" className="quick-action-btn">
          ⚙️ Настройки
        </Link>
      </div>
    </div>
  );
}

export default Home;