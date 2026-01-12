import { useState, useEffect, useCallback, useRef } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Более полные mock данные для API
  const fetchTechnologies = useCallback(async (searchQuery = '') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockApiResponse = [
        { 
          id: 1, 
          title: 'React', 
          description: 'Библиотека для создания UI', 
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev', 'https://ru.reactjs.org']
        },
        { 
          id: 2, 
          title: 'TypeScript', 
          description: 'Типизированный JavaScript', 
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org']
        },
        { 
          id: 3, 
          title: 'Node.js', 
          description: 'Среда выполнения JavaScript', 
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org']
        },
        { 
          id: 4, 
          title: 'Next.js', 
          description: 'React фреймворк для продакшена', 
          category: 'frontend',
          difficulty: 'intermediate',
          resources: ['https://nextjs.org']
        },
        { 
          id: 5, 
          title: 'Express.js', 
          description: 'Веб-фреймворк для Node.js', 
          category: 'backend',
          difficulty: 'beginner',
          resources: ['https://expressjs.com']
        },
        { 
          id: 6, 
          title: 'MongoDB', 
          description: 'NoSQL база данных', 
          category: 'database',
          difficulty: 'intermediate',
          resources: ['https://www.mongodb.com']
        },
        { 
          id: 7, 
          title: 'Docker', 
          description: 'Контейнеризация приложений', 
          category: 'devops',
          difficulty: 'advanced',
          resources: ['https://www.docker.com']
        },
        { 
          id: 8, 
          title: 'GraphQL', 
          description: 'Язык запросов для API', 
          category: 'backend',
          difficulty: 'advanced',
          resources: ['https://graphql.org']
        }
      ];

      // Фильтрация по поисковому запросу
      let filtered = mockApiResponse;
      if (searchQuery.trim()) {
        filtered = mockApiResponse.filter(tech => 
          tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tech.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setTechnologies(filtered);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Ошибка при загрузке данных: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTechnologies = useCallback(async (searchQuery) => {
    await fetchTechnologies(searchQuery);
  }, [fetchTechnologies]);

  const getTechnologyDetails = useCallback(async (id) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockDetails = {
        1: {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev', 'https://ru.reactjs.org'],
          documentation: 'https://react.dev/learn',
          tutorials: ['https://scrimba.com/learn/learnreact']
        },
        2: {
          id: 2,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org'],
          documentation: 'https://www.typescriptlang.org/docs/',
          tutorials: ['https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html']
        }
      };

      return mockDetails[id] || null;
    } catch (err) {
      console.error('Ошибка при загрузке деталей:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchTechnologies]);

  const refetch = useCallback(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  return {
    technologies,
    loading,
    error,
    searchTechnologies,
    getTechnologyDetails,
    refetch
  };
}

export default useTechnologiesApi;