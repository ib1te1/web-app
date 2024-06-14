import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import '../global.css';
import axios from 'axios';
import './catalog.css';

function Catalog() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = (categoryId = '', priceFrom = '', priceTo = '') => {
        setLoading(true);

        axios.get('http://localhost:8080/catalog', {
            params: {
                categoryId: categoryId,
                priceFrom: priceFrom,
                priceTo: priceTo
            }
        }).then(response => {
            setServices(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Ошибка при загрузке услуг:', error);
            setLoading(false);
        });
    };

    const handleFilterChange = ({ category, priceFrom, priceTo }) => {
        fetchServices(category, priceFrom, priceTo);
    };

    // Get current services
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleOrderClick = () => {
        navigate('/task-form');
    };

    return (
        <main className="main">
            <div className="catalog">
                <div className="filtration">
                    <h2>Каталог</h2>
                    <Filter onFilterChange={handleFilterChange} />
                </div>
                <div className="servicesAndPagination">
                    {loading ? (
                        <div>Загрузка...</div>
                    ) : (
                        <div className="servicesNew">
                            <ul className="services-list">
                                {currentServices.map(service => (
                                    <li key={service.id} className="service-card">
                                        <div className="service-info">
                                            <h3 className="service-name">{service.name}</h3>
                                            <p className="service-executor">Исполнитель: {service.firstname} {service.surname}</p>
                                            <p className="service-description">{service.description}</p>
                                            <p className="service-price">Стоимость за услугу: {service.priceMin} - {service.priceMax} рублей</p>
                                            {/*<p className="executor-rating">{service.rating}</p>*/}
                                        </div>
                                        <div className="rightSide">
                                        {service.profilePicture && (
                                            <img
                                                src={`data:image/jpeg;base64,${service.profilePicture}`}
                                                alt="Profile"
                                                className="service-image"
                                            />
                                        )}
                                        <button onClick={handleOrderClick} className="order-button">Предложить заказ</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {services.length === 0 && <div>Нет результатов</div>}
                        </div>
                    )}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(services.length / servicesPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className="button"
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Catalog;