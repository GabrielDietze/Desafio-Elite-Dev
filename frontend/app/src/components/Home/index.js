import React, { useState, useEffect } from 'react';
import './home.css';
import MovieRow from '../Movie/MovieRow';
import FeaturedMovie from '../Movie/FeaturedMovie';
import Header from '../header';
import api from '../../services/api';

async function basicFetch(endpoint, genre = '') {
    try {
        const url = genre ? `${endpoint}?genreId=${genre}` : endpoint;
        const response = await api.get(url);
        console.log(`Fetch para ${url}:`, response.data); // Log para depuração
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
}

export default function Home() {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    async function getMovieInfo(movieId, type) {
        let info = {};

        if (movieId) {
            try {
                switch (type) {
                    case 'movie':
                        info = await basicFetch(`/movie/${movieId}`);   
                        break;
                    case 'tv':
                        info = await basicFetch(`/tv/${movieId}`);
                        break;
                    default:
                        info = null;
                        break;
                }
            } catch (error) {
                console.error(`Erro ao buscar informações do ${type}:`, error);
            }
        }
        return info;
    }

    useEffect(() => {
        const loadAll = async () => {
            try {
                let list = [
                    {
                        slug: "topRated",
                        title: "Top Filmes Hoje",
                        items: await basicFetch('/movie/top_rated')
                    },
                    {
                        slug: "originals",
                        title: "Originais verzelflix",
                        items: await basicFetch('/discover/tv') 
                    },
                    {
                        slug: "action-adventure",
                        title: "Ação e Aventura",
                        items: await basicFetch('/discover/movie', '28') // 28 = Ação
                    },
                    {
                        slug: "farrowest",
                        title: "Farroeste",
                        items: await basicFetch('/discover/movie', '37') // 37 = Farroeste
                    },
                    {
                        slug: "horror",
                        title: "Terror",
                        items: await basicFetch('/discover/movie', '27') // 27 = Terror
                    },
                    {
                        slug: "documentary",
                        title: "Documentário",
                        items: await basicFetch('/discover/movie', '99') // 99 = Documentário
                    },
                    {
                        slug: "romance",
                        title: "Romance",
                        items: await basicFetch('/discover/movie', '10749') // 10749 = Romance
                    },
                    {
                        slug: "comedy",
                        title: "Comédia",
                        items: await basicFetch('/discover/movie', '35') // 35 = Comédia
                    }
                ];

                setMovieList(list);

                // Carregar o filme em destaque (featured) quando o componente for montado
                let originals = list.find(i => i.slug === 'originals');
                let randomChosen = Math.floor(Math.random() * (originals.items.results.length - 1));
                let chosen = originals.items.results[randomChosen];
                let chosenInfo = await getMovieInfo(chosen.id, 'tv');
                setFeaturedData(chosenInfo);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
       <div className='home-page'>
         <Header black={blackHeader}/> 

        {featuredData && <FeaturedMovie item={featuredData} />}

        <section className='lists'>
            {movieList.map((item, key) => (
                <div key={key}>
                <MovieRow title={item.title} items={item.items} />
                </div>
            ))}
        </section>

        <footer>
        Feito para Verzel &copy; 2024, 
        Para mais informações, visite <a href="https://www.linkedin.com/in/gabriel-dietze" target="_blank" rel="noopener noreferrer">meu LinkedIn</a> <br/>
        </footer>

        {movieList.length <= 0 && 
        <div className='loading'>
        <img src="https://media1.tenor.com/m/UnFx-k_lSckAAAAC/amalie-steiness.gif" alt="Carregando" />
        </div>
    }
       </div>
    );
}
