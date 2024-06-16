import React, { useState } from 'react';
import TaskForm from '../task/TaskForm';
import ServiceForm from '../services/ServiceForm';
import '../global.css';
import '../orders/createTaskPage.css';
import step1 from '../images/step1.jpg';
import step2 from '../images/step2.jpg';
import step3 from '../images/step3.jpg';

const categories = [
    'Электрика', 'Сантехника', 'Вывоз мусора',
    'Ремонт и установка замков', 'Дезинсекция', 'Прочее',
    'Дизайнеры', 'Хозяйство и уборка', 'Тренеры',
    'Компьютеры и IT', 'Организация мероприятий',
    'Фото, видео, аудио', 'Юристы', 'Творчество, рукоделие и хобби',
    'Охрана', 'Аренда', 'Услуги для животных', 'Артисты'
];

function CreateOrderPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const storedRole = sessionStorage.getItem('role');
    console.log(storedRole)

    return (
        <main className="main">
            <div className="create-task-container">
                <div className="order-steps">
                    <div>
                        <img className="step1" src={step1} alt="Step 1" />
                        <h2>1. Разместите {storedRole === 'ROLE_USER' ? 'заказ' : 'услугу'}</h2>
                        <p>Опишите {storedRole === 'ROLE_USER' ? 'задачу' : 'услугу'}. Если надо, укажите сроки и бюджет.</p>
                    </div>
                    <div>
                        <img className="step2" src={step2} alt="Step 2" />
                        <h2>2. Получите предложения</h2>
                        <p>{storedRole === 'ROLE_USER' ? 'Исполнители' : 'Заказчика'} сами откликнутся на ваш {storedRole === 'ROLE_USER' ? 'услугу' : 'заказ'}. Обсудите детали в чате или по телефону.</p>
                    </div>
                    <div>
                        <img className="step3" src={step3} alt="Step 3" />
                        <h2>3. Выберите {storedRole === 'ROLE_USER' ? 'исполнителя' : 'заказчика'}</h2>
                        <p>Выберите подходящего для вас {storedRole === 'ROLE_USER' ? 'заказчика' : 'исполнителя'} по рейтингу, отзывам и цене.</p>
                    </div>
                </div>
                <div className="order-form">
                    <div className="category-selection">
                        <h2>Выберите подходящую категорию</h2>
                        <div className="categories">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCategory(category)}
                                    className={selectedCategory === category ? 'active' : ''}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    {storedRole === 'ROLE_USER' ?  <TaskForm category={selectedCategory} /> :<ServiceForm category={selectedCategory} />}
                </div>
            </div>
        </main>
    );
}

export default CreateOrderPage;