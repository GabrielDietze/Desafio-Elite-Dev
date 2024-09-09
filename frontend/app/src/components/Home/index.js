import React, { useState, useEffect } from 'react';
import './home.css';
import MovieRow from '../Movie/MovieRow';
import FeaturedMovie from '../Movie/FeaturedMovie';
import Header from '../header';

async function basicFetch(endpoint) {
    const API_URL = 'https://api.themoviedb.org/3';
    const request = await fetch(`${API_URL}${endpoint}`);
    const json = await request.json();
    return json;
}

export default function Home() {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    //vou colocar essa funcao integrada com o back depois, fiz isso pra teste
async function getMovieInfo(movieId, type) {
    let info = {};

    if (movieId) {
        switch (type) {
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18`);
                break;
            case 'tv':
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18`);
                break;
            default:
                info = null;
                break;
        }
    }
    return info;
}


    // Carregar as categorias de filmes (filtradas pela Netflix) quando o componente for montado
    useEffect(() => {
        const loadAll = async () => {
            let list = [
                {
                    slug: "topRated",
                    title: "Top Filmes Hoje",
                    items: await basicFetch('/movie/top_rated?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_networks=213')
                },
                {
                    slug: "originals",
                    title: "Originais verzelflix",
                    items: await basicFetch('/discover/tv?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_networks=213') // 18 = Drama
                },
                {
                    slug: "action-adventure",
                    title: "Ação e Aventura",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=28&with_networks=213') // 28 = Ação
                },
                {
                    slug: "farrowest",
                    title: "Farroeste",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=37&with_networks=213') // 37 = Farroeste
                },
                {
                    slug: "horror",
                    title: "Terror",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=27&with_networks=213') // 27 = Terror
                },
                {
                    slug: "documentary",
                    title: "Documentário",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=99&with_networks=213') // 18 = Documentário
                },
                {
                    slug: "romance",
                    title: "Romance",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=10749&with_networks=213') // 10749 = Romance
                },
                {
                    slug: "comedy",
                    title: "Comédia",
                    items: await basicFetch('/discover/movie?language=pt-BR&api_key=9176897d907d95a90bceec1049b05c18&with_genres=35&with_networks=213') // 35 = Comédia
                }
            ];

            setMovieList(list);      

            // Carregar o filme em destaque (featured) quando o componente for montado
    let originals = list.filter(i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
    };

        loadAll();
    }, []);

    //efeito para mudar a cor do header ao rolar a página
    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
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
        <header>
        {Header(blackHeader)}
        </header>

        {featuredData && <FeaturedMovie item={featuredData} />}

        <section className='lists'>
            {movieList.map((item, key) => (
                <div> 
                <MovieRow key={key} title={item.title} items={item.items} />
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