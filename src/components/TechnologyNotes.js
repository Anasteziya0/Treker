import React, { useState, useEffect } from 'react';
import './TechnologyNotes.css';

function TechnologyNotes({ technology, onNotesChange }) {
  const [notes, setNotes] = useState(technology.notes || '');
  const [characterCount, setCharacterCount] = useState(technology.notes?.length || 0);

  useEffect(() => {
    setNotes(technology.notes || '');
    setCharacterCount(technology.notes?.length || 0);
  }, [technology]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    setCharacterCount(newNotes.length);
    
    if (onNotesChange) {
      onNotesChange(technology.id, newNotes);
    }
  };

  const clearNotes = () => {
    setNotes('');
    setCharacterCount(0);
    if (onNotesChange) {
      onNotesChange(technology.id, '');
    }
  };

  const getNotesHint = () => {
    if (characterCount === 0) {
      return 'Добавьте заметку';
    } else if (characterCount < 50) {
      return `Заметка сохранена (${characterCount} символов)`;
    } else if (characterCount < 100) {
      return `Заметка сохранена (${characterCount} символов) ✨`;
    } else {
      return `Заметка сохранена (${characterCount} символов) 📚`;
    }
  };

  return (
    <div className="technology-notes">
      <div className="notes-header">
        <h4>Мои заметки по "{technology.title}":</h4>
        <button 
          className="clear-notes-btn"
          onClick={clearNotes}
          disabled={characterCount === 0}
          title="Очистить заметки"
          type="button"
        >
          🗑️ Очистить
        </button>
      </div>
      
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Записывайте сюда важные моменты, идеи, ссылки на ресурсы, планы изучения..."
        rows="4"
        className="notes-textarea"
        maxLength="1000"
      />
      
      <div className="notes-footer">
        <div className="notes-hint">
          {getNotesHint()}
        </div>
        <div className="character-count">
          {characterCount}/1000
        </div>
      </div>
      
      <div className="notes-tips">
        <small>💡 Совет: Заметки автоматически сохраняются в localStorage</small>
      </div>
    </div>
  );
}

export default TechnologyNotes;