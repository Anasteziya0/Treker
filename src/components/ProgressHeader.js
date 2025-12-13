// components/ProgressHeader.jsx
function ProgressHeader({ technologies = [] }) {
    // Расчет статистики
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const planned = technologies.filter(tech => tech.status === 'planned').length;
    
    // Расчет процента выполнения
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Определяем самый популярный статус
    const getMostPopularStatus = () => {
        const statusCounts = {
            'completed': completed,
            'in-progress': inProgress,
            'planned': planned
        };
        
        let mostPopular = 'planned';
        let maxCount = 0;
        
        for (const [status, count] of Object.entries(statusCounts)) {
            if (count > maxCount) {
                maxCount = count;
                mostPopular = status;
            }
        }
        
        // Если все статусы равны или 0, возвращаем "планируется"
        if (maxCount === 0) return 'planned';
        
        return mostPopular;
    };
    
    const mostPopularStatus = getMostPopularStatus();
    
    // Функция для получения текста популярного статуса
    const getPopularStatusText = () => {
        switch (mostPopularStatus) {
            case 'completed':
                return 'Большинство изучено';
            case 'in-progress':
                return 'Большинство в процессе';
            case 'planned':
                return 'Большинство запланировано';
            default:
                return 'Большинство запланировано';
        }
    };
    
    // Функция для получения цвета популярного статуса
    const getPopularStatusColor = () => {
        switch (mostPopularStatus) {
            case 'completed':
                return '#10b981';
            case 'in-progress':
                return '#f59e0b';
            case 'planned':
                return '#9ca3af';
            default:
                return '#9ca3af';
        }
    };

    return (
        <div className="progress-header">
            <div className="stats-row">
                <div className="stat">
                    <div className="stat-number">{total}</div>
                    <div className="stat-label">Всего технологий</div>
                </div>
                
                <div className="stat">
                    <div className="stat-number">{completed}</div>
                    <div className="stat-label">Изучено</div>
                </div>
                
                <div className="stat">
                    <div className="stat-number">{inProgress}</div>
                    <div className="stat-label">В процессе</div>
                </div>
                
                <div className="stat">
                    <div className="stat-number">{planned}</div>
                    <div className="stat-label">Запланировано</div>
                </div>
            </div>
            
            <div className="progress-section">
                <div className="progress-info">
                    <h3>Прогресс изучения</h3>
                    <div className="percentage-display">
                        <span className="percentage-number">{completionPercentage}%</span>
                        <span className="percentage-text">выполнено</span>
                    </div>
                </div>
                
                {/* Прогресс-бар */}
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${completionPercentage}%` }}
                    >
                        <span className="progress-text">{completionPercentage}%</span>
                    </div>
                </div>
            </div>
            
            {/* Детальная статистика */}
            <div className="detailed-stats">
                <div className="stats-grid">
                    <div className="stat-detail completed">
                        <div className="detail-header">
                            <span className="detail-title">Изучено</span>
                            <span className="detail-count">{completed}</span>
                        </div>
                        <div className="detail-percentage">
                            {total > 0 ? Math.round((completed / total) * 100) : 0}%
                        </div>
                    </div>
                    
                    <div className="stat-detail in-progress">
                        <div className="detail-header">
                            <span className="detail-title">В процессе</span>
                            <span className="detail-count">{inProgress}</span>
                        </div>
                        <div className="detail-percentage">
                            {total > 0 ? Math.round((inProgress / total) * 100) : 0}%
                        </div>
                    </div>
                    
                    <div className="stat-detail planned">
                        <div className="detail-header">
                            <span className="detail-title">Запланировано</span>
                            <span className="detail-count">{planned}</span>
                        </div>
                        <div className="detail-percentage">
                            {total > 0 ? Math.round((planned / total) * 100) : 0}%
                        </div>
                    </div>
                </div>
                
                {/* Информация о популярном статусе */}
                <div 
                    className="popular-status"
                    style={{ borderLeftColor: getPopularStatusColor() }}
                >
                    <div className="popular-icon">📊</div>
                    <div className="popular-info">
                        <div className="popular-title">Текущая статистика</div>
                        <div className="popular-text">{getPopularStatusText()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;