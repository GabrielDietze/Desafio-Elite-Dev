import React, { useState, useEffect, useCallback } from 'react';
import './FavoriteButton.css'; // Importa o CSS do botão
import api from '../../../services/api'; // Certifique-se de ter a instância da API configurada
import { toast } from 'react-toastify'; // Importa o toast para notificações

const FavoriteButton = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar se o item é favorito
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para determinar o tipo de mídia (tv ou movie) com base no item
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

  // Função para verificar se o item já está marcado como favorito
  const checkIfFavorite = useCallback(async () => {
    const type = typeofItem(item); // Determina o tipo de mídia
    const mediaId = item.id; // ID da mídia (filme ou série)
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário salvo no localStorage

    if (userId && mediaId) {
      // Faz uma requisição GET para obter a lista de favoritos do usuário
      const response = await api.get(`/favorites/${userId}`);
      const favorites = response.data.favoriteMovies; // Acessa o array de filmes/séries favoritos

      // Verifica se o item atual já está nos favoritos do usuário
      const isFavorite = favorites.some(fav => fav.mediaId === mediaId && fav.mediaType === type);
      setIsFavorite(isFavorite); // Atualiza o estado para indicar se é favorito
    }

    setLoading(false); // Desativa o estado de carregamento
  }, [item]); // Dependência de `item` para evitar reexecuções desnecessárias

  // Função para adicionar ou remover o item dos favoritos
  const handleFavoriteToggle = async () => {
    const type = typeofItem(item); // Determina o tipo de mídia
    const mediaId = item.id; // ID da mídia (filme ou série)
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário

    if (isFavorite) {
      // Se o item já é favorito, realiza a remoção
      try {
        await api.delete('/favorites', {
          data: {
            mediaId,
            mediaType: type,
            userId
          }
        });
        setIsFavorite(false); // Atualiza o estado para não-favorito
        toast.success('Item removido dos favoritos!'); // Mostra notificação de sucesso
      } catch (error) {
        toast.error('Erro ao remover dos favoritos.'); // Mostra notificação de erro
      }
    } else {
      // Se o item não é favorito, realiza a adição
      try {
        await api.post('/favorites', {
          mediaId,
          mediaType: type,
          userId
        });
        setIsFavorite(true); // Atualiza o estado para favorito
        toast.success('Item adicionado aos favoritos!'); // Mostra notificação de sucesso
      } catch (error) {
        toast.error('Erro ao adicionar aos favoritos.'); // Mostra notificação de erro
      }
    }
  };

  // useEffect para verificar o status de favorito quando o componente monta ou o item muda
  useEffect(() => {
    checkIfFavorite(); // Chama a função para verificar se o item é favorito
  }, [checkIfFavorite]); // A função de verificação é a dependência

  return (
    <button onClick={handleFavoriteToggle} className="FavoriteButton" disabled={loading}>
      {loading ? 'Carregando...' : isFavorite ? 'Remover dos Favoritos' : '+ Adicionar Aos Favoritos'}
    </button>
  );
};

export default FavoriteButton;
