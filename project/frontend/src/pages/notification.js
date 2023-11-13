// Notification.js

import React from 'react';
import '../css/notification.css';

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
