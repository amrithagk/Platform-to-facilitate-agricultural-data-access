import React, { useEffect, useState } from 'react';
import ResultTable from '../components/resulttable';
import axios from 'axios';
import '../css/styles.css';

const Warehouse = () => {
  const [warehouseData, setAllWarehouse] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');


  useEffect(() => {
    axios.get("http://localhost:5000/warehouse")
    .then(res => { setAllWarehouse(res.data) })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/warehouse/filterstates")
    .then(res2 => { setAllStates(
      res2.data.map(element => (element.State))); 
      console.log("states", AllStates); })
  }, []);

  const filteredWarehouse = warehouseData.filter(wh =>
    wh.Warehouse_Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedState === 'All' || wh.State === selectedState)
  );
  
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleStateChange = (e) => {
    e.preventDefault();
    setSelectedState(e.target.value);
  };


  return (
    <div>
      <h1 className='page-header'>Warehouses</h1>
      <div className='filter-container'>
        <label htmlFor="search" className='filter-label'>Search Warehouse:</label>
        <input type="text" className='search' id="search" value={searchTerm} onChange={handleSearchChange} />
        <label htmlFor="states" className='filter-label'>Select State:</label>
        <select className='drop-down' id="states" onChange={handleStateChange} value={selectedState}>
          <option value="All">All</option>
          {
            AllStates.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
        </select>
      </div>
      

      { filteredWarehouse.length > 0 ?
        <ResultTable searchResult={filteredWarehouse} />
        : ''
}
    </div>
  );
};

export default Warehouse;