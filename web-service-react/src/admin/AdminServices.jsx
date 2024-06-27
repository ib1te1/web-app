import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newService, setNewService] = useState({ name: '', description: '' });
    const [editService, setEditService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/services');
            setServices(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch services', error);
            setLoading(false);
        }
    };

    const handleCreateService = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/services', newService);
            setServices([...services, response.data]);
            setNewService({ name: '', description: '' });
        } catch (error) {
            console.error('Error creating service', error);
        }
    };

    const handleUpdateService = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/services/${editService.id}`, editService);
            const updatedServices = services.map((service) => (service.id === editService.id ? editService : service));
            setServices(updatedServices);
            setEditService(null);
        } catch (error) {
            console.error('Error updating service', error);
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/services/${serviceId}`);
            const updatedServices = services.filter((service) => service.id !== serviceId);
            setServices(updatedServices);
        } catch (error) {
            console.error('Error deleting service', error);
        }
    };

    const handleEditClick = (service) => {
        setEditService({ ...service });
    };

    return (
        <div>
            <h2>Services</h2>
            <div>
                <h3>Create Service</h3>
                <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Description"
                />
                <button onClick={handleCreateService}>Create</button>
            </div>
            <div>
                <h3>Update Service</h3>
                {editService && (
                    <div>
                        <input
                            type="text"
                            value={editService.name}
                            onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editService.description}
                            onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                        />
                        <button onClick={handleUpdateService}>Save</button>
                    </div>
                )}
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <div>{service.name}</div>
                            <div>{service.description}</div>
                            <button onClick={() => handleEditClick(service)}>Edit</button>
                            <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminServices;