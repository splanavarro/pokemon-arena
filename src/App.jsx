import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaPokemon from './ListaPokemon';
import ConvertirCSV from './ConvertirCSV.jsx';
import Inicio from './Inicio';
// import FormularioAlumno from './FormularioAlumno';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/lista" element={<ListaPokemon />} />
            <Route path="/csv" element={<ConvertirCSV />} />
            {/* <Route path="/crear" element={<FormularioAlumno />} /> */}
            {/* <Route path="/editar/:id" element={<FormularioAlumno />} /> */}
        </Routes>
    </Router>
);

export default App;