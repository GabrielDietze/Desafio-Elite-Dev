import axios from 'axios';

// Crie uma instância do Axios com a URL base
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Adicione um interceptor para todas as requisições
api.interceptors.request.use(
  config => {
    // Tente obter o token do localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Se o token estiver disponível, adicione-o ao cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Se houver um erro na solicitação, rejeite a Promise
    return Promise.reject(error);
  }
);

export default api;
