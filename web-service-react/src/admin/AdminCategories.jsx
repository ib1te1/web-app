import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/categories');
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            setLoading(false);
        }
    };

    const handleCreateCategory = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/categories', newCategory);
            setCategories([...categories, response.data]);
            setNewCategory({ name: '' });
        } catch (error) {
            console.error('Error creating category', error);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/categories/${editCategory.id}`, editCategory);
            const updatedCategories = categories.map((category) => (category.id === editCategory.id ? editCategory : category));
            setCategories(updatedCategories);
            setEditCategory(null);
        } catch (error) {
            console.error('Error updating category', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/categories/${categoryId}`);
            const updatedCategories = categories.filter((category) => category.id !== categoryId);
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error deleting category', error);
        }
    };

    const handleEditClick = (category) => {
        setEditCategory({ ...category });
    };

    return (
        <div>
            <h2>Categories</h2>
            <div>
                <h3>Create Category</h3>
                <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Name"
                />
                <button onClick={handleCreateCategory}>Create</button>
            </div>
            <div>
                <h3>Update Category</h3>
                {editCategory && (
                    <div>
                        <input
                            type="text"
                            value={editCategory.name}
                            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                        />
                        <button onClick={handleUpdateCategory}>Save</button>
                    </div>
                )}
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <div>{category.name}</div>
                            <button onClick={() => handleEditClick(category)}>Edit</button>
                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminCategories;