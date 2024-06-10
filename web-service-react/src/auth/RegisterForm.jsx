import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [firstname, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/registration', {
                    firstname: firstname,
                    surname: surname,
                    phone: phone,
                    email: email,
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
                );

            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <>
            <main className="main">
                <div className="auth-container">
                    <h1>Регистрация</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={surname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Номер телефона"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Придумайте логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">ПРОДОЛЖИТЬ</button>
                    </form>
                    <p>У вас уже есть аккаунт? <Link to="/auth/login">Войти</Link></p>
                </div>
            </main>
        </>
    );
}

export default RegisterForm;
