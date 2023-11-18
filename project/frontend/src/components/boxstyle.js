import React from 'react';
import '../css/stylishbox.css'; // Assuming you have a separate CSS file for styling

const StylishBox = ({ totalAmount, totalOrders }) => {
  return (
    <div className="stylish-box">
      <div className="box-header">Total Summary</div>
      <div className="box-content">
        <div className="box-row">
          <div className="label">Total Amount</div>
          <div className="value">{totalAmount.toFixed(2)}</div>
        </div>
        <div className="box-row">
          <div className="label">Total Orders</div>
          <div className="value">{totalOrders}</div>
        </div>
      </div>
    </div>
  );
};

export default StylishBox;
