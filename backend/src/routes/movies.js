const express = require('express');
const axios = require('axios');
const Movie = require('../models/movie');
const router = express.Router();
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE_PARAM = 'pt-BR';

//buscar filmes em cartaz
router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: LANGUAGE_PARAM,
        with_networks: 213 // Netflix
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

//buscar detalhes do filme
router.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: TMDB_API_KEY,
          language: LANGUAGE_PARAM,
          with_networks: 213 // Netflix
        }
      });
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar detalhes do filme' });
    }
  });  


  //buscar filmes por categoria
router.get('/movie/:category', async (req, res) => {
  const category = req.params.category; // Ex: 'top_rated', 'action', etc.
  try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
          params: {
              api_key: TMDB_API_KEY,
              language: LANGUAGE_PARAM,
              with_networks: 213 // Netflix
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar filme por categoria');
  }
});

// Rota para buscar filmes por gênero
router.get('/movie/genre/:genreId', async (req, res) => {
  const genreId = req.params.genreId; // ID do gênero
  try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
          params: {
              api_key: TMDB_API_KEY,
              language: LANGUAGE_PARAM,
              with_genres: genreId, // Filtra filmes por gênero
              with_networks: 213 // Netflix
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar filmes por gênero');
  }
});

module.exports = router;
