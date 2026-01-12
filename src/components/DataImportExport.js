import { useState } from 'react';
import './DataImportExport.css';

function DataImportExport({ technologies, onImport }) {
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // экспорт данных в JSON-файл
  const exportToJSON = () => {
    try {
      // преобразуем данные в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2);

      // создаем Blob объект из строки
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // создаем временную ссылку для скачивания
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

      // программно кликаем по ссылке для начала скачивания
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // освобождаем память
      URL.revokeObjectURL(url);

      setStatus('Данные экспортированы в JSON файл');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
    }
  };

  // импорт данных из JSON-файла
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        // проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }

        // валидация структуры данных
        const isValid = imported.every(item => 
          item.title && 
          typeof item.title === 'string' &&
          item.category &&
          typeof item.category === 'string'
        );

        if (!isValid) {
          throw new Error('Некорректная структура данных');
        }

        onImport(imported);
        setStatus(`Импортировано ${imported.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        setStatus('Ошибка импорта: неверный формат файла');
        console.error('Ошибка импорта:', error);
      }
    };

    // запускаем асинхронное чтение файла как текста
    reader.readAsText(file);

    // сбрасываем значение input для возможности повторного импорта того же файла
    event.target.value = '';
  };

  // обработчики drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      // используем ту же логику чтения что и в importFromJSON
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            onImport(imported);
            setStatus(`Импортировано ${imported.length} технологий (перетаскиванием)`);
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('Ошибка импорта: неверный формат файла');
        }
      };
      reader.readAsText(file);
    } else {
      setStatus('Пожалуйста, выберите JSON файл');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="data-import-export">
      <h2>Импорт и экспорт данных</h2>
      
      {/* статусное сообщение */}
      <div 
        className="status-message" 
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </div>

      <div className="controls">
        <button 
          onClick={exportToJSON} 
          disabled={technologies.length === 0}
          className="btn-export"
          aria-label="Экспорт данных в JSON файл"
        >
          📥 Экспорт в JSON
        </button>

        <label className="file-input-label" aria-label="Импорт данных из JSON файла">
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            aria-label="Выберите JSON файл для импорта"
          />
          <span className="btn-import">📤 Импорт из JSON</span>
        </label>
      </div>

      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="Область для перетаскивания файлов"
        tabIndex="0"
      >
        <p>📁 Перетащите JSON-файл сюда</p>
        <p className="hint">или нажмите для выбора файла</p>
      </div>

      {technologies.length > 0 && (
        <div className="info">
          <p><strong>Всего технологий:</strong> {technologies.length}</p>
          <p><strong>Формат данных:</strong> массив объектов с полями title, description, category, status и т.д.</p>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;