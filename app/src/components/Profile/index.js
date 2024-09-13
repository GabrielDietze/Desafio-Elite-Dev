import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Utils/backbutton/BackButton';
import './profile.css';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
     // Declaração dos estados para armazenar informações do usuário
    const [username, setUsername] = useState(''); // Estado para armazenar o nome de usuário
    const [email, setEmail] = useState(''); // Estado para armazenar o email
    const [password, setPassword] = useState(''); // Estado para armazenar a nova senha
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para armazenar a confirmação da nova senha
    const navigate = useNavigate(); // Hook para navegação entre páginas
    // Recuperar o nome de usuário do localStorage
    const storedUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserData = async () => {
                // Buscar o usuário pelo nome de usuário armazenado
                const { data } = await api.get(`/user/${storedUsername}`);
                const { username, email } = data;

                setUsername(username);
                setEmail(email);
                setPassword(''); // Mantém a senha em branco para segurança
                setConfirmPassword(''); // Mantém a confirmação de senha em branco
        };

        // Buscar dados apenas se o nome de usuário estiver definido
        if (storedUsername) {
            fetchUserData();
        }
    }, [storedUsername]); // Executa quando o storedUsername muda

    const handleSave = async (e) => {
        e.preventDefault();

        // Verificar se a senha e a confirmação de senha coincidem
        if (password && password !== confirmPassword) {
            toast.error('As senhas não coincidem. Tente novamente.');
            return;
        }

        try {
            await api.put(`/user/${storedUsername}`, {
                newUsername: username,
                email,
                password
            });

            // Atualizar o nome de usuário no localStorage se ele foi alterado
            if (username !== storedUsername) {
                localStorage.setItem('username', username);
            }

            // Verificar se a senha foi alterada
            if (password) {
                localStorage.removeItem('authToken'); // Remove o token de autenticação
                toast.info('Senha alterada. Por favor, faça login novamente.');
                setTimeout(() => navigate('/login'), 2000); // Redireciona para login após 2 segundos
            } else {
                toast.success('Dados alterados com sucesso!');
                setTimeout(() => navigate('/home'), 2000); // Redireciona para home após 2 segundos
            }
        } catch (error) {
            toast.error('Erro ao salvar as informações. Tente novamente.');
        }
    };

    return (
        <div className="edit-profile-container">
            <ToastContainer position="top-center" />    
            <div className='content-edit-profile'> 
                <div className="header-edit-profile">
                    <BackButton onClick={() => navigate(-1)} />
                    <h1>Editar Perfil</h1>
                </div>
          
                <form onSubmit={handleSave} className="edit-profile-form">
                    <div className="form-group">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Deixe em branco para manter a senha atual"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua senha"
                        />
                    </div>
                    <button type="submit" className="save-button">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
