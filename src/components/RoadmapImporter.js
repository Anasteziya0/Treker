import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './RoadmapImporter.css';

function RoadmapImporter() {
  const { addTechnology } = useTechnologies();
  const [importing, setImporting] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [importResult, setImportResult] = useState(null);

  // Примеры API для дорожных карт
  const exampleRoadmaps = [
    {
      name: 'Frontend Roadmap',
      url: 'https://api.example.com/roadmaps/frontend',
      description: 'Современный стек фронтенд разработки'
    },
    {
      name: 'Backend Roadmap',
      url: 'https://api.example.com/roadmaps/backend',
      description: 'Технологии для серверной разработки'
    },
    {
      name: 'Fullstack Roadmap',
      url: 'https://api.example.com/roadmaps/fullstack',
      description: 'Полный стек веб-разработки'
    }
  ];

  // Mock данные для демонстрации (в реальном приложении загружаются с API)
  const mockRoadmapData = {
    frontend: [
      { 
        title: 'HTML5', 
        description: 'Семантическая разметка веб-страниц',
        category: 'frontend',
        difficulty: 'beginner'
      },
      { 
        title: 'CSS3', 
        description: 'Стилизация и анимации',
        category: 'frontend',
        difficulty: 'beginner'
      },
      { 
        title: 'JavaScript ES6+', 
        description: 'Современный JavaScript',
        category: 'frontend',
        difficulty: 'beginner'
      },
      { 
        title: 'React Hooks', 
        description: 'Современный React с хуками',
        category: 'frontend',
        difficulty: 'intermediate'
      },
      { 
        title: 'Next.js', 
        description: 'React фреймворк для продакшена',
        category: 'frontend',
        difficulty: 'intermediate'
      }
    ],
    backend: [
      { 
        title: 'Node.js', 
        description: 'Среда выполнения JavaScript',
        category: 'backend',
        difficulty: 'beginner'
      },
      { 
        title: 'Express.js', 
        description: 'Веб-фреймворк для Node.js',
        category: 'backend',
        difficulty: 'beginner'
      },
      { 
        title: 'REST API', 
        description: 'Проектирование RESTful API',
        category: 'backend',
        difficulty: 'intermediate'
      },
      { 
        title: 'PostgreSQL', 
        description: 'Реляционная база данных',
        category: 'database',
        difficulty: 'intermediate'
      }
    ]
  };

  const handleImportRoadmap = async (roadmapType) => {
    try {
      setImporting(true);
      setImportResult(null);

      // Имитация загрузки с API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const technologies = mockRoadmapData[roadmapType] || [];
      
      if (technologies.length === 0) {
        throw new Error('Дорожная карта не найдена');
      }

      // Добавляем каждую технологию
      let importedCount = 0;
      for (const tech of technologies) {
        addTechnology(tech.title, tech.description, tech.category, tech.difficulty);
        importedCount++;
      }

      setImportResult({
        success: true,
        message: `Успешно импортировано ${importedCount} технологий из "${roadmapType}" дорожной карты`,
        count: importedCount
      });

    } catch (err) {
      setImportResult({
        success: false,
        message: `Ошибка импорта: ${err.message}`
      });
      console.error('Ошибка импорта:', err);
    } finally {
      setImporting(false);
    }
  };

  const handleCustomImport = async () => {
    if (!apiUrl.trim()) {
      setImportResult({
        success: false,
        message: 'Введите URL API'
      });
      return;
    }

    try {
      setImporting(true);
      setImportResult(null);

      // В реальном приложении здесь будет fetch запрос
      // const response = await fetch(apiUrl);
      // const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock ответ от API
      const mockApiResponse = [
        { 
          title: 'GraphQL', 
          description: 'Язык запросов для API',
          category: 'backend',
          difficulty: 'intermediate'
        },
        { 
          title: 'Apollo Client', 
          description: 'Клиент для GraphQL',
          category: 'frontend',
          difficulty: 'intermediate'
        }
      ];

      let importedCount = 0;
      for (const tech of mockApiResponse) {
        addTechnology(tech.title, tech.description, tech.category, tech.difficulty);
        importedCount++;
      }

      setImportResult({
        success: true,
        message: `Импортировано ${importedCount} технологий из API`,
        count: importedCount
      });

    } catch (err) {
      setImportResult({
        success: false,
        message: `Ошибка при запросе к API: ${err.message}`
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <div className="importer-header">
        <h3>🚀 Импорт дорожных карт из API</h3>
        <p className="importer-subtitle">
          Загрузите готовые наборы технологий для изучения
        </p>
      </div>

      <div className="example-roadmaps">
        <h4>Примеры дорожных карт:</h4>
        <div className="roadmap-cards">
          {exampleRoadmaps.map((roadmap, index) => (
            <div key={index} className="roadmap-card">
              <div className="roadmap-info">
                <h5>{roadmap.name}</h5>
                <p>{roadmap.description}</p>
              </div>
              <button
                onClick={() => handleImportRoadmap(roadmap.name.toLowerCase().split(' ')[0])}
                disabled={importing}
                className="import-btn"
              >
                {importing ? 'Импорт...' : 'Импортировать'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="custom-import">
        <h4>Кастомный импорт из API:</h4>
        <div className="import-form">
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Введите URL API с дорожной картой..."
            className="api-input"
            disabled={importing}
          />
          <button
            onClick={handleCustomImport}
            disabled={importing || !apiUrl.trim()}
            className="custom-import-btn"
          >
            {importing ? 'Загрузка...' : 'Импортировать'}
          </button>
        </div>
        <p className="api-hint">
          💡 В реальном приложении здесь будет подключение к реальному API. 
          Сейчас используется имитация с задержкой.
        </p>
      </div>

      {importResult && (
        <div className={`import-result ${importResult.success ? 'success' : 'error'}`}>
          <div className="result-icon">
            {importResult.success ? '✅' : '❌'}
          </div>
          <div className="result-content">
            <p className="result-message">{importResult.message}</p>
            {importResult.success && importResult.count && (
              <p className="result-count">
                Добавлено технологий: <strong>{importResult.count}</strong>
              </p>
            )}
          </div>
          <button
            onClick={() => setImportResult(null)}
            className="close-result"
          >
            ×
          </button>
        </div>
      )}

      <div className="importer-info">
        <div className="info-box">
          <h5>Как это работает:</h5>
          <ul>
            <li>1. Выбираете готовую дорожную карту</li>
            <li>2. Данные загружаются из API (имитация)</li>
            <li>3. Технологии добавляются в ваш трекер</li>
            <li>4. Можно редактировать прогресс для каждой технологии</li>
          </ul>
        </div>
        <div className="info-box">
          <h5>Публичные API для практики:</h5>
          <ul>
            <li><a href="https://github.com/public-api-lists/public-api-lists" target="_blank" rel="noopener noreferrer">Public API Lists</a></li>
            <li><a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a></li>
            <li><a href="https://dummyjson.com/" target="_blank" rel="noopener noreferrer">DummyJSON</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoadmapImporter;