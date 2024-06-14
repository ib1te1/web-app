import React, { useState } from 'react';
import axios from 'axios';
import './taskform.css';

function TaskForm() {
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/task/create', {
                taskName,
                taskDetails,
                startDate,
                endDate,
                priceFrom,
                priceTo
            }, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            console.log('Task created successfully:', response.data);
        } catch (error) {
            console.error('Error creating task:', error);
        }
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
                    <div className="price-range">
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
                    <button type="submit">Предложить заказ</button>
                </form>
            </div>
        </main>
    );
}

export default TaskForm;