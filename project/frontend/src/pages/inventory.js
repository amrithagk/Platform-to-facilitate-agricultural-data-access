// InventoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/pageStyles.css'; // Import your CSS file

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('your_backend_inventory_endpoint');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="page-container">
      <h2>Inventory Page</h2>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;
