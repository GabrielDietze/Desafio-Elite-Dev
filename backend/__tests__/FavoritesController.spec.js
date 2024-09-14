const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Mock do modelo User
const User = require('../src/models/user');
jest.mock('../src/models/user');

// Importa as funções do controller
const favoritesController = require('../src/controllers/FavoritesController');
const SharedFavoritesController = require('../src/controllers/SharedFavoritesController');

// Configura rotas de teste
app.get('/api/favorites/:userId', favoritesController.index);
app.post('/api/favorites', favoritesController.store);
app.delete('/api/favorites', favoritesController.delete);
app.post('/api/favorites/shared/:userId', SharedFavoritesController.createShareLink);
app.get('/api/favorites/shared/:token', SharedFavoritesController.getFavoritesByShareLink);

describe('Favorites Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe('GET /api/favorites/:userId', () => {
    it('deve retornar a lista de favoritos se o usuário for encontrado', async () => {
      const user = { id: '1', favoriteMovies: [{ mediaId: 1234, mediaType: 'movie' }] };
      User.findById = jest.fn().mockResolvedValue(user);

      const response = await request(app).get('/api/favorites/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ favoriteMovies: user.favoriteMovies });
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const response = await request(app).get('/api/favorites/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Usuário não encontrado' });
    });

    it('deve retornar 500 se ocorrer um erro ao buscar os favoritos', async () => {
      User.findById = jest.fn().mockRejectedValue(new Error('Erro ao buscar'));

      const response = await request(app).get('/api/favorites/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erro ao buscar favoritos' });
    });
  });

  describe('POST /api/favorites', () => {

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/favorites')
        .send({ userId: '1', mediaId: 12345, mediaType: 'movie' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Usuário não encontrado' });
    });

    it('deve retornar 400 se a mídia já estiver na lista de favoritos', async () => {
      const user = { id: '1', favoriteMovies: [{ mediaId: 1234, mediaType: 'movie' }] };
      User.findById = jest.fn().mockResolvedValue(user);

      const response = await request(app)
        .post('/api/favorites')
        .send({ userId: '1', mediaId: 1234, mediaType: 'movie' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Mídia já está na lista de favoritos' });
    });

    it('deve retornar 500 se ocorrer um erro ao adicionar a mídia', async () => {
      User.findById = jest.fn().mockRejectedValue(new Error('Erro ao adicionar'));

      const response = await request(app)
        .post('/api/favorites')
        .send({ userId: '1', mediaId: 1234, mediaType: 'movie' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erro ao adicionar mídia aos favoritos' });
    });
  });

  describe('DELETE /api/favorites', () => {

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/favorites')
        .send({ userId: '1', mediaId: 1234, mediaType: 'movie' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Usuário não encontrado' });
    });

    it('deve retornar 400 se a mídia não estiver na lista de favoritos', async () => {
      const user = { id: '1', favoriteMovies: [] };
      User.findById = jest.fn().mockResolvedValue(user);

      const response = await request(app)
        .delete('/api/favorites')
        .send({ userId: '1', mediaId: 1234, mediaType: 'movie' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Mídia não está na lista de favoritos' });
    });

    it('deve retornar 500 se ocorrer um erro ao remover a mídia', async () => {
      User.findById = jest.fn().mockRejectedValue(new Error('Erro ao remover'));

      const response = await request(app)
        .delete('/api/favorites')
        .send({ userId: '1', mediaId: 1234, mediaType: 'movie' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erro ao remover mídia dos favoritos' });
    });
  });
});
