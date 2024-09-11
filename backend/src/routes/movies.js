const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/MoviesController');

// Buscar filmes em cartaz
router.get('/search/:query', moviesController.searchMovies);

// Buscar filmes ou séries por categoria
router.get('/discover/:mediaType', moviesController.discoverByCategory);

// Buscar detalhes de filme ou série
router.get('/:type/:id', moviesController.getDetails);

// Buscar filmes por categoria
router.get('/movie/:category', moviesController.getMoviesByCategory);

// Buscar filmes por gênero
router.get('/movie/genre/:genreId', moviesController.getMoviesByGenre);

module.exports = router;
