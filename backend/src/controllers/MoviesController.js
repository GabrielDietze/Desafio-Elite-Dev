const axios = require('axios');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE_PARAM = 'pt-BR';

exports.searchMoviesAndTVShows = async (req, res) => {
  const query = req.query.query; // Use query em vez de params

  if (!query) {
    return res.status(400).json({ error: 'Parâmetro de busca não fornecido' });
  }

  try {
    // Faz duas requisições: uma para filmes e outra para séries
    const [moviesResponse, tvShowsResponse] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: query,
          language: LANGUAGE_PARAM
        }
      }),
      axios.get(`${TMDB_BASE_URL}/search/tv`, {
        params: {
          api_key: TMDB_API_KEY,
          query: query,
          language: LANGUAGE_PARAM
        }
      })
    ]);

    // Combina os resultados
    res.json({
      movies: moviesResponse.data.results,
      tvShows: tvShowsResponse.data.results
    });
  } catch (error) {
    console.error('Erro ao buscar filmes e séries:', error.message);
    res.status(500).json({ error: 'Erro ao buscar filmes e séries' });
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
