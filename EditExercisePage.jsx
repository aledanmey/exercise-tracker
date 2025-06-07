import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditExercisePage({ exercise }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        reps: '',
        weight: '',
        unit: '',
        date: '' 
    });

    useEffect(() => {
        if (exercise) {
            setForm(exercise);
        }
    }, [exercise]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
      const response = await fetch(`/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.status === 200) {
        alert('Exercise updated successfully');
      } else {
        alert('Failed to update exercise');
      }
      navigate('/');
    };

    return (
      <section>
        <h1>Edit</h1>
        <form>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name"/>
            <input name="reps" type="number" value={form.reps} onChange={handleChange} placeholder="Reps"/>
            <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="Weight"/>
            <select name="unit" value={form.unit} onChange={handleChange}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input name="date" type="text" value={form.date} onChange={handleChange} placeholder="YYYY-MM-DD"/>
            <button type="button" onClick={handleSubmit}>Save</button>
        </form>
      </section>
    );
}

export default EditExercisePage;