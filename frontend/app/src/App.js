// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth';
import Home from './components/Home';
import MovieDetail from './components/Movie/MovieDetail';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProtectedRoute from './components/Utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/:type/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
        <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </Router>
  );
}

export default App;
