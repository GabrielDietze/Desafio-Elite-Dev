import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../backbutton/BackButton'; 
import './profile.css'; 

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        // Adicione a lógica para salvar as informações aqui
        console.log('Informações salvas:', { username, email, password });
    };

    return (
        <div className="edit-profile-container">
            <div className='content-edit-profile'> 
            <div className="header-edit-profile">
            <BackButton onClick={() => history.goBack()} />
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
                        required
                    />
                </div>
                <button type="submit" className="save-button">Salvar</button>
            </form>
        </div>
        </div>
    );
};

export default EditProfile;
