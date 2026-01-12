import { useState, useEffect } from 'react';

const initialTechnologies = [
  { 
    id: 1, 
    title: 'React', 
    description: 'Библиотека для создания пользовательских интерфейсов', 
    status: 'completed',
    notes: 'Изучил основные хуки и компоненты',
    category: 'frontend',
    difficulty: 'beginner',
    resources: ['https://react.dev', 'https://ru.reactjs.org'],
    progress: 100,
    startedAt: '2024-01-15',
    completedAt: '2024-02-20',
    createdAt: '2024-01-10'
  },
  { 
    id: 2, 
    title: 'Node.js', 
    description: 'Среда выполнения JavaScript на стороне сервера', 
    status: 'in-progress',
    notes: 'Осваиваю Express.js и MongoDB',
    category: 'backend',
    difficulty: 'intermediate',
    resources: ['https://nodejs.org', 'https://expressjs.com'],
    progress: 70,
    startedAt: '2024-02-01',
    completedAt: '',
    createdAt: '2024-01-20'
  },
  { 
    id: 3, 
    title: 'TypeScript', 
    description: 'Типизированное надмножество JavaScript', 
    status: 'in-progress',
    notes: 'Изучаю generics и utility types',
    category: 'language',
    difficulty: 'intermediate',
    resources: ['https://www.typescriptlang.org'],
    progress: 60,
    startedAt: '2024-02-10',
    completedAt: '',
    createdAt: '2024-01-25'
  },
  { 
    id: 4, 
    title: 'MongoDB', 
    description: 'Документоориентированная NoSQL база данных', 
    status: 'planned',
    notes: 'Планирую изучить агрегации',
    category: 'database',
    difficulty: 'intermediate',
    resources: ['https://www.mongodb.com'],
    progress: 0,
    startedAt: '',
    completedAt: '',
    createdAt: '2024-02-01'
  },
  { 
    id: 5, 
    title: 'Docker', 
    description: 'Платформа для контейнеризации приложений', 
    status: 'paused',
    notes: 'Временно приостановил изучение',
    category: 'devops',
    difficulty: 'advanced',
    resources: ['https://www.docker.com'],
    progress: 30,
    startedAt: '2024-01-05',
    completedAt: '',
    createdAt: '2023-12-15'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useState(() => {
    try {
      const saved = localStorage.getItem('technologies');
      return saved ? JSON.parse(saved) : initialTechnologies;
    } catch (error) {
      console.error('Error loading technologies from localStorage:', error);
      return initialTechnologies;
    }
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies));
    } catch (error) {
      console.error('Error saving technologies to localStorage:', error);
    }
  }, [technologies]);

  const updateStatus = (id, status) => {
    setTechnologies(prev => prev.map(tech => {
      if (tech.id === id) {
        let updatedTech = { ...tech, status };
        
        // Если статус меняется на "completed", устанавливаем прогресс 100%
        if (status === 'completed') {
          updatedTech = { 
            ...updatedTech, 
            progress: 100, 
            completedAt: new Date().toISOString().split('T')[0] 
          };
        }
        
        // Если статус меняется с "completed" на другой, сбрасываем completedAt
        if (tech.status === 'completed' && status !== 'completed') {
          updatedTech = { ...updatedTech, completedAt: '' };
        }
        
        // Если статус меняется на "in-progress" и не было startedAt
        if (status === 'in-progress' && !tech.startedAt) {
          updatedTech = { ...updatedTech, startedAt: new Date().toISOString().split('T')[0] };
        }
        
        return updatedTech;
      }
      return tech;
    }));
  };

  const updateNotes = (id, notes) => {
    setTechnologies(prev => prev.map(tech => 
      tech.id === id ? { ...tech, notes } : tech
    ));
  };

  const updateProgress = (id, progress) => {
    setTechnologies(prev => prev.map(tech => {
      if (tech.id === id) {
        const updatedTech = { ...tech, progress };
        
        // Если прогресс достиг 100%, меняем статус на completed
        if (progress === 100) {
          updatedTech.status = 'completed';
          updatedTech.completedAt = new Date().toISOString().split('T')[0];
        }
        // Если прогресс больше 0, но меньше 100, и статус planned - меняем на in-progress
        else if (progress > 0 && progress < 100 && tech.status === 'planned') {
          updatedTech.status = 'in-progress';
          if (!tech.startedAt) {
            updatedTech.startedAt = new Date().toISOString().split('T')[0];
          }
        }
        
        return updatedTech;
      }
      return tech;
    }));
  };

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(tech => ({
      ...tech,
      status: 'completed',
      progress: 100,
      completedAt: tech.completedAt || new Date().toISOString().split('T')[0]
    })));
  };

  const resetAllStatuses = () => {
    setTechnologies(prev => prev.map(tech => ({
      ...tech,
      status: 'planned',
      progress: 0,
      startedAt: '',
      completedAt: ''
    })));
  };

  const addTechnology = (technology) => {
    const newTechnology = {
      ...technology,
      id: Date.now(),
      status: 'planned',
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTechnologies(prev => [...prev, newTechnology]);
  };

  const removeTechnology = (id) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== id));
  };

  const getTechnologiesByCategory = (category) => {
    return technologies.filter(tech => tech.category === category);
  };

  const getTechnologiesByStatus = (status) => {
    return technologies.filter(tech => tech.status === status);
  };

  const getStats = () => {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const planned = technologies.filter(tech => tech.status === 'planned').length;
    const paused = technologies.filter(tech => tech.status === 'paused').length;
    
    const totalProgress = technologies.reduce((sum, tech) => sum + tech.progress, 0) / total;
    
    return {
      total,
      completed,
      inProgress,
      planned,
      paused,
      totalProgress: Math.round(totalProgress) || 0
    };
  };

  const exportData = () => {
    return JSON.stringify(technologies, null, 2);
  };

  const importData = (data) => {
    try {
      const imported = JSON.parse(data);
      if (Array.isArray(imported)) {
        setTechnologies(imported);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const searchTechnologies = (searchTerm) => {
    if (!searchTerm.trim()) return technologies;
    
    const term = searchTerm.toLowerCase();
    return technologies.filter(tech => 
      tech.title.toLowerCase().includes(term) ||
      tech.description.toLowerCase().includes(term) ||
      tech.category.toLowerCase().includes(term)
    );
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'planned': 'in-progress',
      'in-progress': 'completed',
      'completed': 'paused',
      'paused': 'planned'
    };
    return statusFlow[currentStatus] || 'planned';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'planned': 'Запланировано',
      'in-progress': 'В процессе',
      'completed': 'Завершено',
      'paused': 'Приостановлено'
    };
    return statusMap[status] || status;
  };

  const getCategories = () => {
    const categories = technologies.map(tech => tech.category);
    return [...new Set(categories)];
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const totalProgress = technologies.reduce((sum, tech) => sum + tech.progress, 0);
    return Math.round(totalProgress / technologies.length);
  };

  // Новые методы для массового редактирования
  const bulkUpdateStatus = (technologyIds, newStatus) => {
    setTechnologies(prev => prev.map(tech => {
      if (technologyIds.includes(tech.id)) {
        let updatedTech = { ...tech, status: newStatus };
        
        // Если статус меняется на "completed", устанавливаем прогресс 100%
        if (newStatus === 'completed') {
          updatedTech = { ...updatedTech, progress: 100, completedAt: new Date().toISOString().split('T')[0] };
        }
        
        // Если статус меняется с "completed" на другой, сбрасываем completedAt
        if (tech.status === 'completed' && newStatus !== 'completed') {
          updatedTech = { ...updatedTech, completedAt: '' };
        }
        
        // Если статус меняется на "in-progress" и не было startedAt
        if (newStatus === 'in-progress' && !tech.startedAt) {
          updatedTech = { ...updatedTech, startedAt: new Date().toISOString().split('T')[0] };
        }
        
        return updatedTech;
      }
      return tech;
    }));
  };

  // Метод для импорта технологий
  const importTechnologies = (importedTechnologies) => {
    setTechnologies(prev => {
      // Создаем новый массив, объединяя существующие и импортированные
      const existingIds = new Set(prev.map(tech => tech.id));
      const newTechnologies = importedTechnologies.map(tech => {
        // Если у импортированной технологии уже есть ID, который существует, генерируем новый
        if (existingIds.has(tech.id)) {
          return { ...tech, id: Date.now() + Math.random() };
        }
        return tech;
      });
      
      return [...prev, ...newTechnologies];
    });
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    updateProgress,
    markAllCompleted,
    resetAllStatuses,
    addTechnology,
    removeTechnology,
    getTechnologiesByCategory,
    getTechnologiesByStatus,
    getStats,
    exportData,
    importData,
    searchTechnologies,
    getNextStatus,
    getStatusText,
    getCategories,
    progress: calculateProgress(),
    // Новые методы:
    bulkUpdateStatus,
    importTechnologies
  };
}

export default useTechnologies;