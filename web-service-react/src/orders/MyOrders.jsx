import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './myOrders.css';

const MyOrders = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (isAuthenticated) {
                try {
                    const userId = parseInt(sessionStorage.getItem('userId')); // Convert to integer
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

    const handleCreateOrderClick = () => {
        navigate('/create-order');
    };

    const handleAcceptOrder = (orderId) => {
        axios.post(`http://localhost:8080/order/update-status?orderId=${orderId}&status=IN_PROGRESS`)
    .then(response => {
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: 'IN_PROGRESS' };
                }
                return order;
            });
            setOrders(updatedOrders);
        })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    const handleRejectOrder = (orderId) => {
        axios.post(`http://localhost:8080/order/update-status?orderId=${orderId}&status=CANCELLED`)
    .then(response => {
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: 'CANCELLED' };
                }
                return order;
            });
            setOrders(updatedOrders);
        })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    const handleCompleteOrder = (orderId) => {
        axios.post(`http://localhost:8080/order/update-status?orderId=${orderId}&status=COMPLETED`)
    .then(response => {
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: 'COMPLETED' };
                }
                return order;
            });
            setOrders(updatedOrders);
        })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-container">
            <h1>Мои заказы</h1>
            <button className="create-task-button" onClick={handleCreateOrderClick}>Создать заказ</button>
            <ul className="orders-list">
                {orders.map(order => {


                    const executorId = parseInt(order.executor.id);
                    const userId = parseInt(order.user.id);

                    const isExecutor = executorId === parseInt(sessionStorage.getItem('userId'));
                    const isUser = userId === parseInt(sessionStorage.getItem('userId'));
                    console.log(isExecutor);
                    console.log(isUser);
                    return (
                        <li key={order.id} className="order-card">
                            <div className="order-info">
                                <h2 className="order-title">{order.title}</h2>
                                <div className="order-executor">Исполнитель: {order.executor.firstname} {order.executor.surname}</div>
                                <div className="order-customer">Заказчик: {order.user.firstname} {order.user.surname}</div>
                                <div className="order-description">Описание: {order.description}</div>
                                <div className="order-price">
                                    Стоимость: {order.service ? `${order.service.priceMin} - ${order.service.priceMax}` : `${order.task.priceMin} - ${order.task.priceMax}`} руб за услугу
                                </div>
                                <div className="date-range">Сроки: {order.startDate} - {order.endDate}</div>
                                <div className="order-date">Создан: {order.createdAt}</div>
                                <div className="status">Статус заказа: {order.status}</div>
                            </div>
                            <div className="order-image">
                                {order.executor.profilePicture && (
                                    <img src={`data:image/jpeg;base64,${order.executor.profilePicture}`} alt={order.title} />
                                )}
                            </div>
                            <div className="order-rating">
                            </div>
                            {isExecutor && !isUser&&(
                                <div className="order-actions">
                                    {order.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => handleAcceptOrder(order.id)}>Принять</button>
                                            <button onClick={() => handleRejectOrder(order.id)}>Отклонить</button>
                                        </>
                                    )}
                                    {order.status === 'IN_PROGRESS' && (
                                        <button onClick={() => handleCompleteOrder(order.id)}>Завершить</button>
                                    )}
                                </div>
                            )}
                            {isUser && !isExecutor&&(
                                <div className="order-actions">
                                    {order.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => handleAcceptOrder(order.id)}>Принять</button>
                                            <button onClick={() => handleRejectOrder(order.id)}>Отклонить</button>
                                        </>
                                    )}
                                    {order.status === 'IN_PROGRESS' && (
                                        <button onClick={() => handleCompleteOrder(order.id)}>Завершить</button>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyOrders;