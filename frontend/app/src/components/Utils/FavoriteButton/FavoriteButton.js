import React, { useState, useEffect, useCallback } from 'react';
import './FavoriteButton.css'; // Importa o CSS do botão
import api from '../../../services/api'; // Certifique-se de ter a instância da API configurada
import { toast } from 'react-toastify'; // Importa o toast para notificações

const FavoriteButton = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const typeofItem = (item) => {
    if (item.media_type) {
      return item.media_type; // Caso a API já forneça o tipo (tv ou movie)
    } else if (item.first_air_date) {
      return 'tv'; // Se tiver data de primeira exibição, é série
    } else if (item.release_date) {
      return 'movie'; // Se tiver data de lançamento, é filme
    } else {
      return 'movie'; // Padrão caso nenhuma propriedade específica seja encontrada
    }
  };

  const checkIfFavorite = useCallback(async () => {
    const type = typeofItem(item);
    const mediaId = item.id;
    const userId = localStorage.getItem('userId');

    if (userId && mediaId) {
      try {
        const response = await api.get(`/favorites/${userId}`);
        const favorites = response.data.favoriteMovies; // Acessa o array de favoritos

        if (Array.isArray(favorites)) {
          const isFavorite = favorites.some(fav => fav.mediaId === mediaId && fav.mediaType === type);
          setIsFavorite(isFavorite);
        } else {
          console.error('A resposta da API não contém um array de favoritos:', favorites);
        }
      } catch (error) {
        console.error('Erro ao verificar favoritos:', error);
      }
    }

    setLoading(false);
  }, [item]);

  const handleFavoriteToggle = async () => {
    const type = typeofItem(item);
    const mediaId = item.id;
    const userId = localStorage.getItem('userId');

    if (isFavorite) {
      try {
        await api.delete('/favorites', {
          data: {
            mediaId,
            mediaType: type,
            userId
          }
        });
        setIsFavorite(false);
        toast.success('Item removido dos favoritos!');
      } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
        toast.error('Erro ao remover dos favoritos.');
      }
    } else {
      try {
        await api.post('/favorites', {
          mediaId,
          mediaType: type,
          userId
        });
        setIsFavorite(true);
        toast.success('Item adicionado aos favoritos!');
      } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
        toast.error('Erro ao adicionar aos favoritos.');
      }
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  return (
    <button onClick={handleFavoriteToggle} className="FavoriteButton" disabled={loading}>
      {loading ? 'Carregando...' : isFavorite ? 'Remover dos Favoritos' : '+ Adicionar Aos Favoritos'}
    </button>
  );
};

export default FavoriteButton;
