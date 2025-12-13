// TechnologyCard.js
function TechnologyCard({ title, description, status }) {
    return (
        <div className={`technology-card ${status}`}>
            <div className="card-section">
                <div className="card-content">
                    <h3>{title}</h3>
                    <p className="description">{description}</p>
                </div>
                <div className="status-info">
                    <span className={`status-badge ${status}`}>
                        {status === 'completed' ? '✅ Изучено' : 
                         status === 'in-progress' ? '🔄 В процессе' : 
                         '📅 Запланировано'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TechnologyCard;