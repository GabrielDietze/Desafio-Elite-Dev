const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Mock do módulo bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
  genSalt: jest.fn(),
}));

// Mock do módulo jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Mock do modelo User
const User = require('../src/models/user');
jest.mock('../src/models/user');

// Importa as funções do controlador
const { login, register, getUserByUsername, updateUserByUsername, deleteUserByEmail } = require('../src/controllers/UserController');

// Configura rotas de teste
app.post('/login', login);
app.post('/register', register);
app.get('/user/:username', getUserByUsername);
app.put('/user/:username', updateUserByUsername);
app.delete('/user/:email', deleteUserByEmail);

describe('Controlador de Usuário', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  // Testes para a rota POST /login
  describe('POST /login', () => {
    it('deve retornar um token se o login for bem-sucedido', async () => {
      const user = { id: '1', username: 'testuser', password: 'hashedPassword' };
      User.findOne = jest.fn().mockResolvedValue(user);
      require('bcryptjs').compare = jest.fn().mockResolvedValue(true);
      require('jsonwebtoken').sign = jest.fn().mockReturnValue('token123');

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'token123', userId: '1' });
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ msg: 'Usuário não encontrado' });
    });

    it('deve retornar 400 se a senha for inválida', async () => {
      const user = { id: '1', username: 'testuser', password: 'hashedPassword' };
      User.findOne = jest.fn().mockResolvedValue(user);
      require('bcryptjs').compare = jest.fn().mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ msg: 'Senha inválida' });
    });
  });

  // Testes para a rota POST /register
  describe('POST /register', () => {
    it('deve registrar um novo usuário', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      require('bcryptjs').hash = jest.fn().mockResolvedValue('hashedPassword');
      User.prototype.save = jest.fn().mockResolvedValue();

      const response = await request(app)
        .post('/register')
        .send({ username: 'newuser', email: 'newuser@example.com', password: 'password' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ msg: 'Usuário registrado com sucesso' });
    });

    it('deve retornar 400 se o e-mail já estiver em uso', async () => {
      User.findOne = jest.fn().mockResolvedValue({ email: 'existing@example.com' });

      const response = await request(app)
        .post('/register')
        .send({ username: 'newuser', email: 'existing@example.com', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ msg: 'E-mail já está em uso' });
    });
  });

  // Testes para a rota GET /user/:username
  describe('GET /user/:username', () => {
    it('deve retornar os dados do usuário se o usuário for encontrado', async () => {
      const user = { id: '1', username: 'testuser', email: 'testuser@example.com' };
      User.findOne = jest.fn().mockResolvedValue(user);

      const response = await request(app).get('/user/testuser');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app).get('/user/nonexistentuser');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ msg: 'Usuário não encontrado' });
    });
  });

  // Testes para a rota DELETE /user/:email
  describe('DELETE /user/:email', () => {
    it('deve deletar um usuário pelo e-mail', async () => {
      User.findOneAndDelete = jest.fn().mockResolvedValue({ email: 'testuser@example.com' });

      const response = await request(app).delete('/user/testuser@example.com');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ msg: 'Usuário removido com sucesso' });
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      User.findOneAndDelete = jest.fn().mockResolvedValue(null);

      const response = await request(app).delete('/user/nonexistent@example.com');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ msg: 'Usuário não encontrado' });
    });
  });
});
