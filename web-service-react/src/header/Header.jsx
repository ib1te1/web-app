import React from 'react';
import './headerStyle.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                ZIPK
            </div>
            <nav className="headerLinks">
                <div>Главная</div>
                <div>Каталог</div>
                <div>Создать заказ</div>
                <div>Мои заказы</div>
                <div className="authLink">Вход/Регистрация</div>
            </nav>
        </header>
    );
}
export default Header;