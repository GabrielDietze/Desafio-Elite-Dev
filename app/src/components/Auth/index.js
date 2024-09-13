import React, { useState } from "react"; // Importa o React e o hook useState
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import "./login.css"; // Importa o arquivo CSS para estilização da página
import api from '../../services/api'; // Importa a instância do axios para fazer as requisições à API
import { toast } from "react-toastify"; 

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [loading, setLoading] = useState(false); // Estado para gerenciar a tela de carregamento
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const response = await api.post(endpoint, formData);
  
      if (response.status === 200 || response.status === 201) {
        if (!isRegister) {
          // Se for login, salva os dados no localStorage
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('username', formData.username);
          localStorage.setItem('userId', response.data.userId);
          
          // Exibe a tela de carregamento antes de redirecionar
          setLoading(true);
          setTimeout(() => navigate('/home'), 2000);
        } else {
          // Se for registro, muda para o formulário de login
          setIsRegister(false);
          setFormData({ username: "", password: "", email: "" });
          toast.success("Registro bem-sucedido! Agora você pode fazer login.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Ocorreu um erro. Tente novamente.");
    }
  };
  

  return (
    <div className="login-container">
      {loading ? (
        <div className='loading'>
          <img src="https://media1.tenor.com/m/UnFx-k_lSckAAAAC/amalie-steiness.gif" alt="Carregando" />
        </div>
      ) : (
        <div className="login-box">
          <img src="/images/logo-verzelflix.png" alt="verzelflix" />
          
          {/* Formulário de login/registro */}
          <form onSubmit={handleSubmit}>
            {/* Campo para nome de usuário */}
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              value={formData.username}
              onChange={handleChange}
              required
            />

            {/* Campo de email (apenas para registro) */}
            {isRegister && (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            )}
            
            {/* Campo para senha */}
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            {/* Botão de envio do formulário */}
            <button type="submit" className="submit-btn">
              {isRegister ? "Registrar" : "Login"}
            </button>
          </form>

          {/* Texto para alternar entre login e registro */}
          <p onClick={() => setIsRegister(!isRegister)} className="toggle">
            {isRegister ? "Já tem uma conta? Faça login" : "Novo por aqui? Registre-se agora"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
