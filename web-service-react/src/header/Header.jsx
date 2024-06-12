import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './headerStyle.css';

function Header() {
    const { isAuthenticated,logout } = useContext(AuthContext);

    const handleLogout=()=>{
        logout();
    }
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">ZIPK</Link>
            </div>
            <nav className="headerLinks">
                <Link to="/">Главная</Link>
                <Link to="/catalog">Каталог</Link>
                <Link to="/create-order">Создать заказ</Link>
                <Link to="/my-orders">Мои заказы</Link>
                {isAuthenticated ? (
                    <Link to="/user/details" className="authLink">Профиль</Link>
                ) : (
                    <Link to="/auth/login" className="authLink">Вход/Регистрация</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;