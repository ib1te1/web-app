import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './profile.css';
import Modal from './Modal';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Profile() {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in sessionStorage');
                }
                const response = await axios.get(`http://localhost:8080/user/details/${userId}`, {
                headers: {
                    Authorization: `Bearer ${userId}`,
                },
            });
            setUser(response.data);
            setProfileImage(response.data.profilePicture);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    fetchUserData();
}, []);

const handleLogout = () => {
    logout();
    navigate('/');
}

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const userId = sessionStorage.getItem('userId');
        await axios.post(`http://localhost:8080/user/${userId}/image/upload`, formData, {
        headers: {
            Authorization: `Bearer ${userId}`,
                'Content-Type': 'multipart/form-data',
        },
    });
    const response = await axios.get(`http://localhost:8080/user/details/${userId}`, {
    headers: {
        Authorization: `Bearer ${userId}`,
    },
});
        setUser(response.data.user);
        setProfileImage(response.data.profilePicture);
} catch (error) {
    console.error('Error uploading profile image:', error);
}
};

const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
        const userId = sessionStorage.getItem('userId');
        console.log(user)
        await axios.put(`http://localhost:8080/user/update`, user, {
        headers: {
            Authorization: `Bearer ${userId}`,
        },
    });
    setEditMode(false);
} catch (error) {
    console.error('Error updating profile:', error);
}
};

const handleDeleteProfile = async () => {
    setShowModal(true);
};

const confirmDeleteProfile = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        await axios.delete(`http://localhost:8080/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${userId}`,
        },
    });
    logout();
    navigate('/');
} catch (error) {
    console.error('Error deleting profile:', error);
}
finally {
        setShowModal(false);
    }
};

const handleCloseModal = () => {
    setShowModal(false);
};

if (!user) {
    return <div>Loading...</div>;
}
return (
    <main className="main">
        <div className="profile">
            <div className="profileHeader">
                <div className="profilePhoto">
                    <img src={profileImage ? `data:image/jpeg;base64,${profileImage}` : './profilePicture.jpg'} alt="Profile" />
                </div>
                <div className="file-upload">
                    <span className="file-select-text">Изменить</span>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <div className="fullName">
                    <span>{user.firstname} {user.surname}</span>
                    <span className="createdAt">на сервисе с {user.createdAt}</span>
                </div>
            </div>
            <div className="profileInfo">
                <span className="personalData">Личные данные</span>
                {editMode ? (
                    <form onSubmit={handleProfileUpdate}>
                        <div className="FIOHeader">
                            <span>ФИО:</span>
                            <div className="FIO">
                                <input
                                    type="text"
                                    value={user.firstname}
                                    onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={user.surname}
                                    onChange={(e) => setUser({ ...user, surname: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="FIOHeader sex">
                            <span>Пол:</span>
                            <div className="FIO">
                                <select
                                    value={user.gender}
                                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                >
                                    <option value="MALE">Мужской</option>
                                    <option value="FEMALE">Женский</option>
                                </select>
                            </div>
                        </div>
                        <div className="FIOHeader phone">
                            <span>Телефон:</span>
                            <div className="FIO">
                                <input
                                    type="text"
                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="FIOHeader email">
                            <span>Email:</span>
                            <div className="FIO">
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>
                        {user.role === 'ROLE_EXECUTOR' &&  (
                            <>

                                <div className="FIOHeader">
                                    <span>Описание:</span>
                                    <div className="FIO">
                                            <textarea
                                                value={user.description}
                                                onChange={(e) => setUser({ ...user, description: e.target.value })}
                                            />
                                    </div>
                                </div>
                                <div className="FIOHeader">
                                    <span>Опыт работы (лет):</span>
                                    <div className="FIO">
                                        <input
                                            type="number"
                                            value={user.workExperience}
                                            onChange={(e) => setUser({ ...user, workExperience: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <button type="submit">Сохранить</button>
                    </form>
                ) : (
                    <>
                        <div className="FIOHeader">
                            <span>ФИО:</span>
                            <div className="FIO">
                                <span className="infoValue">{user.firstname} {user.surname}</span>
                            </div>
                        </div>
                        <div className="FIOHeader sex">
                            <span>Пол:</span>
                            <div className="FIO">
                                <span>{user.gender === 'MALE' ? 'Мужской' : 'Женский'}</span>
                            </div>
                        </div>
                        <div className="FIOHeader phone">
                            <span>Телефон:</span>
                            <div className="FIO">
                                <span>{user.phone}</span>
                            </div>
                        </div>
                        <div className="FIOHeader email">
                            <span>Email:</span>
                            <div className="FIO">
                                <span>{user.email}</span>
                            </div>
                        </div>
                        {user.role === 'ROLE_EXECUTOR' && (
                            <>
                                <div className="FIOHeader">
                                    <span>Рейтинг:</span>
                                    <div className="FIO">
                                        <span className="infoValue">{user.rating}</span>
                                    </div>
                                </div>
                                <div className="FIOHeader">
                                    <span>Описание:</span>
                                    <div className="FIO">
                                        <span className="infoValue">{user.description}</span>
                                    </div>
                                </div>
                                <div className="FIOHeader">
                                    <span>Опыт работы (лет):</span>
                                    <div className="FIO">
                                        <span className="infoValue">{user.workExperience}</span>
                                    </div>
                                </div>
                                <div className="FIOHeader">
                                    <span>Количество выполненных заказов:</span>
                                    <div className="FIO">
                                        <span className="infoValue">{user.ordersAmount}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className="FIOHeader actions">
                    <span>Действия с профилем</span>
                    {editMode ? (
                        <button onClick={() => setEditMode(false)}>Отменить</button>
                    ) : (
                        <button onClick={() => setEditMode(true)}>Редактировать</button>
                    )}
                    <button className="logoutLinks exit" onClick={handleLogout}>Выйти</button>
                    <button className="logoutLinks delete" onClick={handleDeleteProfile}>Удалить</button>
                </div>
            </div>
        </div>
        <Modal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={confirmDeleteProfile}
            message="Вы уверены, что хотите удалить профиль?"
        />
    </main>
);
}

export default Profile;