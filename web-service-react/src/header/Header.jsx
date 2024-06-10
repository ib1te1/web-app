import React from 'react';
import { Link } from 'react-router-dom';
import './headerStyle.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                ZIPK
            </div>
            <nav className="headerLinks">
                <Link to="/">Главная</Link>
                <Link to="/catalog">Каталог</Link>
                <Link to="/create-order">Создать заказ</Link>
                <Link to="/my-orders">Мои заказы</Link>
                <Link to="/auth/login" className="authLink">Вход/Регистрация</Link>
            </nav>
        </header>
    );
}

export default Header;