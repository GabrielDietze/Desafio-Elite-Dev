// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Auth';
import Profile from './components/Profile';
import MovieDetail from './components/Movie/MovieDetail';
import Favorites from './components/Favorites/FavoritesPage/';
import ProtectedRoute from './components/Utils/ProtectedRoute';
import SharedFavorites from './components/Favorites/SharedFavorites/SharedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
        <Route path="/:type/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
        <Route path="/favorites/shared/:token" element={<ProtectedRoute element={<SharedFavorites />} />} />
      </Routes>
    </Router>
  );
}

export default App;
