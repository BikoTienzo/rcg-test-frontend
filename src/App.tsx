import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Encoder from './pages/Encoder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Encoder />} />
      </Routes>
    </Router>
  );
}

export default App;
