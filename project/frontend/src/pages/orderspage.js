// OrdersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/pageStyles.css'; // Import your CSS file

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const email = localStorage.getItem('Email');
      try {
        const response = await axios.get(`http://localhost:5000/get_orders/${email}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderTableHeaders = () => {
    if (!orders.length) return null;

    const columns = Object.keys(orders[0]);

    return (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const Table = () => (
    <table className="table">
      {renderTableHeaders()}
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            {Object.values(order).map((value, innerIndex) => (
              <td key={innerIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="page-container">
      <h2>Orders Page</h2>
      <Table />
    </div>
  );
};

export default OrdersPage;
