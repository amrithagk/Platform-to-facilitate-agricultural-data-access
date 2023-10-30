// CropsPage.js
import React, { useEffect, useState } from 'react';
import CropsTable from '../components/cropsdata';
import axios from 'axios';

const CropsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cropsData,setAllCrops] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSoil, setSelectedSoil] = useState('All');
  const [selectedWater, setSelectedWater] = useState('All');

  const [Alltypes,setAlltypes] = useState([]);
  const [AllSeasons,setAllSeason] = useState([]);
  const [SoilType,setSoil] = useState([]);
  const [Water,setWater] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:5000/crops/all").then(res=>{setAllCrops(res.data.data)})
  },[])
  useEffect(()=>{
    axios.get("http://localhost:5000/crops/types").then(res=>{setAlltypes(res.data.data)})
  },[]);
  useEffect(()=>{
    axios.get("http://localhost:5000/crops/seasons").then(res=>{setAllSeason(res.data.data)})
  },[]);
  useEffect(()=>{
    axios.get("http://localhost:5000/crops/soil_type").then(res=>{setSoil(res.data.data)})
  },[]);
  useEffect(()=>{
    axios.get("http://localhost:5000/crops/water_req").then(res=>{setWater(res.data.data)})
  },[]);
  
  
//   const cropsData = [
//     { first: 'Mark', last: 'Otto', handle: '@mdo', type: 'Type1' },
//     { first: 'Jacob', last: 'Thornton', handle: '@fat', type: 'Type2' },
//     { first: 'Larry', last: 'the Bird', handle: '@twitter', type: 'Type1' },
//     // Add more data as needed
//   ];
  const filteredCrops = cropsData.filter(crop =>
    crop.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === 'All' || crop.Type === selectedType) &&
    (selectedSeason === 'All' || crop.Season === selectedSeason) &&
    (selectedSoil === 'All' || crop.Soil_Type === selectedSoil) &&
    (selectedWater === 'All' || crop.Water_requirement === selectedWater) 
  );
//   console.log(selectedType);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);
  };

  const handleSeasonChange = (e) => {
    e.preventDefault();
    setSelectedSeason(e.target.value);
  };
  const handleSoilChange = (e) => {
    e.preventDefault();
    setSelectedSoil(e.target.value);
  };
  const handleWaterChange = (e) => {
    e.preventDefault();
    setSelectedWater(e.target.value);
  };


  return (
    <div>
      <h1>Crops Page</h1>

      <label htmlFor="search">Search Crops:</label>
      <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
      <label htmlFor="type">Select Type:</label>
      <select id="type" onChange={handleTypeChange} value={selectedType}>
        <option value="All">All</option>
        {
        Alltypes.map((value, index) => (
        <option key={index} value={value.Type}>
      {value.Type}
        </option>
        ))}
  {/* Add more types as needed */}
</select>


      <label htmlFor="Season">Select Season:</label>
      <select id="Seasons" onChange={handleSeasonChange}>
        <option value="All">All</option>
        {
        AllSeasons.map((value, index) => (
        <option key={index} value={value.Season}>
      {value.Season}
        </option>
        ))}

       </select>

       <label htmlFor="Soil Type">Select Soil Type:</label>
      <select id="Soil Type" onChange={handleSoilChange}>
        <option value="All">All</option>
        {
        SoilType.map((value, index) => (
        <option key={index} value={value.Soil_Type}>
      {value.Soil_Type}
        </option>
        ))}

       </select>     
        
       <label htmlFor="Water Req">Select Water Requirement:</label>
      <select id="Water Req" onChange={handleWaterChange}>
        <option value="All">All</option>
        {
        Water.map((value, index) => (
        <option key={index} value={value.Water_requirement}>
      {value.Water_requirement}
        </option>
        ))}

       </select>
      <CropsTable crops={filteredCrops} />
    </div>
  );
};

export default CropsPage;
