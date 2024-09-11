import React from "react";
import "./FeaturedMovie.css";
import FavoriteButton from "../../Utils/FavoriteButton/FavoriteButton";

const FeaturedMovie = ({item}) => {
    return (
        <section className="featured" style={
            {backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `linear-gradient(to right, #111 30%, transparent 70%), linear-gradient(to top, rgba(0, 0, 0, 0.7) 10%, transparent 90%), url(https://image.tmdb.org/t/p/original${item.backdrop_path} )`}
        }>
            <div className="featured-name">  {item.original_name}  </div>    
        
            <div className="featured-info">
                <div className="featured-points"> Nota: {item.vote_average.toFixed(1)} </div>
                <div className="featured-year"> {new Date(item.first_air_date).getFullYear()} </div>
                <div className="featured-seasons"> {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''} </div>
            </div>
            <div className="featured-description"> {item.overview} </div>
            <div className="featured-buttons">
                <a href={`/tv/${item.id}`} className="featured-watchbutton"> Ver Mais </a>
                <FavoriteButton itemId={item.id} />
            </div>
            <div className="featured-genres"><strong>{item.genres.length > 1 ? 'Gêneros' : 'Gênero'}:</strong> {item.genres.map((genre) => genre.name).join(', ')}</div>


        </section>
    );
};

export default FeaturedMovie;
