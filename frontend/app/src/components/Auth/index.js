import React, { useState } from "react"; // Importa o React e o hook useState
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import "./login.css"; // Importa o arquivo CSS para estilização da página
import api from '../../services/api'; // Importa a instância do axios para fazer as requisições à API
import { toast } from "react-toastify"; 

const Login = () => {
  // Hook useState para gerenciar o estado se o usuário está registrando ou logando
  const [isRegister, setIsRegister] = useState(false);

  // Hook useState para armazenar os dados do formulário (nome de usuário, senha, e email)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const navigate = useNavigate(); // Hook para facilitar a navegação entre páginas

  // Função para lidar com mudanças nos campos do formulário
  // Atualiza o estado de formData conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestrutura o nome e valor do campo que foi modificado
    setFormData({
      ...formData, // Mantém os outros valores que já estavam no estado
      [name]: value // Atualiza o campo específico (username, password ou email)
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário, que é recarregar a página
    
    try {
      // Define o endpoint com base no estado de isRegister
      // Se for registro, usa o endpoint '/register', senão usa '/login'
      const endpoint = isRegister ? '/register' : '/login';
      
      // Faz a requisição POST para o endpoint correspondente com os dados do formulário
      const response = await api.post(endpoint, formData);

      // Se a resposta for de sucesso (status 200)
      if (response.status === 200) {
        if (!isRegister) {
          // Se for login, salva o token de autenticação no localStorage
          localStorage.setItem('authToken', response.data.token);

          // Salva o nome de usuário e o ID do usuário no localStorage
          localStorage.setItem('username', formData.username);
          localStorage.setItem('userId', response.data.userId);
        }

        // Após login ou registro bem-sucedido, aguarda 2 segundos e navega para a página home
        setTimeout(() => navigate('/home'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      {/* Container principal da tela de login */}
      <div className="login-box">
        {/* Exibe o logo da aplicação */}
        <img src="/images/logo-verzelflix.png" alt="verzelflix" />
        
        {/* Formulário de login/registro */}
        <form onSubmit={handleSubmit}>
          {/* Campo para nome de usuário */}
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username} // Valor atrelado ao estado formData
            onChange={handleChange} // Chama handleChange quando o usuário digita
            required // Campo obrigatório
          />

          {/* Condicional: exibe o campo de email apenas se o usuário estiver se registrando */}
          {isRegister && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email} // Valor atrelado ao estado formData
              onChange={handleChange} // Chama handleChange quando o usuário digita
              required // Campo obrigatório
            />
          )}
          
          {/* Campo para senha */}
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password} // Valor atrelado ao estado formData
            onChange={handleChange} // Chama handleChange quando o usuário digita
            required // Campo obrigatório
          />
         
          {/* Botão de submissão, o texto muda com base no estado (login ou registrar) */}
          <button type="submit" className="submit-btn">
            {isRegister ? "Registrar" : "Login"}
          </button>
        </form>

        {/* Texto de alternância entre as opções de login e registro */}
        <p onClick={() => setIsRegister(!isRegister)} className="toggle">
          {isRegister ? "Já tem uma conta? Faça login" : "Novo por aqui? Registre-se agora"}
        </p>
      </div>
    </div>
  );
};

export default Login;
