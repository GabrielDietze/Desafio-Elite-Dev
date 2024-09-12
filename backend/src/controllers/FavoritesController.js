const User = require('../models/user');

// Buscar a lista de favoritos de um usuário
exports.index = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ favoriteMovies: user.favoriteMovies });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

// Adicionar uma mídia (filme ou série) à lista de favoritos
exports.store = async (req, res) => {
  const { userId, mediaId, mediaType } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se o favorito já existe
    if (user.favoriteMovies.some(fav => fav.mediaId === mediaId && fav.mediaType === mediaType)) {
      return res.status(400).json({ error: 'Mídia já está na lista de favoritos' });
    }

    user.favoriteMovies.push({ mediaId, mediaType });
    await user.save();

    res.status(200).json({ message: 'Mídia adicionada aos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar mídia aos favoritos' });
  }
};

// Remover uma mídia da lista de favoritos
exports.delete = async (req, res) => {
  const { userId, mediaId, mediaType } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const index = user.favoriteMovies.findIndex(fav => fav.mediaId === mediaId && fav.mediaType === mediaType);
    if (index === -1) {
      return res.status(400).json({ error: 'Mídia não está na lista de favoritos' });
    }

    user.favoriteMovies.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Mídia removida dos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover mídia dos favoritos' });
  }
};
