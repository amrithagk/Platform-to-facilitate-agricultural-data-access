import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultTable from '../components/resulttable';

const Fertilizers = () => {

  const [fertilizerData, setAllfertilizer] = useState([]);
  const [AllChemical_composition, setAllChemical_composition] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');


  useEffect(() => {
    axios.get("http://localhost:5000/fertilizers")
    .then(res => { setAllfertilizer(res.data) })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/fertilizers/filterChemical_composition")
    .then(res2 => { setAllChemical_composition(
      res2.data.map(element => (element.Chemical_composition))); 
      //console.log("Chemical_composition", AllChemical_composition); 
    })
  }, []);

  const filteredfertilizer = fertilizerData.filter(wh =>
    wh.Fertilizer_Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedState === 'All' || wh.Chemical_composition === selectedState)
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
      <h1 className='page-header'>Fertilizers</h1>
      <div className='filter-container'>
        <label htmlFor="search" className='filter-label'>Enter Fertilizer Name:</label>
        <input type="text" className='search' id="search" value={searchTerm} onChange={handleSearchChange} />
        <label htmlFor="states" className='filter-label'>Select Chemical_composition:</label>
        <select className='drop-down' id="states" onChange={handleStateChange} value={selectedState}>
          <option value="All">All</option>
          {
            AllChemical_composition.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
        </select>
      </div>
      

      { filteredfertilizer.length > 0 ?
        <ResultTable searchResult={filteredfertilizer} />
        : ''
}
    </div>
  )
};

export default Fertilizers;
