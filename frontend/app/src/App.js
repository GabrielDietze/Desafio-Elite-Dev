// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth';
import Home from './components/Home';
import MovieDetail from './components/Movie/MovieDetail';
import Favorites from './components/Favorites/FavoritesPage/';
import Profile from './components/Profile';
import ProtectedRoute from './components/Utils/ProtectedRoute';
import SharedFavorites from './components/Favorites/SharedFavorites/SharedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/favorites/shared/:token" element={<ProtectedRoute element={<SharedFavorites />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/:type/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
        <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </Router>
  );
}

export default App;
