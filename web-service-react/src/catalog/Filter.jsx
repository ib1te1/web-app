import React, { useState } from 'react';
import './filter.css';

const Filter = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ category, priceFrom, priceTo });
    };

    const categories = [
        { id: '', name:'Все'},
        { id: '1', name: 'Электрика' },
        { id: '2', name: 'Сантехника' },
        { id: '3', name: 'Вывоз мусора' },
        { id: '4', name: 'Ремонт и установка замков' },
        { id: '5', name: 'Дезинсекция' },
        { id: '6', name: 'Прочее' },
        { id: '7', name: 'Хозяйство и уборка' },
        { id: '8', name: 'Тренеры' },
        { id: '9', name: 'Компьютеры и IT' },
        { id: '10', name: 'Организация мероприятий' },
        { id: '11', name: 'Дизайнеры' },
        { id: '12', name: 'Юристы' },
        { id: '13', name: 'Фото, видео, аудио' },
        { id: '14', name: 'Аренда' },
        { id: '15', name: 'Артисты' },
        { id: '16', name: 'Услуги для животных' },
        { id: '17', name: 'Творчество, рукоделие и хобби' },
    ];

    return (
        <div className="filter">
            <h3 className="filter-title">Фильтр</h3>
            <div className="filter-category">
                <label className="filter-label">Категория:</label>
                <ul className="filter-list">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={category === cat.id ? 'selected' : ''}
                        >
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="filter-price">
                <label className="filter-label">Цена:</label>
                <div className="filter-price-inputs">
                    <input
                        type="text"
                        placeholder="от"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="до"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                    />
                </div>
            </div>
            <button className="filter-button" onClick={handleFilterChange}>Показать</button>
        </div>
    );
};

export default Filter;