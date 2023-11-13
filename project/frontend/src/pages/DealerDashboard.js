// DealerDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notification from './notification';
import axios from 'axios';
import '../css/dealer_dashboard.css';

const DealerDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend using Axios
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    // <div className="dealer-dashboard">
    //   {localStorage.getItem('Email') && localStorage.getItem('role') === 'Dealer' &&
    //   (
    //   <><header>
    //     <h1>Dealer Dashboard</h1>
    //   </header>

    //   <nav>
    //     <Link to="/dealer_dashboard" className="nav-link">
    //       Home
    //     </Link>
    //     <Link to="/dealer_dashboard/orders" className="nav-link">
    //       Orders
    //     </Link>
    //     <Link to="/dealer_dashboard/inventory" className="nav-link">
    //       Inventory
    //     </Link>
    //     <Link to="/dealer_dashboard/initiate-deal" className="nav-link">
    //       Initiate Deal
    //     </Link>
    //   </nav>

    //   <main>
    //     <div className="dashboard-section">
    //       <Link to="/dealer_dashboard/orders" className="dashboard-box orders-box">
    //         <h2>See Orders</h2>
    //       </Link>
    //     </div>

    //     <div className="dashboard-section">
    //       <Link to="/dealer_dashboard/inventory" className="dashboard-box inventory-box">
    //         <h2>Inventory</h2>
    //       </Link>
    //     </div>

    //     <div className="dashboard-section">
    //       <Link to="/dealer_dashboard/initiate-deal" className="dashboard-box deal-box">
    //         <h2>Initiate Deal</h2>
    //       </Link>
    //     </div>
    //   </main>
      

    //   {/* Render notifications from the backend */}
    //   <div className="notification-section">
    //     <h2>Notifications</h2>
    //     <ul>
    //       {notifications.map((notification) => (
    //         <Notification key={notification.id} message={notification.message} type={notification.type} />
    //       ))}
    //     </ul>
    //   </div>

    //   <footer>
    //     <p>&copy; 2023 Dealer Dashboard</p>
    //   </footer>
    //   </>)}
    // </div>
    <div className="dealer-dashboard">
      <header>
       <h1>Dealer Dashboard</h1>
     </header>  
     <nav>
       <Link to="/dealer_dashboard" className="nav-link">
         Home
       </Link>
       <Link to="/dealer_dashboard/orders" className="nav-link">
         Orders
       </Link>
       <Link to="/dealer_dashboard/inventory" className="nav-link">
         Inventory
       </Link>
       <Link to="/dealer_dashboard/initiate-deal" className="nav-link">
         Initiate Deal
       </Link>
     </nav>   <main>
       <div className="dashboard-section">
         <Link to="/dealer_dashboard/orders" className="dashboard-box orders-box">
           <h2>See Orders</h2>
         </Link>
       </div>      <div className="dashboard-section">
         <Link to="/dealer_dashboard/inventory" className="dashboard-box inventory-box">
           <h2>Inventory</h2>
         </Link>
       </div>      <div className="dashboard-section">
         <Link to="/dealer_dashboard/initiate-deal" className="dashboard-box deal-box">
           <h2>Initiate Deal</h2>
         </Link>
       </div>
     </main>
          {/* Render notifications from the backend */}
       <div className="notification-section">
        <h2>Notifications</h2>
        <ul>
         {notifications.map((notification) => (
            <Notification key={notification.id} message={notification.message} type={notification.type} />
          ))}
        </ul>
      </div>

      <footer>
        <p>&copy; 2023 Dealer Dashboard</p>
      </footer>
      
    </div>
  );
          
};

export default DealerDashboard;
