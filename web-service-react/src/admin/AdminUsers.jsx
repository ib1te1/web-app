import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ username: '', email: '' });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch users', error);
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({ username: '', email: '' });
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/users/${editUser.id}`, editUser);
            const updatedUsers = users.map((user) => (user.id === editUser.id ? editUser : user));
            setUsers(updatedUsers);
            setEditUser(null);
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/users/${userId}`);
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEditClick = (user) => {
        setEditUser({ ...user });
    };

    return (
        <div>
            <h2>Users</h2>
            <div>
                <h3>Create User</h3>
                <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Username"
                />
                <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Email"
                />
                <button onClick={handleCreateUser}>Create</button>
            </div>
            <div>
                <h3>Update User</h3>
                {editUser && (
                    <div>
                        <input
                            type="text"
                            value={editUser.username}
                            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                        />
                        <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        />
                        <button onClick={handleUpdateUser}>Save</button>
                    </div>
                )}
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.email}</div>
                            <button onClick={() => handleEditClick(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminUsers;