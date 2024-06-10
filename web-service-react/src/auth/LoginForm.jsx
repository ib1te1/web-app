import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { Link,useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(username+" "+password)
            console.log(`Sending POST request to ${'http://localhost:8080/auth/login'}`);
            const response =await axios({
                method: 'post',
                url: 'http://localhost:8080/auth/login',
                data: {
                    username: username,
                    password: password
                },
                headers: {
                    'Content-Type': "application/json"
                }
            });
            console.log('Login successful:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:');
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