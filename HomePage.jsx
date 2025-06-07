import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';


function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };


    const deleteExercise = async (id) => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadExercises(); 
        } else {
          alert('Failed to delete exercise');
        }
  };

  const handleEdit = (exercise) => {
    // lift state 
    setExerciseToEdit(exercise);
    navigate('/edit');
  };

  useEffect(() => {
    loadExercises();
  }, []);

    return (
        <section>
            <ExerciseTable
                exercises={exercises}
                onDelete={deleteExercise}
                onEdit={handleEdit}
             />
            <p>
                <strong>Log a new exercise: </strong>{' '}
                <button onClick={() => navigate('/add')}>Add</button>
            </p>
        </section>
  );
}

export default HomePage; 
