import { useNavigate } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const handleSave = (technologyData) => {
    const newTechnology = {
      ...technologyData,
      id: Date.now(),
      status: 'planned',
      progress: 0,
      notes: '',
      startedAt: '',
      completedAt: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    addTechnology(newTechnology);
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>Добавление новой технологии</h1>
        <p>Заполните форму для добавления технологии в трекер. Все поля с * обязательны для заполнения.</p>
      </div>
      
      <div className="form-container">
        <TechnologyForm 
          onSave={handleSave} 
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default AddTechnology;