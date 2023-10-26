import React, { useState } from 'react';
import axios from 'axios';

const Fertilizers = () => {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      console.log("name is ", name);
      const response = await axios.post(
        'http://localhost:3000/fertilizers', 
        { name });
      console.log("request sent")
      /* const response = await fetch('/fertilizers',
        {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
          body: name
        }
      ) */
      setSearchResult(response.data);
      console.log(searchResult);
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
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResult.map((result) => (
              <li key={result.id}>{result.Stringify()}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Fertilizers;
