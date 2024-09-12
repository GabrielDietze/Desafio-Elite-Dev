import React, { useState, useEffect } from 'react';
import Header from '../header'; 
import './favorites.css';
import BackButton from '../Utils/backbutton/BackButton';
import { Link } from 'react-router-dom';
import api from '../../services/api'; 

const Favorite = () => {
  const [blackHeader, setBlackHeader] = useState(false);
  const [favoritesDetails, setFavoritesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Buscando favoritos para o usuário:", userId);

        const response = await api.get(`/favorites/${userId}`);
        console.log("Resposta da API de favoritos:", response.data);

        if (response.data.favoriteMovies && Array.isArray(response.data.favoriteMovies)) {
          // Mapear favoritos para buscar detalhes
          const favoriteDetailsPromises = response.data.favoriteMovies.map(async (favorite) => {
            try {
              const { mediaId, mediaType } = favorite;
              console.log(`Detalhes do favorito:`, favorite);
              console.log(`Buscando detalhes para ${mediaType} com ID ${mediaId}`);

              if (!mediaId || !mediaType) {
                console.error("mediaId ou mediaType está undefined para o item:", favorite);
                return null;
              }

              let detailResponse;

              // Buscar detalhes com base no mediaType
              if (mediaType === 'tv') {
                detailResponse = await api.get(`/tv/${mediaId}`);
              } else if (mediaType === 'movie') {
                detailResponse = await api.get(`/movie/${mediaId}`);
              } else {
                console.error("Tipo de mídia desconhecido:", mediaType);
                return null;
              }

              console.log(`Detalhes recebidos para ${mediaType} com ID ${mediaId}:`, detailResponse.data);
              return { ...detailResponse.data, mediaType }; // Incluindo mediaType nos detalhes
            } catch (error) {
              console.error("Erro ao buscar detalhes do item:", error);
              return null;
            }
          });

          const details = await Promise.all(favoriteDetailsPromises);
          console.log("Detalhes de todos os favoritos:", details);
          setFavoritesDetails(details.filter(item => item !== null));
        } else {
          console.error("Resposta da API não contém um array de favoritos:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setError('Erro ao carregar favoritos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className='favorites-page'>
      <Header black={blackHeader} />
      <section className='favorites-content'>
        <div className='nav-menu-favorite'>
          <div className='back-button'>
            <BackButton />
          </div>
          <button className='link-favorite'>Exportar favoritos</button>
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
