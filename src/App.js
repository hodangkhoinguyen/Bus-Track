import './App.css';
import './styles/grid.css';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Track from './pages/Track';
import Fare from './pages/Fare';
a
function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand">
        UCD Bus
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <a href="/schedule" className="nav-link">
            Schedule
          </a>
        </li>
        <li className="nav-item" >
          <a href="/track" className="nav-link">
            Real-time
          </a>
        </li>
        <li className="nav-item" >
          <a href="/fare" className="nav-link">
            Fare
          </a>
        </li>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div>
      <NavBar />
      <div className="grid wide">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/track" element={<Track />} />
          <Route path="/fare" element={<Fare />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
