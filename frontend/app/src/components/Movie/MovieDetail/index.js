import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import Header from '../../header';
import { useParams } from 'react-router-dom';
import BackButton from '../../Utils/backbutton/BackButton';
import api from '../../../services/api';
import FavoriteButton from '../../Utils/FavoriteButton/FavoriteButton';

const MovieDetail = () => {
    // Obtém os parâmetros da URL (tipo e id)
    const { type, id } = useParams();
    // Estado para armazenar as informações do item
    const [item, setItem] = useState(null);
    // Estado para gerenciar o cabeçalho preto
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        // Função para verificar a rolagem da página e definir o cabeçalho preto
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        // Adiciona o ouvinte de rolagem
        window.addEventListener('scroll', scrollListener);

        // Remove o ouvinte de rolagem ao desmontar o componente
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    useEffect(() => {
        // Função assíncrona para buscar os detalhes do item
        const fetchItem = async () => {
                const response = await api.get(`/${type}/${id}`);
                setItem(response.data);
        };
        fetchItem();
    }, [type, id]);

    // Exibe um carregando enquanto os dados não são obtidos
    if (!item) {
        return <div className='loading'>
            <img src="https://media1.tenor.com/m/UnFx-k_lSckAAAAC/amalie-steiness.gif" alt="Carregando" />
            </div>
    }

    // Gera uma lista de gêneros
    const genres = item.genres ? item.genres.map((genre) => genre.name).join(', ') : '';

    return (
        <>
            <div className='container-movie-detail'>
                <div className='header-movie-detail'>
                    {/* Renderiza o cabeçalho com base no estado blackHeader */}
                    <Header black={blackHeader} /> 
                </div>
                
                <section className="movie" style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `linear-gradient(to right, #111 30%, transparent 70%), linear-gradient(to top, rgba(0, 0, 0, 0.7) 10%, transparent 90%), url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
                }}>
                    <div className='back-button'>
                        {/* Botão para voltar */}
                        <BackButton />
                    </div>
                    <div className="featured-name">
                        {/* Nome do filme ou série */}
                        {item.title || item.original_name}
                    </div>
                    <div className="featured-info">
                        <div className="featured-points">
                             {/* Nota do filme ou série */}
                             Nota: {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                        </div>
                        <div className="featured-year">
                            {/* Ano de lançamento */}
                            {new Date(item.release_date || item.first_air_date).getFullYear()}
                        </div>
                        {type === 'tv' && item.number_of_seasons && (
                            <div className="featured-seasons">
                                {/* Número de temporadas (para séries) */}
                                {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                            </div>
                        )}
                        {type === 'movie' && item.runtime && (
                            <div className="featured-runtime"> 
                                {/* Duração do filme (para filmes) */}
                                {item.runtime} minutos 
                            </div>
                        )}
                    </div>
                    <div className="movie-description">
                        {/* Descrição do filme ou série */}
                        {item.overview}
                    </div>
                    <div className="featured-buttons">
                        {/* Botão para adicionar aos favoritos */}
                        <FavoriteButton item={item} />
                    </div>
                    {genres && (
                        <div className="featured-genres">
                            {/* Gêneros do filme ou série */}
                            <strong>{item.genres.length > 1 ? 'Gêneros' : 'Gênero'}:</strong> {genres}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default MovieDetail;
