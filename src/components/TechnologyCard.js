// components/TechnologyCard.jsx
import { useState } from 'react';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    // Состояние для анимации
    const [isChanging, setIsChanging] = useState(false);
    
    // Функция для получения текста статуса
    const getStatusText = () => {
        switch (status) {
            case 'completed':
                return 'Изучено';
            case 'in-progress':
                return 'В процессе';
            case 'planned':
                return 'Запланировано';
            default:
                return 'Запланировано';
        }
    };
    
    // Функция для получения текста следующего статуса
    const getNextStatusText = () => {
        const statusFlow = {
            'planned': 'in-progress',
            'in-progress': 'completed',
            'completed': 'planned'
        };
        
        const nextStatus = statusFlow[status];
        switch (nextStatus) {
            case 'completed':
                return 'Изучено';
            case 'in-progress':
                return 'В процессе';
            case 'planned':
                return 'Запланировано';
            default:
                return 'Запланировано';
        }
    };

    // Обработчик клика
    const handleClick = () => {
        // Запускаем анимацию
        setIsChanging(true);
        
        // Меняем статус
        if (onStatusChange) {
            onStatusChange(id, status);
        }
        
        // Сбрасываем анимацию через 300мс
        setTimeout(() => setIsChanging(false), 300);
    };

    return (
        <div 
            className={`technology-card ${status} clickable ${isChanging ? 'status-changing' : ''}`}
            onClick={handleClick}
            title={`Нажмите, чтобы изменить статус на: ${getNextStatusText()}`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
            <div className="card-section">
                <div className="card-content">
                    <h3>{title}</h3>
                    <p className="description">{description}</p>
                </div>
                <div className="status-info">
                    <span className={`status-badge ${status}`}>
                        {getStatusText()}
                        <span className="click-hint">(клик)</span>
                    </span>
                </div>
            </div>
            
            <div className="next-status-hint">
                Следующий статус: {getNextStatusText()}
            </div>
        </div>
    );
}

export default TechnologyCard;