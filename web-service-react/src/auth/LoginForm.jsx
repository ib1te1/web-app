import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './auth.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Успешный вход:', response.data);
            login(response.data.token);
            sessionStorage.setItem('userId', response.data);
            console.log("Идентификатор пользователя сохранен в sessionStorage:", sessionStorage.getItem('userId'));
            navigate('/');
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    };

    return (
        <>
            <main className="main">
                <div className="auth-container login">
                    <h1 className="enter">Вход</h1>
                    <form onSubmit={handleSubmit} method="POST">
                        <input
                            type="text"
                            placeholder="Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">ПРОДОЛЖИТЬ</button>
                    </form>
                    <p>Еще нет аккаунта? <Link to="/auth/registration">Зарегистрироваться</Link></p>
                </div>
            </main>
        </>
    );
}

export default LoginForm;
