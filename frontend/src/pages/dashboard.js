import React, { useState } from "react";
import ResultTable from "../components/resulttable";
import axios from 'axios';

export default function FarmerDashboard() {
    const farmerId = 1; //take farmerID from login details
    const [produceDetails, setProduceDetails] = useState({});

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
    return (
        <div className="main-div">
            <h1 className="text-center">Farmer Dashboard</h1>
            <div>
                <button onClick={fetchDetails} type="submit" class="btn btn-primary mb-2">View Produce Details</button>
                <button onClick={fetchDetails} type="submit" class="btn btn-primary mb-2">Add produce details</button>
                <button onClick={fetchDetails} type="submit" class="btn btn-primary mb-2">Fetch Details</button>
            </div>
            { produceDetails.length > 0 ? 
                <ResultTable searchResult={produceDetails}/> 
                : ''
            }
        </div>
    )
}