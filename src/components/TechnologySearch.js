import { useState, useRef, useEffect } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import './TechnologySearch.css';

function TechnologySearch({ onSelectTechnology }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { technologies, loading, error, searchTechnologies } = useTechnologiesApi();
  const timeoutRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchTechnologies(debouncedQuery);
    }
  }, [debouncedQuery, searchTechnologies]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  const handleTechnologySelect = (tech) => {
    if (onSelectTechnology) {
      onSelectTechnology(tech);
      handleClearSearch();
    }
  };

  const handleAddNewTechnology = () => {
    if (searchQuery.trim() && onSelectTechnology) {
      const newTech = {
        id: Date.now(),
        title: searchQuery,
        description: 'Новая технология для изучения',
        status: 'not-started',
        category: 'other'
      };
      onSelectTechnology(newTech);
      handleClearSearch();
    }
  };

  return (
    <div className="technology-search-container" ref={searchContainerRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Поиск технологий (React, Node.js, TypeScript...)"
          className="search-input"
          autoComplete="off"
        />
        {searchQuery && (
          <button onClick={handleClearSearch} className="clear-button">
            ✕
          </button>
        )}
        {loading && <div className="search-loading">⌛</div>}
      </div>

      {searchQuery && (
        <div className="search-results-dropdown">
          <div className="search-results-header">
            <span className="results-count">
              {loading ? 'Поиск...' : `Найдено: ${technologies.length}`}
            </span>
            <span className="debounce-hint">(задержка 500ms)</span>
          </div>

          {error && (
            <div className="search-error">
              <p>{error}</p>
              <button onClick={() => searchTechnologies(searchQuery)}>
                Попробовать снова
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="search-results-list">
                {technologies.length > 0 ? (
                  technologies.map(tech => (
                    <div
                      key={tech.id}
                      className="search-result-item"
                      onClick={() => handleTechnologySelect(tech)}
                    >
                      <div className="result-title">{tech.title}</div>
                      <div className="result-description">{tech.description}</div>
                      <div className="result-category">{tech.category}</div>
                    </div>
                  ))
                ) : searchQuery.trim() ? (
                  <div className="no-results">
                    <p>Технология "{searchQuery}" не найдена</p>
                    <button 
                      onClick={handleAddNewTechnology}
                      className="add-new-button"
                    >
                      + Добавить новую технологию
                    </button>
                  </div>
                ) : null}
              </div>

              {technologies.length > 0 && (
                <div className="search-stats">
                  <small>
                    Поиск по: названию, описанию и категории. 
                    В реальном приложении подключится к API.
                  </small>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologySearch;