import React, { useEffect, useState } from "react";
import ResultTable from "../components/resulttable";
import axios from 'axios';


const ProduceForm = () => {

  const [formData, setFormData] = useState({
    Season: '',
    Location: '',
    Quantity: '',
    Year: '',
    Crop_Name: '',
    Scientific_Name: '',
    Farmer_id: 1,
    Warehouse_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/farmerdashboard/producedetails',
        formData
      );
      console.log('Form submitted successfully!', response.data);

      // Clear the form after successful submission if needed
      setFormData({
        Season: '',
        Location: '',
        Quantity: '',
        Year: '',
        Crop_Name: '',
        Farmer_id: 1,
        Warehouse_id: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="produce-form">
      <table>
        <tbody>
          <tr>
            <td>
              <label>Season:</label>
            </td>
            <td>
              <input type="text" name="Season" value={formData.Season} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Location:</label>
            </td>
            <td>
              <input type="text" name="Location" value={formData.Location} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Quantity:</label>
            </td>
            <td>
              <input type="text" name="Quantity" value={formData.Quantity} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Year:</label>
            </td>
            <td>
              <input type="text" name="Year" value={formData.Year} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Crop Name:</label>
            </td>
            <td>
              <input type="text" name="Crop_Name" value={formData.Crop_Name} onChange={handleChange} />
            </td>
          </tr>
         
            
          <tr>
            <td>
              <label>Warehouse ID:</label>
            </td>
            <td>
              <input type="text" name="Warehouse_id" value={formData.Warehouse_id} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit" className="form-button">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default function FarmerDashboard() {
   //take farmerID from login details
  
  const [produceDetails, setProduceDetails] = useState({});
  const [addDetails, setAddDetails] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({});

  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    const role = 'Farmer';//localStorage.getItem("role");
    //let email; //use this line after login integration
    
    const getFarmerId = async (emailId) => {
      const fId = await axios.post(
        'http://localhost:5000/farmerdashboard/getuserid',
        { emailId }
      )
        .then((res) => {
          console.log("id response", res.data);
          setCurrentId(res.data[0].Farmer_id)
        });

    }

    if (role === 'Farmer') {
      //email = localStorage.getItem("Email");
      let email = localStorage.getItem('Email')
      getFarmerId(email);
      console.log("curID", currentId);
      localStorage.setItem("currentId", currentId);
    }
  }, []);


  const fetchDetails = async () => {
    try {
      setAddDetails(false);
      setNotificationDetails({});
      const response = await axios.post(
        'http://localhost:5000/farmerdashboard',
        { currentId }
      );
      setProduceDetails(response.data);
      console.log("response", response.data)
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  console.log("produce Details", produceDetails)

  const handleAddButton = () => {
    setProduceDetails({});
    setNotificationDetails({});
    setAddDetails(true);
  };

  const getNotifications = async () => {

    setAddDetails(false);
    setProduceDetails({});
    const role = 'Farmer';

    try {
      const response = await axios.post(
        'http://localhost:5000/farmerdashboard/notifications',
        { role, currentId }
      );
      setNotificationDetails(response.data);
      //console.log("response", response.data)
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDecision = async (decision, purchaseId) => {
    console.log(decision, purchaseId);
    try {
      const response = await axios.post(
        'http://localhost:5000/farmerdashboard/action',
        { decision, purchaseId }
      );
      setNotificationDetails(response.data);
      //console.log("response", response.data)
    } catch (error) {
      console.error('Error searching:', error);
    }
  }


  return (
    <div className="main-div">
      <h1 className="text-center">Farmer Dashboard</h1>
      <div className="options-container">
        <div className="dashboard-options">
          <ul>
            <li><button onClick={fetchDetails} type="submit" class="btn">View Produce Details</button></li>
            <li><button onClick={handleAddButton} type="submit" class="btn">Add produce details</button></li>
            <li><button onClick={getNotifications} type="submit" class="btn">Notifications</button></li>
          </ul>
        </div>
      </div>
      {produceDetails.length > 0 ?
        <ResultTable searchResult={produceDetails} />
        : ''
      }
      {
        addDetails && <ProduceForm />
      }
      {
        notificationDetails.length > 0 ?
        <ResultTable 
          searchResult={notificationDetails} 
          isNotification={true} 
          handleDecision={handleDecision}/>
        : ''
      }
    </div>
  )
}