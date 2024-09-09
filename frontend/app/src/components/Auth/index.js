import React, { useState } from "react";
import "./login.css"; // Arquivo de estilos

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // Alterna entre login e registro
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // Lógica para registrar o usuário
      console.log("Registrando:", formData);
    } else {
      // Lógica para login
      console.log("Logando:", formData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <img src="/images/logo-verzelflix.png" alt="verzelflix"/>
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
