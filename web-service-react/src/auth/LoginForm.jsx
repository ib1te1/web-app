import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './auth.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
            console.log('Успешный вход:', response.data.userId);
            login(response.data.token);
            sessionStorage.setItem('userId', response.data.userId);
            sessionStorage.setItem('role', response.data.role);
            console.log(response.data.role)
            console.log("Идентификатор пользователя сохранен в sessionStorage:", sessionStorage.getItem('userId'));
            console.log(sessionStorage.getItem('role'))
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Неверный логин или пароль.');
            }
            console.error('Ошибка при входе:', error);
        }
    };

    return (
        <>
            <main className="main">
                <div className="auth-container login">
                    <h1 className="enter">Вход</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
