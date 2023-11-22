// DealerDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notification from './notification';
import axios from 'axios';
import '../css/styles.css';
import StylishBox from '../components/boxstyle';
import ProfileButton from '../components/profileButton';

const DealerDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalorder,settotalorder] = useState(0.00);
  const [totalpurchase,settotalpurchase] = useState(0);
  const fetchNotifications = async () => {
    /* try {
      const response = await axios.get('http://localhost:5000/get_notification/all');
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } */
    try {
      const response = await axios.get('http://localhost:5000/get_notification/newproducelist');
      setNotifications(response.data);
      console.log("notification", notifications);
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
        const resp = await axios.get(`http://localhost:5000/getordpur/${localStorage.getItem('Email')}`);
        console.log(resp.data);
        if(resp.data.data)
       { 
        settotalorder(resp.data.data[0].totord);
        settotalpurchase(resp.data.data[0].totpur);
        console.log(totalorder,totalpurchase)}
      }
      catch(err){
        console.log("error in retreiving data");
      }
    }
    getpurchaseorder();
  })
  const handleNotificationClose = async(id) =>{
    try{
    const response = await axios.post('http://localhost:5000/get_notification/modify', { id });
    console.log('Notification closed successfully on the backend.');
    // After successful closure on the backend, you may choose to refetch the notifications if needed
    fetchNotifications();
  } 
  catch (error) {
    console.error('Error closing notification on the backend:', error);
  }
  }
  return (
    
    <div className="main-div">
      <header className="dd-header">
        <h1>Dealer Dashboard</h1>
      </header>


      <main className="dealer-main">
        <div className='options-container'>
        <div className="dashboard-options">
          <ul>
            <li>
              <Link to="/dealer_dashboard/orders" className='dashboard-btn'>View Orders</Link>
            </li>
            <li>
              <Link to="/dealer_dashboard/initiate-deal" className= 'dashboard-btn'>Initiate Deal</Link>
            </li>
            
          </ul>

          <StylishBox totalAmount={totalpurchase} totalOrders={totalorder} />
        </div>
        </div>
      </main>

      <div className="notification-section">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <Notification
              key={notification.produce_id}
              message={`Hey, just to give a heads up, Farmer ${notification.Farmer_id} has produced a crop ${notification.Scientific_Name} of about ${notification.Quantity} quintals with the Produce ID ${notification.Produce_id}.`}
              onClose={() => handleNotificationClose(notification.produce_id)}
            />
          ))}
        </ul>
      </div>

      <footer>
        <p>&copy; 2023 Dealer Dashboard</p>
      </footer>

      {localStorage.getItem('Email') && <ProfileButton />}
    </div>
  );
              
};

export default DealerDashboard;
