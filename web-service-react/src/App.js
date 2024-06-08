import React from 'react';
import './App.css';
import './global.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import searchIcon from './images/search.png';
import hairdresserIcon from './images/hairdresser.svg';
import rightArrow from './images/right-arrow.png'
import leftArrow from './images/left-arrow.png'
function App() {
  return (
      <body>
      <Header/>
      <div className="App">
        <main className="main">
          <div className="search">
            <div className="leftSideSearch">
              <div className="searchNotify">
                <span>Не теряйте время на поиск <br/><span className="specialText">услуг</span></span>
              </div>
              <div className="search-container">
                <input type="text" placeholder="Услуга, Категория, Специалист"/>
                <div className="searchImage">
                  <img src={searchIcon} alt="Search Icon"/>
                </div>
              </div>
              <div>
                <span className="specialText">Например:</span> <span>Парикмахер</span>
              </div>
            </div>
            <div className="imageSearch">
              <img src={hairdresserIcon} alt="Hairdresser"/>
            </div>
          </div>
          <div className="services">
            <div className="headerServices">
              — Услуги
            </div>
            {/*ДОДЕЛАТЬ*/}
            <div className="servicesList">
              <button className="left-button">
                <img src={leftArrow} alt="Left Icon"/>
              </button>
              <div className="content">
                {/*// <!-- Insert your content here -->*/}
              </div>
              <button className="right-button">
                <img src={rightArrow} alt="Right Icon"/>
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
      </body>
  );
}

export default App;