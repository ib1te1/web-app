import React from 'react';
import './modalExecutor.css';

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Modal;