import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css'; // Import your CSS file

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); // Default filter status is 'All'

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
            <th key={index}>{column.toLocaleUpperCase()}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const getRowColorClass = (dealStatus) => {
    console.log("hiii")
    switch (dealStatus) {
      case 'Accepted':
        return 'success-row';
      case 'Pending':
        return 'pending-row';
      case 'Rejected':
        return 'failed-row';
      default:
        return '';
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filterOrders = () => {
    if (filterStatus === 'All') {
      return orders;
    } else {
      return orders.filter((order) => order.deal_status === filterStatus);
    }
  };

  const Table = () => (
    <div>
      

      <table className="table">
        {renderTableHeaders()}
        <tbody>
          {filterOrders().map((order, index) => (
            <tr key={index} className={getRowColorClass(order.deal_status)}>
              {Object.values(order).map((value, innerIndex) => (
                <td key={innerIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="page-container">
      <h2>Orders Page</h2>
      <div className="filter-container">
        <label htmlFor="filterStatus" className="filter-label">
          Filter by Deal Status:
        </label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={handleFilterChange}
          className="drop-down"
        >
          <option value="All">All</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <Table />
    </div>
  );
};

export default OrdersPage;
