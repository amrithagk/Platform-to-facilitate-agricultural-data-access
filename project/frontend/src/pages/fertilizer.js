import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/search', { name });
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
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResult.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchForm;
