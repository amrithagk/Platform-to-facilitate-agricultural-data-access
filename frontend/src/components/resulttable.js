import React from "react";
import "../css/styles.css";
function Row(props) {
    return (
        <tr key={props.idx}>
            {
                props.arr.map((val, index) => (
                    <td key={index}>{val}</td>
                ))
            }
        </tr>
    )
}
export default function ResultTable(props) {
    
    const objArr = props.searchResult;
    const keys = Object.keys(objArr[0]);
    let valsArr = []
    objArr.forEach(obj => {
        valsArr.push(Object.values(obj))
    });

    return (

        objArr.length > 0 ? (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {
                                keys.map((attr, index) => (
                                    <th key={index}>{attr}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            valsArr.map((vals, index) => (
                                <Row key={index} idx={index} arr={vals} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) :
            (
                <p>No results found.</p>
            )


    )
}