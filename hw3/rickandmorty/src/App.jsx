import{ BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Species from './pages/Species';
import Locations from './pages/Locations';

export default function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/home">Home</Link>
                {' | '}
                <Link to="/characters">Characters</Link>
                {' | '}
                <Link to="/species">Species</Link>
                {'|'}
                <Link to="/locations">Locations</Link>
                {'|'}
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/species" element={<Species />} />
                <Route path="/locations" element={<Locations />} />
            </Routes>
        </BrowserRouter>
    )
}
