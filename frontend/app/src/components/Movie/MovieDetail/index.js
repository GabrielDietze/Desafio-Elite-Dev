import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import Header from '../../header';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { type, id } = useParams(); // Pega o parâmetro type e id da URL
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const baseUrl = `https://api.themoviedb.org/3/${type}/${id}?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18`;
            const response = await fetch(baseUrl);
            const data = await response.json();
            setItem(data);
        };
        fetchItem();
    }, [type, id]);

    if (!item) {
        return <div>Carregando...</div>;
    }

    const genres = item.genres ? item.genres.map((genre) => genre.name).join(', ') : '';

    return (
        <>
            <div className='header-movie-detail'>
                <Header />
            </div>
            <section className="movie" style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `linear-gradient(to right, #111 30%, transparent 70%), linear-gradient(to top, rgba(0, 0, 0, 0.7) 10%, transparent 90%), url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}>
                <div className="featured-name"> {item.title || item.original_name} </div>
                <div className="featured-info">
                    <div className="featured-points"> Nota: {item.vote_average.toFixed(1)} </div>
                    <div className="featured-year">
                        {new Date(item.release_date || item.first_air_date).getFullYear()}
                    </div>
                    {type === 'tv' && item.number_of_seasons && (
                        <div className="featured-seasons">
                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    )}
                    {type === 'movie' && item.runtime && (
                        <div className="featured-runtime"> {item.runtime} minutos </div>
                    )}
                </div>
                <div className="movie-description"> {item.overview} </div>
                <div className="featured-buttons">
                    <a href={`/movie/${item.id}`} className="featured-FavoriteButton"> + Adicionar Aos Favoritos </a>
                </div>
                {genres && (
                    <div className="featured-genres">
                        <strong>{item.genres.length > 1 ? 'Gêneros' : 'Gênero'}:</strong> {genres}
                    </div>
                )}
            </section>
        </>
    );
};

export default MovieDetail;
