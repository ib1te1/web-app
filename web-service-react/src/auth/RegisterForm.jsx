import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [firstname, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_USER');
    const [errorMessage, setErrorMessage] = useState('');
    const [gender, setGender] = useState('MALE');
    const [description, setDescription] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/auth/login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) { // Проверяем, что пароли совпадают
            setErrorMessage('Пароли не совпадают');
            return; // Прерываем выполнение функции, если пароли не совпадают
        }
        try {
            const registrationData = {
                firstname: firstname,
                surname: surname,
                phone: phone,
                email: email,
                gender: gender,
                username: username,
                password: password,
                role: role,
            };

            // Add executor-specific fields if role is ROLE_EXECUTOR
            if (role === 'ROLE_EXECUTOR') {
                registrationData.description = description;
                registrationData.workExperience = parseFloat(workExperience);
            }

            const response = await axios.post('http://localhost:8080/auth/registration', registrationData, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            console.log('Registration successful:', response.data);
            setShowModal(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Такой пользователь уже существует');
            } else if (error.response && error.response.status === 500) {
                setErrorMessage('Неверный формат номера телефона');
            } else {
                setErrorMessage('Ошибка регистрации');
            }
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
                        <div className="gender-select">
                            <label>
                                <input
                                    type="radio"
                                    value="MALE"
                                    checked={gender === 'MALE'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Мужчина
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="FEMALE"
                                    checked={gender === 'FEMALE'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Женщина
                            </label>
                        </div>
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
                        <input
                            type="password"
                            placeholder="Подтвердите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="role-select">
                            <label>
                                <input
                                    type="radio"
                                    value="ROLE_USER"
                                    checked={role === 'ROLE_USER'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Пользователь
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="ROLE_EXECUTOR"
                                    checked={role === 'ROLE_EXECUTOR'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Исполнитель
                            </label>
                        </div>
                        {role === 'ROLE_EXECUTOR' && (<>
                                <input
                                    type="text"
                                    placeholder="Описание"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Опыт работы (в годах)"
                                    value={workExperience}
                                    onChange={(e) => setWorkExperience(e.target.value)}
                                />
                            </>
                        )}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button type="submit">ПРОДОЛЖИТЬ</button>
                    </form>
                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <p>Вы успешно зарегистрированы</p>
                                <button onClick={handleCloseModal}>ОК</button>
                            </div>
                        </div>
                    )}
                    <p>У вас уже есть аккаунт? <Link to="/auth/login">Войти</Link></p>
                </div>
            </main>
        </>
    );
}

export default RegisterForm;