    const express = require('express');
    const router = express.Router();
    const favoritesController = require('../controllers/FavoritesController');
    const SharedFavoritesController = require('../controllers/SharedFavoritesController');

    // Buscar a lista de favoritos de um usuário
    router.get('/favorites/:userId', favoritesController.index);

    // Adicionar um filme à lista de favoritos
    router.post('/favorites', favoritesController.store);

    // Remover um filme da lista de favoritos
    router.delete('/favorites', favoritesController.delete);

    // Gerar um link compartilhável para a lista de favoritos
    router.post('/favorites/shared/:userId', SharedFavoritesController.createShareLink);

    // Acessar a lista de favoritos via link compartilhado
    router.get('/favorites/shared/:token', SharedFavoritesController.getFavoritesByShareLink);

    module.exports = router;
