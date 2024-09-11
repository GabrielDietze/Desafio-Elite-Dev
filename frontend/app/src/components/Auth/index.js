import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import api from '../../services/api'; // Importa a instância do axios

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const navigate = useNavigate(); // Hook para navegação

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

      if (response.status === 200) {
        if (!isRegister) {
          // Assumindo que a resposta inclui um token
          localStorage.setItem('authToken', response.data.token);
        }

        // Substitua o alert por toastify
        toast.success(isRegister ? "Registrado com sucesso!" : "Logado com sucesso!");

        // Redirecione para a página home após login ou registro
        setTimeout(() => navigate('/home'), 2000); // Aguarda 2 segundos para a navegação
      }
    } catch (error) {
      console.error("Erro:", error);
      if (error.response) {
        toast.error("Erro: " + error.response.data.msg); // Substitui alert por toastify
      } else {
        toast.error("Erro: Não foi possível conectar ao servidor.");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Container para o react-toastify com posição no centro */}
      <ToastContainer position="top-center" />
      <div className="login-box">
        <img src="/images/logo-verzelflix.png" alt="verzelflix" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
          <button type="submit" className="submit-btn">
            {isRegister ? "Registrar" : "Login"}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} className="toggle">
          {isRegister ? "Já tem uma conta? Faça login" : "Novo por aqui? Registre-se agora"}
        </p>
      </div>
    </div>
  );
};

export default Login;
