const express = require('express');
const axios = require('axios');
const Movie = require('../models/movie');
const router = express.Router();
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

router.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: TMDB_API_KEY
        }
      });
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar detalhes do filme' });
    }
  });  

module.exports = router;
