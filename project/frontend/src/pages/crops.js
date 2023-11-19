import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultTable from '../components/resulttable';

const Crops = () => {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/crops',
        { name }
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult.length > 0 ? (
        <ResultTable searchResult={searchResult} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Crops;
