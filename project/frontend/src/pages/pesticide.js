// CropsPage.js
import React, { useEffect, useState } from 'react';
import Table from '../components/cropsdata';
import axios from 'axios';

const PesticidePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pesticideData,setAllPesticide] = useState([]);
  const [selectedPests, setSelectedPests] = useState('All');
  const [AllPests,setAllPests] = useState([]);



  useEffect(()=>{
    axios.get("http://localhost:5000/pesticide/all").then(res=>{setAllPesticide(res.data.data)})
  },[])
  useEffect(()=>{
    axios.get("http://localhost:5000/pesticide/pests").then(res=>{setAllPests(res.data.data)})
  },[]);
  // console.log(pesticideData)
  
//   const cropsData = [
//     { first: 'Mark', last: 'Otto', handle: '@mdo', type: 'Type1' },
//     { first: 'Jacob', last: 'Thornton', handle: '@fat', type: 'Type2' },
//     { first: 'Larry', last: 'the Bird', handle: '@twitter', type: 'Type1' },
//     // Add more data as needed
//   ];
  const filteredPesticide = pesticideData.filter(pesticide =>
    pesticide.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPests === 'All' || pesticide.Pests.toLowerCase().includes(selectedPests.toLowerCase())) 
  );
  // console.log(filteredPesticide)
//   console.log(selectedType);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handlePestsChange = (e) => {
    e.preventDefault();
    setSelectedPests(e.target.value);
  };

  return (
    <div>
      <h1>Pesticides</h1>
<div className='filter-container'>
      <label  className='filter-label' htmlFor="search">Search Pesticide:</label>
      <input type="text" id="search" className='search' value={searchTerm} onChange={handleSearchChange} />
      {/* <label htmlFor="type">Select Type:</label> */}
      
  {/* Add more types as needed */}
{/* </select> */}


      <label  className='filter-label' htmlFor="Pests">Select Pests:</label>
      <select className='drop-down' id="type" onChange={handlePestsChange}>
        <option value="All">All</option>
        {
        AllPests.map((value, index) => (
        <option key={index} value={value.pest}>
      {value.pest}
        </option>
        ))}

       </select>
       </div>
      <Table crops={filteredPesticide} />
    </div>
  );
};

export default PesticidePage;
