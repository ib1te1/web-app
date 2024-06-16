import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../task/taskform.css';

function ServiceForm({ category }) {
    const [serviceName, setServiceName] = useState('');
    const [serviceDetails, setServiceDetails] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const executorId = sessionStorage.getItem('userId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(category)
        try {
            const response = await axios.post('http://localhost:8080/service/create', {
                executorId,
                serviceName,
                serviceDetails,
                priceFrom,
                priceTo,
                category
            }, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            console.log('Service created successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.log(executorId)
            console.log(category)
            console.error('Error creating service:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/catalog');
    };

    return (
        <main className="main">
            <div className="task-form-container">
                <h1>Опишите услугу</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Короткое название услуги"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                    <textarea
                        placeholder="Расскажите подробнее про услугу"
                        value={serviceDetails}
                        onChange={(e) => setServiceDetails(e.target.value)}
                    />
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
                    <button type="submit">Предложить услугу</button>
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

export default ServiceForm;