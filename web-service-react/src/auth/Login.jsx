import React, { useState } from 'react';
import './auth.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Register from './Register';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Здесь можно выполнить необходимые действия, например, отправку данных на сервер
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <body>
        <Header/>
        <main className="main">
            <div className="auth-container login">
                <h1 className="enter">Вход</h1>
                <div className="auth-methods">
                    <button>ПОЧТА</button>
                    <button>ТЕЛЕФОН</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">ПРОДОЛЖИТЬ</button>
                </form>
                <p>Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
            </div>
        </main>
        <Footer/>
        </body>
    );
}

export default LoginForm;