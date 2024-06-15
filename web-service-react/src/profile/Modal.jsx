import React from 'react';
import './modal.css';

const Modal = ({ show, handleClose, handleConfirm, message }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h4>{message}</h4>
                <div className="modal-actions">
                    <button onClick={handleConfirm}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;