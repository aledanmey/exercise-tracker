import { FaTrash, FaEdit } from 'react-icons/fa';

function ExerciseRow({ exercise, onDelete, onEdit }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <FaEdit
          onClick={() => onEdit(exercise)}
          style={{ cursor: 'pointer', marginRight: '1rem' }}
          title="Edit"
        />
        <FaTrash
          onClick={() => onDelete(exercise._id)}
          style={{ cursor: 'pointer' }}
          title="Delete"
        />
      </td>
    </tr>
  );
}

export default ExerciseRow;