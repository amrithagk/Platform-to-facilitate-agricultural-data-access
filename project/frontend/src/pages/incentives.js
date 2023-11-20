import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultTable from "../components/resulttable";
import '../css/styles.css';

export default function Incentives() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/incentives');
        setData(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
  // Empty dependency if the effect should run only once when the component mounts

  return (
    <div>
      <p className="page-header">Incentive Schemes</p>
      {
        data.length > 0?  
        <ResultTable searchResult={data}/>
        : ''
      }
    </div>
  );
}
