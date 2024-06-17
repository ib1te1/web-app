import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from './Filter';
import Modal from '../services/ModalExecutor'; // Import the Modal component
import '../global.css';
import axios from 'axios';
import './catalog.css';
import searchIcon from "../images/search.png";

function Catalog() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('');
    const [modalMessage, setModalMessage] = useState(''); // State to manage modal message
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryId = searchParams.get('categoryId');
        const storedRole = sessionStorage.getItem('role');
        setRole(storedRole);
        fetchItems(categoryId, '', '', searchTerm, storedRole);
    }, [location.search]);

    const fetchItems = (categoryId = '', priceFrom = '', priceTo = '', searchTerm = '', role) => {
        setLoading(true);

        axios.get('http://localhost:8080/catalog', {
            params: {
                categoryId: categoryId,
                priceFrom: priceFrom,
                priceTo: priceTo,
                searchTerm: searchTerm,
                role: role
            }
        }).then(response => {
            setItems(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    };

    const handleFilterChange = ({ category, priceFrom, priceTo }) => {
        fetchItems(category, priceFrom, priceTo, searchTerm, role);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        const searchParams = new URLSearchParams(location.search);
        const categoryId = searchParams.get('categoryId');
        fetchItems(categoryId, '', '', searchTerm, role);
    };

    const handleOrderDirectClick = (taskId) => {
        const executorId = sessionStorage.getItem('userId');
        axios.post(`http://localhost:8080/order/create-direct?executorId=${executorId}&taskId=${taskId}`, {}, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        setModalMessage('Order created successfully!'); // Set modal message
        navigate('/catalog');
    }).catch(error => {
        console.error('Error creating order:', error);
    });
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleOrderClick = (itemId) => {
        const userId = sessionStorage.getItem('userId');
        navigate(`/task-form?userId=${userId}&itemId=${itemId}`);
    };

const handleCloseModal = () => {
    setModalMessage(''); // Close the modal by resetting the message
};
return (
    <main className="main">
        <div className="catalog">
            <div className="filtration">
                <h2>Каталог</h2>
                <Filter onFilterChange={handleFilterChange} />
            </div>
            <div className="servicesAndPagination">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Услуга, Категория"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="searchImage" onClick={handleSearchSubmit}>
                        <img src={searchIcon} alt="Search Icon"/>
                    </div>
                </div>
                <div>
                    <span className="specialText">Например:</span> <span>Парикмахер</span>
                </div>
                {loading ? (
                    <div>Загрузка...</div>
                ) : (
                    <div className="servicesNew">
                        <ul className="services-list">
                            {currentItems.map(item => (
                                <li key={item.id} className="service-card">
                                    <div className="service-info">
                                        <h3 className="service-name">{item.name}</h3>
                                        <p className="service-executor">{role === 'ROLE_USER' ? 'Исполнитель' : 'Заказчик'}: {item.firstname} {item.surname}</p>
                                        <p className="service-description">{item.description}</p>
                                        <p className="service-price">Стоимость за услугу: {item.priceMin} - {item.priceMax} рублей</p>
                                    </div>
                                    <div className="rightSide">
                                        {item.profilePicture && (
                                            <img
                                                src={`data:image/jpeg;base64,${item.profilePicture}`}
                                                alt="Profile"
                                                className="item-image"
                                            />
                                        )}
                                        {role === 'ROLE_USER' && (
                                            <button onClick={() => handleOrderClick(item.id)} className="order-button">
                                                Предложить заказ
                                            </button>
                                        )}
                                        {role === 'ROLE_EXECUTOR' && (
                                            <button onClick={() => handleOrderDirectClick(item.id)} className="order-button">
                                                Принять заказ
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {items.length === 0 && <div>Нет результатов</div>}
                    </div>
                )}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
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
        {modalMessage && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </main>
);
}

export default Catalog;