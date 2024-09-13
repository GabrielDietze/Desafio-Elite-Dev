import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e useNavigate para navegação
import { useLocation } from "react-router-dom"; // Importa useLocation para obter informações sobre a URL atual
import './header.css'; // Importa o arquivo de estilo CSS
import SearchIcon from '@mui/icons-material/Search'; // Importa ícone de busca
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Importa ícone de seta para baixo
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Importa ícone de seta para cima
import api from '../../services/api'; // Importa a instância da API para fazer requisições

const Header = ({ black, onSearch, isSearching }) => { 
    const location = useLocation(); // Obtém a localização atual
    const [activePage, setActivePage] = useState(''); // Estado para armazenar a página ativa
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a abertura do menu do usuário
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor da busca
    const [timeoutId, setTimeoutId] = useState(null); // Estado para armazenar o ID do timeout
    const navigate = useNavigate(); // Hook para navegação programática

    useEffect(() => {
        // Atualiza a página ativa com base na localização atual
        setActivePage(location.pathname);
    }, [location]);

    // Função de busca com debounce
    const handleSearch = useCallback(async (term) => {
        if (term.trim()) {
            const response = await api.get(`/search/movies-and-tv-shows`, {
                params: {
                    query: term
                }
            });

            // Passa os resultados de busca para o componente pai
            onSearch({
                movies: response.data.movies,
                tvShows: response.data.tvShows
            });
        }
    }, [onSearch]);

    useEffect(() => {
        // Limpa o timeout anterior, se houver
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Define um novo timeout para realizar a busca com atraso
        const id = setTimeout(() => {
            handleSearch(searchTerm);
        }, 300); // 300ms de atraso após o usuário parar de digitar

        setTimeoutId(id);

        // Função de cleanup para limpar o timeout
        return () => {
            clearTimeout(id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, handleSearch]); // Dependências: searchTerm e handleSearch

    const toggleMenu = () => {
        // Alterna a visibilidade do menu do usuário
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        // Remove o token de autenticação e redireciona para a página de login
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    // Verifica se a rota atual está nas rotas em que o componente de pesquisa deve ser ocultado
    const hideSearch = ['/favorites', '/favorites/shared', '/movie'].some(path => location.pathname.startsWith(path));

    return (
        <header className={`${black ? 'black' : ''} ${isSearching ? 'search-active' : ''}`}>
            <div className="header-logo">
                <img src="/images/logo-verzelflix.png" alt="verzelflix"/>
                <div className="nav-menu">
                    <ul>
                        <li>
                            <a 
                                href="/home" 
                                className={`nav-link ${activePage.includes('/home') ? '' : 'inactive'}`} 
                                data-page="home"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/favorites" 
                                className={`nav-link ${activePage.includes('/favorites') ? '' : 'inactive'}`} 
                                data-page="favorites"
                            >
                                <span className="span-meus-favoritos">Meus</span> Favoritos
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {!hideSearch && (
                <div className="header-search">
                    <div>
                        <SearchIcon className="search-icon" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Buscar" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                    />
                </div>
            )}
            <div className="header-user">
                <img src="/images/user-icon.jpeg" alt="user" onClick={toggleMenu} />
                <div className="user-menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <div className={`user-menu ${menuOpen ? 'show' : ''} `}>
                    <Link to="/profile" className="user-menu-item">Editar Perfil</Link>
                    <div className="user-menu-item" onClick={handleLogout}>Sair</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
