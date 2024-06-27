import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newOrder, setNewOrder] = useState({ title: '', description: '' });
    const [editOrder, setEditOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders', error);
            setLoading(false);
        }
    };

    const handleCreateOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/orders', newOrder);
            setOrders([...orders, response.data]);
            setNewOrder({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating order', error);
        }
    };

    const handleUpdateOrder = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/orders/${editOrder.id}`, editOrder);
            const updatedOrders = orders.map((order) => (order.id === editOrder.id ? editOrder : order));
            setOrders(updatedOrders);
            setEditOrder(null);
        } catch (error) {
            console.error('Error updating order', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/orders/${orderId}`);
            const updatedOrders = orders.filter((order) => order.id !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order', error);
        }
    };

    const handleEditClick = (order) => {
        setEditOrder({ ...order });
    };

    return (
        <div>
            <h2>Orders</h2>
            <div>
                <h3>Create Order</h3>
                <input
                    type="text"
                    value={newOrder.title}
                    onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={newOrder.description}
                    onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                    placeholder="Description"
                />
                <button onClick={handleCreateOrder}>Create</button>
            </div>
            <div>
                <h3>Update Order</h3>
                {editOrder && (
                    <div>
                        <input
                            type="text"
                            value={editOrder.title}
                            onChange={(e) => setEditOrder({ ...editOrder, title: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editOrder.description}
                            onChange={(e) => setEditOrder({ ...editOrder, description: e.target.value })}
                        />
                        <button onClick={handleUpdateOrder}>Save</button>
                    </div>
                )}
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <div>{order.title}</div>
                            <div>{order.description}</div>
                            <button onClick={() => handleEditClick(order)}>Edit</button>
                            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrders;