const request = require('supertest');
const express = require('express');
const axios = require('axios');
const app = express();

// Importa o controller
const {
  searchMoviesAndTVShows,
  discoverByCategory,
  getDetails,
  getMoviesByCategory,
  getMoviesByGenre
} = require('../src/controllers/MoviesController'); 

// Configura o Express para usar o controller
app.use(express.json());
app.get('/api/search', searchMoviesAndTVShows);
app.get('/api/discover/:mediaType', discoverByCategory);
app.get('/api/details/:type/:id', getDetails);
app.get('/api/movies/:category', getMoviesByCategory);
app.get('/api/movies/genre/:genreId', getMoviesByGenre);

jest.mock('axios');

describe('Controller Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('searchMoviesAndTVShows deve retornar filmes e séries', async () => {
    const mockMoviesResponse = { data: { results: [{ id: 1, title: 'Movie' }] } };
    const mockTVShowsResponse = { data: { results: [{ id: 1, name: 'TV Show' }] } };

    axios.get.mockImplementation((url) => {
      if (url.includes('/search/movie')) {
        return Promise.resolve(mockMoviesResponse);
      }
      if (url.includes('/search/tv')) {
        return Promise.resolve(mockTVShowsResponse);
      }
    });

    const response = await request(app)
      .get('/api/search?query=test')
      .expect(200);

    expect(response.body).toEqual({
      movies: [{ id: 1, title: 'Movie' }],
      tvShows: [{ id: 1, name: 'TV Show' }]
    });
  });

  test('discoverByCategory deve retornar dados de acordo com o tipo de mídia e gênero', async () => {
    const mockResponse = { data: { results: [{ id: 1, name: 'Test' }] } };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/discover/movie?genreId=28')
      .expect(200);

    expect(response.body).toEqual({ results: [{ id: 1, name: 'Test' }] });
  });

  test('getDetails deve retornar detalhes do filme ou série', async () => {
    const mockResponse = { data: { id: 1, title: 'Test Movie' } };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/details/movie/1')
      .expect(200);

    expect(response.body).toEqual({ id: 1, title: 'Test Movie' });
  });

  test('getMoviesByCategory deve retornar filmes pela categoria', async () => {
    const mockResponse = { data: { results: [{ id: 1, title: 'Category Movie' }] } };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/movies/top_rated')
      .expect(200);

    expect(response.body).toEqual({ results: [{ id: 1, title: 'Category Movie' }] });
  });

  test('getMoviesByGenre deve retornar filmes pelo gênero', async () => {
    const mockResponse = { data: { results: [{ id: 1, title: 'Genre Movie' }] } };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/movies/genre/28')
      .expect(200);

    expect(response.body).toEqual({ results: [{ id: 1, title: 'Genre Movie' }] });
  });

  test('searchMoviesAndTVShows deve retornar erro 400 se query não fornecida', async () => {
    const response = await request(app)
      .get('/api/search')
      .expect(400);

    expect(response.body).toEqual({ error: 'Parâmetro de busca não fornecido' });
  });

  test('discoverByCategory deve retornar erro 400 se tipo de mídia inválido', async () => {
    const response = await request(app)
      .get('/api/discover/invalid?genreId=28')
      .expect(400);

    expect(response.text).toBe('Tipo de mídia inválido');
  });

  test('getDetails deve retornar erro 400 se tipo inválido', async () => {
    const response = await request(app)
      .get('/api/details/invalid/1')
      .expect(400);

    expect(response.body).toEqual({ error: 'Tipo inválido. Use "movie" ou "tv".' });
  });

  // Adicione mais testes conforme necessário
});
