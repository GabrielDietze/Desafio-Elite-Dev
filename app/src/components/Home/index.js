import React, { useState, useEffect } from 'react';
import './home.css'; 
import MovieRow from '../Movie/MovieRow'; // Importa o componente MovieRow
import FeaturedMovie from '../Movie/FeaturedMovie'; // Importa o componente FeaturedMovie
import Header from '../header'; // Importa o componente Header
import api from '../../services/api'; // Importa a configuração da API

// Função assíncrona para buscar dados de um endpoint
async function basicFetch(endpoint, genre = '') {
    try {
        // Adiciona o parâmetro de gênero se fornecido
        const url = genre ? `${endpoint}?genreId=${genre}` : endpoint;
        const response = await api.get(url); // Faz a requisição para a API
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error; // Lança o erro se a requisição falhar
    }
}

export default function Home() {
    const [movieList, setMovieList] = useState([]); // Estado para armazenar a lista de filmes
    const [featuredData, setFeaturedData] = useState(null); // Estado para armazenar o filme em destaque
    const [blackHeader, setBlackHeader] = useState(false); // Estado para controlar o fundo do cabeçalho
    const [isSearching, setIsSearching] = useState(false); // Estado para saber se a busca está ativa

    // Função para lidar com os resultados da busca
    const handleSearchResults = (results) => {
        setIsSearching(true); // Ativa o estado de busca

        // Verifica se há filmes ou séries nos resultados
        const hasMovies = results.movies && results.movies.length > 0;
        const hasTVShows = results.tvShows && results.tvShows.length > 0;

        // Define a lista de filmes com base nos resultados da busca
        if (!hasMovies && !hasTVShows) {
            setMovieList([
                {
                    slug: "searchResults",
                    title: "Nenhum filme ou série encontrado.",
                    items: { results: [] }
                }
            ]);
        } else {
            // Exibe resultados separados para filmes e séries
            setMovieList([
                {
                    slug: "searchMovies",
                    title: hasMovies ? "Resultados de Filmes" : "Nenhum filme encontrado",
                    items: { results: results.movies || [] }
                },
                {
                    slug: "searchTVShows",
                    title: hasTVShows ? "Resultados de Séries" : "Nenhuma série encontrada",
                    items: { results: results.tvShows || [] }
                }
            ]);
        }
    };

    // Função assíncrona para buscar informações detalhadas sobre um filme ou série
    async function getMovieInfo(movieId, type) {
        let info = {};

        if (movieId) {
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
        }
        return info; // Retorna as informações detalhadas
    }

    // Efeito colateral para carregar dados iniciais quando o componente é montado
    useEffect(() => {
        const loadAll = async () => {
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

            setMovieList(list); // Atualiza a lista de filmes

            // Carrega o filme em destaque
            let originals = list.find(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals.items.results.length - 1));
            let chosen = originals.items.results[randomChosen];
            let chosenInfo = await getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo); // Atualiza o filme em destaque
        };

        loadAll();
    }, []);

    // Efeito colateral para adicionar ou remover a classe de cabeçalho preto com base no scroll
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
            <Header onSearch={handleSearchResults} black={blackHeader} isSearching={isSearching} />
            
            <div>
                {isSearching ? null : ( // Verifica se está pesquisando
                    featuredData && (
                        <FeaturedMovie item={featuredData} />
                    )
                )}
            </div>

            <section className={`lists${isSearching ? '-search-active' : ''}`}>
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
