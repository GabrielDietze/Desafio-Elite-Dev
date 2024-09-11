const axios = require('axios');
const Movie = require('../models/movie');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE_PARAM = 'pt-BR';

// Buscar filmes em cartaz
exports.searchMovies = async (req, res) => {
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
};

// Buscar filmes ou séries por categoria
exports.discoverByCategory = async (req, res) => {
  const mediaType = req.params.mediaType; // 'movie' ou 'tv'
  const genreId = req.query.genreId; // ID do gênero

  if (!['movie', 'tv'].includes(mediaType)) {
    return res.status(400).send('Tipo de mídia inválido');
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/${mediaType}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: LANGUAGE_PARAM,
        with_genres: genreId,
        with_networks: 213 // Netflix 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados');
  }
};

// Buscar detalhes de filme ou série
exports.getDetails = async (req, res) => {
  const { type, id } = req.params;

  if (type !== 'movie' && type !== 'tv') {
    return res.status(400).json({ error: 'Tipo inválido. Use "movie" ou "tv".' });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: LANGUAGE_PARAM,
        with_networks: type === 'movie' ? 213 : undefined // Adiciona com_networks apenas para filmes
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar detalhes' });
  }
};

// Buscar filmes por categoria
exports.getMoviesByCategory = async (req, res) => {
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
};

// Buscar filmes por gênero
exports.getMoviesByGenre = async (req, res) => {
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
};
