import React, { useState } from "react";
import "../css/styles.css";
function Row(props) {
    const [buttonVisible, setButtonVisible] = useState(true);
    return (
        <tr key={props.idx}>
            {
                props.arr.map((val, index) => (
                    <td key={index}>{val}</td>
                ))
            }
            {
                props.isNotification == true ? 
                buttonVisible &&
                <td className="accept-reject">
                    <div>
                        <button onClick={()=>{
                            props.handleDecision("Accepted", props.arr[0]); //passing the decision and corresponding purchaseID
                            setButtonVisible(false);
                            }} className="dashboard-btn accept-btn">Accept</button>
                        <button onClick={()=>{
                            props.handleDecision("Rejected", props.arr[0])
                            setButtonVisible(false);
                            }} className="dashboard-btn reject-btn">Reject</button>
                    </div>
                </td>
                : ''
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
                                <Row 
                                    key={index} 
                                    idx={index} 
                                    arr={vals} 
                                    isNotification={props.isNotification}
                                    handleDecision={props.handleDecision}
                                />
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

ResultTable.defaultProps = {
    isNotification: false,
    handleDecision: null
}