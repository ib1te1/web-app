// Footer.js
import React from 'react';
import './footerStyle.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                ZIPK
            </div>
            <div className="footer-columns">
                <div className="firstColumn">
                    <div>Главная</div>
                    <div>Каталог</div>
                    <div>Создать заказ</div>
                    <div>Мои заказы</div>
                    <div>Профиль</div>
                </div>

                <div className="secondColumn">
                    <div>Помощь</div>
                    <div>О сервисе</div>
                    <div>Пользовательское соглашение</div>
                    <div>ООО "Сервисы размещения объявлений"</div>
                </div>

                <div className="thirdColumn">
                    <div>Служба поддержки:</div>
                    <div>+7(927)123 45 67</div>
                    <div>По юридическим вопросам:</div>
                    <div>artem@mail.ru</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;