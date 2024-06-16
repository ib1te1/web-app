import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pendingOrders.css';

function PendingOrders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const executorId = sessionStorage.getItem('userId');

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/pending-orders', {
                params: { executorId }
            });
            setPendingOrders(response.data);
        } catch (error) {
            console.error('Error fetching pending orders:', error);
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await axios.post('http://localhost:8080/order/update-status', null, {
                params: { orderId, status }
            });
            fetchPendingOrders();  // Refresh the list of pending orders
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <main className="main">
            <div className="pending-orders-container">
                <h2>Подтверждение заказов</h2>
                <ul className="pending-orders-list">
                    {pendingOrders.map(order => (
                        <li key={order.id} className="pending-order-card">
                            <div className="order-info">
                                <p><strong>Описание задачи:</strong> {order.description}</p>
                                <p><strong>Дата начала:</strong> {order.startDate}</p>
                                <p><strong>Дата окончания:</strong> {order.endDate}</p>
                                <p><strong>Заказчик:</strong> {order.user.firstname} {order.user.surname}</p>
                            </div>
                            <div className="order-actions">
                                <button onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')} className="confirm-button">Подтвердить</button>
                                <button onClick={() => handleUpdateStatus(order.id, 'REJECTED')} className="reject-button">Отклонить</button>
                            </div>
                        </li>
                    ))}
                    {pendingOrders.length === 0 && <div>Нет заказов для подтверждения</div>}
                </ul>
            </div>
        </main>
    );
}

export default PendingOrders;