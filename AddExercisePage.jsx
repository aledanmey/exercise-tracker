import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddExercisePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        reps: '',
        weight: '',
        unit: 'lbs',
        date: '',
    });

    // handler for form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
    };

    // handler for form submission
    const handleSubmit = async () => {

        if (
            !form.name.trim() ||
            parseInt(form.reps) <= 0 ||
            parseInt(form.weight) <= 0 ||
            !form.unit.trim() ||
            !form.date.trim()
        ) {
            alert("Please fill out all fields. Reps and weight must be > 0.");
            return;
          }

        const dataToSend = {
            name: form.name.trim(),
            reps: parseInt(form.reps),
            weight: parseInt(form.weight),
            unit: form.unit.trim(),
            date: form.date.trim(),
        };

        console.log("Submitting data:", dataToSend);

        const response = await fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
        });

        if (response.status === 201) {
            alert('Exercise created successfully!');
        } else {
            const errorText = await response.text();
            console.error("Server responded with:", errorText);
            alert('Failed to create exercise.');
        }

        navigate('/');
    };

    return (
    <section>
      <h2>Add New Exercise</h2>
      <form>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="reps" type="number" value={form.reps} onChange={handleChange} placeholder="Reps" />
        <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="Weight" />
        <select name="unit" value={form.unit} onChange={handleChange}>
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>
        <input name="date" value={form.date} onChange={handleChange} placeholder="YYYY-MM-DD" />
        <button type="button" onClick={handleSubmit}>Add Exercise</button>
      </form>
    </section>
    );
}

export default AddExercisePage;