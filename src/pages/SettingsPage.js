import DataImportExport from '../components/DataImportExport';
import useTechnologies from '../hooks/useTechnologies';
import './SettingsPage.css';

function SettingsPage() {
  const { technologies, importTechnologies, resetAllStatuses, markAllCompleted } = useTechnologies();

  const handleImport = (importedTechnologies) => {
    importTechnologies(importedTechnologies);
  };

  const handleResetAll = () => {
    if (window.confirm('Вы уверены, что хотите сбросить статусы всех технологий?')) {
      resetAllStatuses();
    }
  };

  const handleMarkAllCompleted = () => {
    if (window.confirm('Вы уверены, что хотите отметить все технологии как завершённые?')) {
      markAllCompleted();
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Настройки</h1>
        <p>Управление данными и настройками приложения</p>
      </div>

      <div className="settings-sections">
        <section className="settings-section" aria-labelledby="data-management-title">
          <h2 id="data-management-title">Управление данными</h2>
          <DataImportExport 
            technologies={technologies} 
            onImport={handleImport}
          />
        </section>

        <section className="settings-section" aria-labelledby="bulk-actions-title">
          <h2 id="bulk-actions-title">Массовые операции</h2>
          <div className="bulk-actions">
            <button 
              onClick={handleResetAll}
              className="btn-warning"
              aria-label="Сбросить статусы всех технологий"
            >
              Сбросить все статусы
            </button>
            <button 
              onClick={handleMarkAllCompleted}
              className="btn-success"
              aria-label="Отметить все технологии как завершённые"
            >
              Отметить все как завершённые
            </button>
          </div>
          <p className="help-text">
            Внимание: эти операции нельзя отменить. Создайте резервную копию перед выполнением.
          </p>
        </section>

        <section className="settings-section" aria-labelledby="app-info-title">
          <h2 id="app-info-title">Информация о приложении</h2>
          <div className="app-info">
            <p><strong>Название:</strong> Трекер технологий</p>
            <p><strong>Версия:</strong> 1.0.0</p>
            <p><strong>Технологий в базе:</strong> {technologies.length}</p>
            <p><strong>Общий прогресс:</strong> {Math.round(technologies.reduce((sum, tech) => sum + tech.progress, 0) / technologies.length) || 0}%</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;