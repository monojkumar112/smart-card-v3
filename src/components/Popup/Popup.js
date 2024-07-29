import React from 'react'

const Popup = ({ message, type, onClose }) => {
    return (
        <div className={`popup-message overlay-4 ${type}`}>
            <div className="popup-content-message">
                <span className="close-btn-popup" onClick={onClose}>
                    ×
                </span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Popup
