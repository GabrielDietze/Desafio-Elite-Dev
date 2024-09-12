import React, { useState } from 'react'; 
import api from '../../../../services/api'; // Importa a instância de API para fazer requisições
import './ButtonExport.css'; // Importa o CSS para estilização do componente
import { toast } from 'react-toastify'; // Importa a função de toast para notificações

export default function SharedFavorites() {
  const [shareLink, setShareLink] = useState(null); // Estado para armazenar o link de compartilhamento
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const userId = localStorage.getItem('userId'); // Obtém o userId do localStorage

  // Função para lidar com o compartilhamento de favoritos
  const handleShareFavorites = async () => {
      // Faz uma requisição POST para gerar o link de compartilhamento
      const response = await api.post(`/favorites/shared/${userId}`);
      setShareLink(response.data.shareLink); // Atualiza o estado com o link de compartilhamento
      setShowModal(true); // Exibe o modal
    
  };

  // Função para copiar o link para a área de transferência
  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink); // Copia o link para a área de transferência
      toast.success('Link copiado para a área de transferência!', { // Exibe uma notificação de sucesso
        autoClose: 3000, // Define o tempo de exibição da notificação (3 segundos)
      });
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false); // Atualiza o estado para fechar o modal
  };

  return (
    <div>
      <button className='link-favorite' onClick={handleShareFavorites}>Exportar favoritos</button>

      {/* Exibe o modal se showModal for verdadeiro */}
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Compartilhar Favoritos</h2>
            <p>Link gerado:</p>
            <input type='text' value={shareLink} readOnly className='share-link-input' />
            <div className='modal-buttons'>
              <button className='copy-button' onClick={handleCopyLink}>Copiar</button>
              <button className='ok-button' onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
