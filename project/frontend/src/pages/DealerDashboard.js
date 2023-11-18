// DealerDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notification from './notification';
import axios from 'axios';
import '../css/dealer_dashboard.css';
import StylishBox from '../components/boxstyle';

const DealerDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalOrders,settotalorder] = useState(0.00);
  const [totalPurchase,settotalpurchase] = useState(0);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_notification/all');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  useEffect(() => {
    // Fetch notifications from the backend using Axios
    fetchNotifications();
  }, []);

  useEffect(()=>{
    const getpurchaseorder = async () =>{
      try{
        const resp = await axios.get('http://localhost:5000/getordpur/');
        console.log(resp.data);
        if(resp.data.data)
       { settotalorder(resp.data.data[0].totord);
        settotalpurchase(resp.data.data[0].totpur);
        console.log(totalOrders,totalPurchase)}
      }
      catch(err){
        console.log("error in retreiving data");
      }
    }
    getpurchaseorder();
  },[])
  const handleNotificationClose = async(id) =>{
    try{
    await axios.put('http://localhost:5000/get_notification/modify', { id });
    console.log('Notification closed successfully on the backend.');
    // After successful closure on the backend, you may choose to refetch the notifications if needed
    fetchNotifications();
  } 
  catch (error) {
    console.error('Error closing notification on the backend:', error);
  }
  }
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
      {localStorage.getItem('Email')  && localStorage.getItem('role')==="Dealer" && ( <>
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
       <div className="dashboard-section">
      <StylishBox totalAmount={totalPurchase} totalOrders={totalOrders}/>
    </div>
     </main>
          {/* Render notifications from the backend */}
       <div className="notification-section">
        <h2>Notifications</h2>
        <ul>
        {notifications.map((index , notification) => (
  <Notification
    key={notification.produce_id}
    message={`Hey, just to give a heads up, Farmer ${notification.farmer_name} has produced a crop ${notification.crop_name} of about ${notification.quantity} quintals with the Produce ID ${notification.produce_id}.`}
    type = {index}
    onClose={() => handleNotificationClose(notification.id)}
      />
      ))}

        </ul>
      </div>

      <footer>
        <p>&copy; 2023 Dealer Dashboard</p>
      </footer>
      </>
      )}
    </div>
  );
              
};

export default DealerDashboard;
