// InitiateDealPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/pageStyles.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
const InitiateDealPage = () => {
  const [farmerProduces, setFarmerProduces] = useState([]);
  const [selectedProduce, setSelectedProduce] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/get_avail_produce/')
      .then(res => setFarmerProduces(res.data.data || []));
  }, []);
  const navigate = useNavigate();
  const initiateDeal = async (e) => {

    e.preventDefault();
    let curr_date = new Date()
    console.log(localStorage.getItem('Email'));
    console.log(selectedProduce)
    if (selectedProduce && offerAmount) {
      try {
        const response = await axios.post('http://localhost:5000/purchase_record/', {
          produceID: selectedProduce.Produce_id,
          quantity: selectedProduce.Quantity,
          offerAmount: offerAmount,
          email: localStorage.getItem('Email'),
          date : curr_date
        });
        navigate('/dealer_dashboard');
        console.log(response.data); 
      } catch (error) {
        console.error('Error initiating deal:', error);
      }
    }
  };

  const handleTableRowClick = (produce) => {
    setSelectedProduce(produce);
    setShowForm(true);
  };

  const renderTableHeaders = () => {
    if (!farmerProduces.length) return null;

    const columns = Object.keys(farmerProduces[0]);

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

  return (
    <div className="page-container">
      <h2>Initiate Deal Page</h2>

      {/* Display table of all farmer produces */}
      {showForm ? null : (
        <table className="table">
          {renderTableHeaders()}
          <tbody>
            {farmerProduces.map((produce, index) => (
              <tr key={index} onClick={() => handleTableRowClick(produce)}>
                {Object.values(produce).map((value, innerIndex) => (
                  <td key={innerIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display form for initiating deal when a produce is selected */}
      {showForm && (
        <form onSubmit={initiateDeal}>
          <h3>Initiate Deal Form</h3>

          <label htmlFor="Produce_ID">Produce ID:</label>
          <input type="text" id="Produce_ID" name="Produce_ID" value={selectedProduce.Produce_id} readOnly />

          <label htmlFor="Crop Name">CropName</label>
          <input type="text" id="Crop Name" name="Crop Name" value={selectedProduce.Scientific_Name} readOnly />


          <label htmlFor="quantity">Quantity:</label>
          <input type="text" id="quantity" name="quantity" value={selectedProduce.Quantity} readOnly />

          <label htmlFor="offerAmount">Offer Amount:</label>
          <input
            type="text"
            id="offerAmount"
            name="offerAmount"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
          />

          <button type="submit">Initiate Deal</button>
        </form>
      )}
    </div>
  );
};

export default InitiateDealPage;
