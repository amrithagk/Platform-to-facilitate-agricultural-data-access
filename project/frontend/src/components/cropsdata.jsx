// CropsTable.js
import React from 'react';

const Table = ({ crops }) => {
  const keysCrops = Object.keys(crops[0] || {}); // Handle the case when crops is an empty array

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          {keysCrops.map((key, index) => (
            <th key={index} scope="col">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {crops.map((crop, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Serial number column */}
            {keysCrops.map((key, innerIndex) => (
              <td key={innerIndex}>{crop[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
