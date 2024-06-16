import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './taskform.css';

function TaskForm({category}) {
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('itemId');


    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(itemId);
        let apiUrl = 'http://localhost:8080/task/create';
        if (itemId!=null) {
            apiUrl = 'http://localhost:8080/order/create-with-task';
        }

        try {
            const response = await axios.post(apiUrl, {
                userId,
                taskName,
                taskDetails,
                startDate,
                endDate,
                priceFrom,
                priceTo,
                category,
                itemId,
            }, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            console.log('Task created successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.log(userId);
            console.log(itemId);
            console.error('Error creating task:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/catalog');
    };

    return (
        <main className="main">
            <div className="task-form-container">
                <h1>Что конкретно нужно сделать?</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Короткое название задачи"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <textarea
                        placeholder="Расскажите подробнее про задачу"
                        value={taskDetails}
                        onChange={(e) => setTaskDetails(e.target.value)}
                    />
                    <div className="date-range">
                        <p>Укажите сроки</p>
                        <div className="sroki">
                            <input
                                type="date"
                                placeholder="Дата начала"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                                type="date"
                                placeholder="Дата конца"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="price-range">
                        <p>Укажите ценовой диапозон</p>
                        <div className="prices">
                            <input
                                type="number"
                                placeholder="от"
                                value={priceFrom}
                                onChange={(e) => setPriceFrom(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="до"
                                value={priceTo}
                                onChange={(e) => setPriceTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit">Предложить заказ</button>
                </form>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Заказчик рассмотрит ваше предложение</p>
                            <button onClick={handleModalClose}>ОК</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default TaskForm;