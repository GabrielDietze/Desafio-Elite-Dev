import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../services/api'; // Certifique-se de importar o 'api'

const Header = ({ black, onSearch }) => { // Adiciona a prop `onSearch`
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor da busca
    const navigate = useNavigate();

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

   // Função de busca
const handleSearch = async () => {
    if (searchTerm.trim()) {
        try {
            const response = await api.get(`/search/movies-and-tv-shows`, {
                params: {
                    query: searchTerm
                }
            });

            // A estrutura dos dados deve ser adaptada com base no retorno do back-end
            console.log(response.data);
            
            // Passa os resultados para o componente pai
            // A estrutura dos dados é: response.data.movies e response.data.tvShows
            onSearch({
                movies: response.data.movies,
                tvShows: response.data.tvShows
            });

        } catch (error) {
            console.error('Erro ao buscar filmes e séries:', error);
        }
    }
};


    return (
        <header className={black ? 'black' : ''}>
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
            <div className="header-search">
                <div>
                    <SearchIcon className="search-icon" onClick={handleSearch} />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Chama a busca ao pressionar Enter
                />
            </div>
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
