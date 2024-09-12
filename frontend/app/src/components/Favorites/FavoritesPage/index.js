import React, { useState, useEffect } from 'react';
import Header from '../../header'; 
import './favorites.css';
import BackButton from '../../Utils/backbutton/BackButton';
import { Link } from 'react-router-dom';
import api from '../../../services/api'; 
import SharedFavorites from '../SharedFavorites/ButtonExport';

const Favorite = () => {
  const [blackHeader, setBlackHeader] = useState(false); // Controla a cor do cabeçalho baseado no scroll
  const [favoritesDetails, setFavoritesDetails] = useState([]); // Armazena os detalhes dos filmes e séries favoritos
  const [loading, setLoading] = useState(true); // Controla o estado de carregamento
  const [error, setError] = useState(null); // Armazena erros de requisições

  const userId = localStorage.getItem("userId"); // Obtém o ID do usuário do localStorage

  useEffect(() => {
     // Função para buscar os favoritos do usuário
    const fetchFavorites = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null); // Limpa qualquer erro anterior
        

        const response = await api.get(`/favorites/${userId}`); // Faz a requisição para obter favoritos do usuário
       

        if (response.data.favoriteMovies && Array.isArray(response.data.favoriteMovies)) {
          // Mapear favoritos para buscar detalhes
          const favoriteDetailsPromises = response.data.favoriteMovies.map(async (favorite) => {
            try {
              const { mediaId, mediaType } = favorite; // Obtém id e tipo de mídia

              if (!mediaId || !mediaType) { // Retorna null se faltar id ou tipo de mídia
                return null;
              }

              let detailResponse;

                // Faz requisição para obter detalhes baseados no tipo de mídia
              if (mediaType === 'tv') {
                detailResponse = await api.get(`/tv/${mediaId}`);
              } else if (mediaType === 'movie') {
                detailResponse = await api.get(`/movie/${mediaId}`);
              } else {
                return null;
              }

              
              return { ...detailResponse.data, mediaType }; // Incluindo mediaType nos detalhes
            } catch (error) {
              return null; // Retorna null se ocorrer erro na requisição
            }
          });

          const details = await Promise.all(favoriteDetailsPromises); // Aguarda todas as promessas serem resolvidas
          
          setFavoritesDetails(details.filter(item => item !== null)); // Atualiza o estado com detalhes válidos
        } 
      } catch (error) {
        setError('Erro ao carregar favoritos.'); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      } 
    };

    fetchFavorites(); // Chama a função para buscar os favoritos
  }, [userId]); // Dependência para refazer a busca quando o userId mudar

  useEffect(() => {
      // Adiciona e remove o listener de scroll para alterar a cor do cabeçalho
    const scrollListener = () => {
      if (window.scrollY > 10) { 
        setBlackHeader(true);  // Cabeçalho preto se o scroll for maior que 10px
      } else {
        setBlackHeader(false);  // Cabeçalho não preto se o scroll for menor ou igual a 10px
      }
    };

    window.addEventListener('scroll', scrollListener); // Adiciona o listener de scroll

    return () => {
      window.removeEventListener('scroll', scrollListener);  // Remove o listener de scroll
    };
  }, []); // Executa uma vez após a montagem do componente

  return (
    <div className='favorites-page'>
      <Header black={blackHeader} />
      <section className='favorites-content'>
        <div className='nav-menu-favorite'>
          <div className='back-button'>
            <BackButton />
          </div>
          <SharedFavorites />
        </div>

        {loading && <p>Carregando favoritos...</p>}
        {error && <p>{error}</p>}

        <div className='favorites-list'>
          {favoritesDetails.length > 0 ? (
            favoritesDetails.map((item) => (
              <div className='favorites-item' key={item.id}>
                <Link to={`/${item.mediaType}/${item.id}`}> {/* Usando item.mediaType */}
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                    alt={item.title}
                  />
                </Link>
              </div>
            ))
          ) : (
            !loading && <p>Nenhum favorito encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorite;
