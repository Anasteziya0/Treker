// hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 2, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 3, 
    title: 'React Hooks', 
    description: 'Изучение всех основных хуков', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 4, 
    title: 'Express.js', 
    description: 'Создание REST API', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 5, 
    title: 'React Router', 
    description: 'Навигация в React приложениях', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 6, 
    title: 'MongoDB', 
    description: 'Работа с NoSQL базой данных', 
    status: 'not-started',
    notes: '',
    category: 'database'
  },
  { 
    id: 7, 
    title: 'Redux Toolkit', 
    description: 'Управление состоянием приложения', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 8, 
    title: 'Docker', 
    description: 'Контейнеризация приложений', 
    status: 'not-started',
    notes: '',
    category: 'devops'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  // Функция для обновления статуса технологии
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  // Функция для отметки всех как выполненных
  const markAllCompleted = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Функция для добавления новой технологии
  const addTechnology = (title, description, category = 'other') => {
    const newId = technologies.length > 0 ? Math.max(...technologies.map(t => t.id)) + 1 : 1;
    const newTech = {
      id: newId,
      title,
      description,
      status: 'not-started',
      notes: '',
      category
    };
    setTechnologies(prev => [...prev, newTech]);
  };

  // Функция для удаления технологии
  const removeTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  };

  // Функция для получения технологий по категории
  const getTechnologiesByCategory = (category) => {
    return technologies.filter(tech => tech.category === category);
  };

  // Функция для получения статистики
  const getStats = () => {
    return {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length
    };
  };

  // Функция для экспорта данных
  const exportData = () => {
    const data = {
      technologies: technologies,
      exportedAt: new Date().toISOString(),
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      progress: calculateProgress()
    };
    return JSON.stringify(data, null, 2);
  };

  // Функция для импорта данных
  const importData = (importedData) => {
    try {
      const parsedData = JSON.parse(importedData);
      if (parsedData.technologies && Array.isArray(parsedData.technologies)) {
        setTechnologies(parsedData.technologies);
        return true;
      }
    } catch (error) {
      console.error('Ошибка при импорте данных:', error);
    }
    return false;
  };

  // Функция для поиска технологий
  const searchTechnologies = (query) => {
    return technologies.filter(tech => 
      tech.title.toLowerCase().includes(query.toLowerCase()) || 
      tech.description.toLowerCase().includes(query.toLowerCase()) ||
      tech.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Функция для получения следующего статуса
  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    return statusFlow[currentStatus] || 'not-started';
  };

  // Функция для получения текста статуса
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
      default:
        return 'Не начато';
    }
  };

  // Функция для получения категорий
  const getCategories = () => {
    const categories = new Set(technologies.map(tech => tech.category));
    return Array.from(categories);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    addTechnology,
    removeTechnology,
    getTechnologiesByCategory,
    getStats,
    exportData,
    importData,
    searchTechnologies,
    getNextStatus,
    getStatusText,
    getCategories,
    progress: calculateProgress()
  };
}

export default useTechnologies;