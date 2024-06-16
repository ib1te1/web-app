import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './global.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import searchIcon from './images/search.png';
import hairdresserIcon from './images/hairdresser.svg';
import LoginForm from './auth/LoginForm';
import RegisterForm from "./auth/RegisterForm";
import Profile from "./profile/Profile";
import { AuthProvider } from './auth/AuthContext';
import useCategories from "./categories/useCategories";
import CategoryCarousel from "./categories/CategoryCarousel";
import Catalog from "./catalog/Catalog";
import TaskForm from "./task/TaskForm";
import MyOrders from "./orders/MyOrders";
import CreateOrderPage from "./services/CreateOrderPage";

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/registration" element={<RegisterForm />} />
              <Route path="/user/details" element={<Profile />} />
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/task-form" element={<TaskForm/>}/>
              <Route path="/my-orders" element={<MyOrders/>}/>
              <Route path="/create-order" element={<CreateOrderPage/>}/>
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  );
}

function HomePage() {
  const {categories,loading}=useCategories();
  if(loading){
    return <div>Загрузка...</div>
  }
  return (
      <div>
        <main className="main">
          <div className="search">
            <div className="leftSideSearch">
              <div className="searchNotify">
                <span>Не теряйте время на поиск <br /><span className="specialText">услуг</span></span>
              </div>
              {/*<div className="search-container">*/}
              {/*  <input type="text" placeholder="Услуга, Категория, Специалист" />*/}
              {/*  <div className="searchImage">*/}
              {/*    <img src={searchIcon} alt="Search Icon" />*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <span className="specialText">Например:</span> <span>Парикмахер</span>*/}
              {/*</div>*/}
            </div>
            <div className="imageSearch">
              <img src={hairdresserIcon} alt="Hairdresser" />
            </div>
          </div>
          <div className="services">
            <div className="headerServices">
              — Услуги
            </div>
            <CategoryCarousel categories={categories}/>
          </div>
        </main>
      </div>
  );
}

export default App;