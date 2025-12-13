// components/ProgressHeader.jsx
function ProgressHeader({ technologies = [] }) {
    // Расчет статистики
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    
    // Расчет процента выполнения
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return (
        <div className="progress-header">
            <div className="stats-row">
                <div className="stat">
                    <div className="stat-number">{total}</div>
                    <div className="stat-label">Всего</div>
                </div>
                
                <div className="stat">
                    <div className="stat-number">{completed}</div>
                    <div className="stat-label">Изучено</div>
                </div>
                
                <div className="stat">
                    <div className="stat-number">{completionPercentage}%</div>
                    <div className="stat-label">Прогресс</div>
                </div>
            </div>
            
            <div className="progress-section">
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${completionPercentage}%` }}
                    >
                        <span className="progress-text">{completionPercentage}%</span>
                    </div>
                </div>
                
                {/* Простое сообщение о прогрессе */}
                <div className="progress-message">
                    {completionPercentage === 100 
                        ? '🎉 Все технологии изучены!' 
                        : completionPercentage === 0
                        ? 'Начните изучение'
                        : `Изучено ${completed} из ${total} технологий`
                    }
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;