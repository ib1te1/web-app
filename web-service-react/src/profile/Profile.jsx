import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './profile.css';
// import profilePicture from './profilePicture.jpg';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

function Profile() {
    const [user, setUser] = useState(null);
    const [profileImage,setProfileImage]=useState(null);
    const navigate=useNavigate();
    const {logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('getItem userId:')
                const userId = sessionStorage.getItem('userId'); // Используйте ключ 'userId' для получения идентификатора пользователя
                console.log(userId);
                if (!userId) {
                    throw new Error('User ID not found in sessionStorage');
                }
                const response = await axios.get(`http://localhost:8080/user/details/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userId}`,
                    },
                });
                console.log('Response data user:',response.data.user);
                setUser(response.data);
                console.log(user)
                // console.log(response.data.profilePicture)
                setProfileImage(response.data.profilePicture)
                console.log(user)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    useEffect(()=>{
        console.log('User updated',user);
    })

    const handleLogout=()=>{
        logout();
        navigate('/')
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
        // Refresh user data to display the new profile picture
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

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main">
            <div className="profile">
                <div className="profileHeader">
                    <div className="profilePhoto">
                        <img src={profileImage?`data:image/jpeg;base64,${profileImage}`:'./profilePicture.jpg'} alt="Profile" />
                    </div>
                    <div className="file-upload">
                        <span className="file-select-text">Изменить</span>
                        <input type="file" onChange={handleImageUpload}/>
                    </div>
                    <div className="fullName">
                        <span>{user.firstname} {user.surname}</span>
                        <span className="createdAt">на сервисе с {user.createdAt}</span>
                    </div>
                </div>
                <div className="profileInfo">
                    <span className="personalData">Личные данные</span>
                    <div className="FIOHeader">
                        <span>ФИО:</span>
                        <div className={"FIO"}>
                        <span className="infoValue">{user.firstname} {user.surname}</span>
                        </div>
                    </div>
                        <div className="FIOHeader sex">
                            <span>Пол:</span>
                            <div className={"FIO"}>
                                <span>{user.gender === 'MALE' ? 'Мужской' : 'Женский'}</span>
                            </div>
                        </div>
                        <div className="FIOHeader phone">
                            <span>Телефон:</span>
                            <div className={"FIO"}>
                            <span>{user.phone}</span>
                            </div>
                        </div>
                        <div className="FIOHeader phone">
                            <span>Email:</span>
                            <div className={"FIO"}>
                            <span>{user.email}</span>
                            </div>
                        </div>
                    <div className="FIOHeader logout">
                        <span>Действия с профилем</span>
                        <button className="logoutLinks exit" onClick={handleLogout}>Выйти</button>
                        <button className="logoutLinks delete">Удалить</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;