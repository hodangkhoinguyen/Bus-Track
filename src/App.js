import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Fare from './pages/Fare';
import Schedule from './pages/Schedule';
import Track from './pages/Track';

function App(props) {
  return (
    <div>
        <NavBar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fare" element={<Fare />} />
            <Route path="/schedule/:route" element={<Schedule />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/track" element={<Track />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
