import { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';
import Navigation from './components/Navigation'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <div className='app'>
     <Router>
        <Navigation />
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>} />
            <Route path="/add" element={<AddExercisePage />} />
            <Route path="/edit" element={<EditExercisePage />} />
          </Routes>
        <footer>
          <p>© 2025 Alexandra Meyers</p>
        </footer>
      </Router>
    </div>
  );
}


       

export default App;
