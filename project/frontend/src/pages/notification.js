// Notification.js

import React from 'react';
import '../css/notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <span className="close-btn" onClick={onClose}>
        &times;
      </span>
    </div>
  );
};

export default Notification;
