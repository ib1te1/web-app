import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div>
            <h2>Admin Page</h2>
            <div className="admin-links">
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/services">Services</Link>
                <Link to="/admin/categories">Categories</Link>
                <Link to="/admin/users">Users</Link>
            </div>
        </div>
    );
};

export default AdminPage;