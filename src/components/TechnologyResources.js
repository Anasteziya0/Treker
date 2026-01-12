import { useState, useEffect, useCallback } from 'react';
import './TechnologyResources.css';

function TechnologyResources({ technologyId, technologyTitle, technologyCategory }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const apiResources = {
        'react': [
          { 
            id: 1, 
            title: 'Официальная документация React', 
            url: 'https://react.dev', 
            type: 'documentation',
            rating: 5,
            description: 'Полная официальная документация на английском'
          },
          { 
            id: 2, 
            title: 'React на русском', 
            url: 'https://ru.reactjs.org', 
            type: 'translation',
            rating: 4,
            description: 'Перевод документации на русский язык'
          },
          { 
            id: 3, 
            title: 'React Видео-курс', 
            url: 'https://www.youtube.com/watch?v=GNrdg3PzpJQ', 
            type: 'video',
            rating: 5,
            description: 'Бесплатный курс от freeCodeCamp'
          }
        ],
        'node.js': [
          { 
            id: 1, 
            title: 'Официальный сайт Node.js', 
            url: 'https://nodejs.org', 
            type: 'documentation',
            rating: 5,
            description: 'Документация и загрузка'
          },
          { 
            id: 2, 
            title: 'Node.js Руководство', 
            url: 'https://nodejsdev.ru', 
            type: 'guide',
            rating: 4,
            description: 'Русскоязычное руководство'
          }
        ],
        'typescript': [
          { 
            id: 1, 
            title: 'TypeScript Handbook', 
            url: 'https://www.typescriptlang.org/docs', 
            type: 'documentation',
            rating: 5,
            description: 'Официальное руководство'
          },
          { 
            id: 2, 
            title: 'TypeScript за 5 минут', 
            url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html', 
            type: 'tutorial',
            rating: 4,
            description: 'Быстрый старт'
          }
        ]
      };

      const techKey = technologyTitle.toLowerCase();
      const techResources = apiResources[techKey] || [
        {
          id: 1,
          title: `Ресурсы по ${technologyTitle}`,
          url: `https://google.com/search?q=${encodeURIComponent(technologyTitle + ' tutorial')}`,
          type: 'search',
          rating: 3,
          description: 'Поиск учебных материалов'
        },
        {
          id: 2,
          title: `${technologyTitle} на MDN`,
          url: `https://developer.mozilla.org/search?q=${encodeURIComponent(technologyTitle)}`,
          type: 'documentation',
          rating: 4,
          description: 'Документация на MDN Web Docs'
        }
      ];

      setResources(techResources);
    } catch (err) {
      setError('Не удалось загрузить ресурсы. Проверьте соединение.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [technologyTitle]);

  useEffect(() => {
    if (expanded && resources.length === 0) {
      fetchResources();
    }
  }, [expanded, resources.length, fetchResources]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleRefresh = () => {
    fetchResources();
  };

  const handleResourceClick = (url) => {
    console.log('Resource clicked:', url);
    window.open(url, '_blank');
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'documentation': return '📚';
      case 'video': return '🎬';
      case 'tutorial': return '📝';
      case 'guide': return '🗺️';
      case 'translation': return '🌐';
      case 'search': return '🔍';
      default: return '📖';
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="technology-resources">
      <button 
        className="resources-toggle"
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <span className="toggle-icon">{expanded ? '▼' : '▶'}</span>
        <span className="toggle-text">
          {expanded ? 'Скрыть ресурсы' : 'Показать ресурсы для изучения'}
        </span>
        <span className="toggle-count">
          {resources.length > 0 && `(${resources.length})`}
        </span>
      </button>

      {expanded && (
        <div className="resources-content">
          <div className="resources-header">
            <h4>Ресурсы для изучения {technologyTitle}</h4>
            <div className="resources-actions">
              <button 
                onClick={handleRefresh}
                className="refresh-button"
                disabled={loading}
                title="Обновить ресурсы"
              >
                {loading ? '🔄' : '↻'}
              </button>
              <span className="api-status">
                {loading ? 'Загрузка с API...' : 'Данные из API'}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="resources-loading">
              <div className="loading-spinner"></div>
              <p>Загружаем ресурсы из API...</p>
            </div>
          ) : error ? (
            <div className="resources-error">
              <p>{error}</p>
              <button onClick={fetchResources}>Повторить загрузку</button>
            </div>
          ) : (
            <>
              <div className="resources-list">
                {resources.map(resource => (
                  <div 
                    key={resource.id} 
                    className="resource-item"
                    onClick={() => handleResourceClick(resource.url)}
                  >
                    <div className="resource-header">
                      <span className="resource-icon">
                        {getTypeIcon(resource.type)}
                      </span>
                      <span className="resource-title">{resource.title}</span>
                      <span className="resource-rating">
                        {getRatingStars(resource.rating)}
                      </span>
                    </div>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-footer">
                      <span className="resource-type">{resource.type}</span>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Перейти →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="resources-info">
                <p className="api-info">
                  <strong>Информация от API:</strong> Ресурсы загружены для категории "{technologyCategory}".
                  Данные обновляются автоматически при каждом открытии.
                </p>
                <button 
                  className="suggest-resource-btn"
                  onClick={() => alert('Форма для предложения ресурса откроется здесь')}
                >
                  + Предложить свой ресурс
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyResources;