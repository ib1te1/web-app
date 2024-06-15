import React, { useState } from 'react';
import TaskForm from '../task/TaskForm';
import '../global.css'
import './createOrderPage.css';
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

    return (
        <main className="main">
            <div className="create-order-container">
                <div className="order-steps">
                    <div>
                        <img className="step1" src={step1} alt="Step 1" />
                        <h2>1. Разместите заказ</h2>
                        <p>Опишите задачу. Если надо, укажите сроки и бюджет.</p>
                    </div>
                    <div>
                        <img className="step2" src={step2} alt="Step 2" />
                        <h2>2. Получите предложения</h2>
                        <p>Исполнители сами откликнутся на ваш заказ. Обсудите детали заказа в чате или по телефону.</p>
                    </div>
                    <div>
                        <img className="step3" src={step3} alt="Step 3" />
                        <h2>3. Выберите исполнителя</h2>
                        <p>Выберите подходящего для вас исполнителя по рейтингу, отзывам и цене.</p>
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
                    {selectedCategory && <TaskForm category={selectedCategory} />}
                </div>
            </div>
        </main>
    );
}

export default CreateOrderPage;