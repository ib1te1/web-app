import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './myOrders.css';

const MyOrders = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (isAuthenticated) {
                try {
                    const userId = sessionStorage.getItem('userId');
                    const response = await axios.get(`http://localhost:8080/my-orders?id=${userId}`);
                    setOrders(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch orders', error);
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [isAuthenticated]);

    const handleCreateOrderClick=()=>{
        navigate('/create-order')
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-container">
            <h1>Мои заказы</h1>
            <button className="create-order-button" onClick={handleCreateOrderClick}>Создать заказ</button>
            <ul className="orders-list">
                {orders.map(order => (
                    <li key={order.id} className="order-card">
                        <div className="order-info">
                            <h2 className="order-title">{order.title}</h2>
                            <div className="order-executor">Исполнитель: {order.executor.firstname} {order.executor.surname}</div>
                            <div className="order-customer">Заказчик: {order.user.firstname} {order.user.surname}</div>
                            <div className="order-description">Описание: {order.description}</div>
                            <div className="order-price">Стоимость: {order.service.priceMin} - {order.service.priceMax} руб за услугу</div>
                            <div className="date-range">Сроки: {order.startDate} - {order.endDate}</div>
                            <div className="order-date">Создан: {order.createdAt}</div>
                            <div className="status">Статус заказа: {order.status}</div>
                        </div>
                        <div className="order-image">
                            {order.executor.profilePicture&& (
                                console.log(order.executor.profilePicture),
                                <img src={`data:image/jpeg;base64,${order.executor.profilePicture}`}
                                     alt={order.title}/>
                            )
                            }

                        </div>
                        <div className="order-rating">
                            {/*<div className="rating-score">{order.rating}</div>*/}
                            {/*<div className="rating-count">{order.ratingCount} оценок</div>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyOrders;