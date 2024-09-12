import React, { useState, useEffect } from 'react'; 
import Header from '../../../header'; // Importa o componente Header
import './SharedPage.css'; // Importa o arquivo de estilo CSS
import BackButton from '../../../Utils/backbutton/BackButton'; // Importa o componente de botão de voltar
import { useParams, Link } from 'react-router-dom'; // Importa hooks e Link do react-router-dom para roteamento
import api from '../../../../services/api'; // Importa a instância da API para fazer requisições

export default function SharedFavoritesPage() {
  const { token } = useParams(); // Pega o token da URL
  const [favoritesDetails, setFavoritesDetails] = useState([]); // Estado para armazenar detalhes dos favoritos
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [blackHeader, setBlackHeader] = useState(false); // Estado para controlar a cor do cabeçalho

  useEffect(() => {
    // Função para buscar os favoritos compartilhados
    const fetchSharedFavorites = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null); // Limpa erros

        const response = await api.get(`/favorites/shared/${token}`); // Faz a requisição para obter os favoritos

        // Verifica o status da resposta
        if (response.status === 404) {
          setError('Link inválido.'); // Define mensagem de erro para link inválido
          return;
        }

        if (response.status === 400) {
          setError('Link expirado.'); // Define mensagem de erro para link expirado
          return;
        }

        setUserName(response.data.userName); // Define o nome do usuário

        // Obtém detalhes dos favoritos
        const favoriteDetailsPromises = response.data.favoriteMovies.map(async (favorite) => {
          try {
            const { mediaId, mediaType } = favorite;             // Desestrutura os IDs e tipo de mídia

            if (!mediaId || !mediaType) {
              return null; // Retorna null se faltar informação
            }

            let detailResponse;

            // Busca detalhes conforme o tipo de mídia
            if (mediaType === 'tv') {
              detailResponse = await api.get(`/tv/${mediaId}`);
            } else if (mediaType === 'movie') {
              detailResponse = await api.get(`/movie/${mediaId}`);
            } else {
              return null; // Retorna null se tipo de mídia for desconhecido
            }

            return { ...detailResponse.data, mediaType }; // Retorna os dados com tipo de mídia
          } catch (error) {
            return null; // Retorna null se ocorrer erro
          }
        });

        const details = await Promise.all(favoriteDetailsPromises); // Aguarda todas as promessas
        setFavoritesDetails(details.filter(item => item !== null)); // Define os detalhes dos favoritos, excluindo nulos

      } catch (err) {
        // Trata erros de requisição
        if (err.response && err.response.status === 404) {
          setError('Link inválido.');
        } else if (err.response && err.response.status === 400) {
          setError('Link expirado.');
        } else {
          setError('Erro ao carregar favoritos compartilhados.');
        }
      } finally {
        setLoading(false); // Encerra o carregamento
      }
    };

    fetchSharedFavorites(); // Chama a função para buscar favoritos
  }, [token]); // Dependência: token muda quando o componente é montado ou o token é alterado

  useEffect(() => {
    // Função para ajustar a cor do cabeçalho ao rolar a página
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true); // Cabeçalho fica preto ao rolar para baixo
      } else {
        setBlackHeader(false); // Cabeçalho volta ao normal
      }
    };

    window.addEventListener('scroll', scrollListener); // Adiciona listener de scroll

    return () => {
      window.removeEventListener('scroll', scrollListener); // Remove listener de scroll ao desmontar
    };
  }, []); // Efeito executado apenas na montagem e desmontagem do componente

  return (
    <div className='shared-favorites-page'>
      <Header black={blackHeader} /> {/* Componente Header com cor ajustada */}

      <section className='favorites-content'>
        <div className='nav-menu-SharedFavorite'>
          <div className='back-button'>
            <BackButton /> {/* Componente de botão de voltar */}
          </div>
          <h1>Favoritos compartilhados por {userName || 'Usuário desconhecido'}</h1> {/* Exibe nome do usuário ou mensagem padrão */}
        </div>

        {loading && <p>Carregando...</p>} {/* Mensagem de carregamento */}
        {error && <div className='error-message'>{error}</div>} {/* Mensagem de erro centralizada */}

        {favoritesDetails.length > 0 && !error && (
          <div className='favorites-list'>
            {favoritesDetails.map((item) => (
              <div className='favorites-item' key={item.id}>
                <Link to={`/${item.mediaType}/${item.id}`}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                    alt={item.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
