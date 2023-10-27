import React from "react";

export default function ResultTable(props) {
    const objArr = props.searchResult;
    const keys = Object.keys(objArr[0]);
    const valsArr = objArr.forEach(obj => {
        Object.values(obj)
    });

    return (
        <div>
            <h2>Search Results:</h2>
            <table>
                <thead>
                    <tr>
                        {
                            keys.map((attr, index) => {
                                <th key={index}>{attr}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        valsArr.map((vals, index) => {
                            <tr key={index}>
                                {
                                    vals.map((val, index) => {
                                        <td key={index}>{val}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}