import React, { useState } from 'react';
import leftArrow from '../images/left-arrow.png';
import rightArrow from '../images/right-arrow.png';
import axios from "axios";

const CategoryCarousel = ({ categories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="servicesList">
            <button className="left-button" onClick={handlePrevious}>
                <img src={leftArrow} alt="Left Icon" />
            </button>
            <div className="content">
                {categories.slice(currentIndex, currentIndex + 3).map((category, index) => (
                    <div key={index} className="category-item">
                        <img src={`data:image/jpg;base64,${category.image}`} alt={category.category.name} />
                        <span>{category.category.name}</span>
                    </div>
                ))}
            </div>
            <button className="right-button" onClick={handleNext}>
                <img src={rightArrow} alt="Right Icon" />
            </button>
        </div>
    );
};

export default CategoryCarousel;