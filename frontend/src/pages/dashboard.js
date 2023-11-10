import React, { useState } from "react";
import ResultTable from "../components/resulttable";
import axios from 'axios';


const ProduceForm = () => {
  const [formData, setFormData] = useState({
    Produce_id: '',
    Season: '',
    Location: '',
    Quantity: '',
    Year: '',
    Scientific_Name: '',
    Farmer_id: '',
    Warehouse_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your API endpoint is 'http://example.com/api/produce'
      const response = await axios.post(
        'http://localhost:3000/producedetails', 
        formData
      );
      console.log('Form submitted successfully!', response.data);

      // Clear the form after successful submission if needed
      setFormData({
        Produce_id: '',
        Season: '',
        Location: '',
        Quantity: '',
        Year: '',
        Scientific_Name: '',
        Farmer_id: '',
        Warehouse_id: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Produce ID:
        <input type="text" name="Produce_id" value={formData.Produce_id} onChange={handleChange} />
      </label>
      <br />

      <label>
        Season:
        <input type="text" name="Season" value={formData.Season} onChange={handleChange} />
      </label>
      <br />

      <label>
        Location:
        <input type="text" name="Location" value={formData.Location} onChange={handleChange} />
      </label>
      <br />

      <label>
        Quantity:
        <input type="text" name="Quantity" value={formData.Quantity} onChange={handleChange} />
      </label>
      <br />

      <label>
        Year:
        <input type="text" name="Year" value={formData.Year} onChange={handleChange} />
      </label>
      <br />

      <label>
        Scientific Name:
        <input type="text" name="Scientific_Name" value={formData.Scientific_Name} onChange={handleChange} />
      </label>
      <br />

      <label>
        Farmer ID:
        <input type="text" name="Farmer_id" value={formData.Farmer_id} onChange={handleChange} />
      </label>
      <br />

      <label>
        Warehouse ID:
        <input type="text" name="Warehouse_id" value={formData.Warehouse_id} onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default function FarmerDashboard() {
    const farmerId = 1; //take farmerID from login details
    const [produceDetails, setProduceDetails] = useState({});
    const [addDetails, setAddDetails] = useState(false);

    const fetchDetails = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3000/dashboard',
            { farmerId }
          );
          setProduceDetails(response.data);
          console.log("response", response.data)
        } catch (error) {
          console.error('Error searching:', error);
        }
      };

    console.log("produce Details", produceDetails)

    const handleAddButton = () => {
        setAddDetails(true);
    };


    return (
        <div className="main-div">
            <h1 className="text-center">Farmer Dashboard</h1>
            <div>
                <button onClick={fetchDetails} type="submit" class="btn btn-primary mb-2">View Produce Details</button>
                <button onClick={handleAddButton} type="submit" class="btn btn-primary mb-2">Add produce details</button>
                <button onClick={fetchDetails} type="submit" class="btn btn-primary mb-2">Fetch Details</button>
            </div>
            { produceDetails.length > 0 ? 
                <ResultTable searchResult={produceDetails}/> 
                : ''
            }
            {
                addDetails && <ProduceForm/>
            }
        </div>
    )
}