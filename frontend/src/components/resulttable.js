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
                            props.handleAccept(props.arr.Purchase_id);
                            setButtonVisible(false);
                            }} className="btn accept-btn">Accept</button>
                        <button onClick={()=>{
                            props.handleReject(props.arr.Purchase_id)
                            setButtonVisible(false);
                            }} className="btn reject-btn">Reject</button>
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
                                    handleAccept={props.handleAccept} 
                                    handleReject={props.handleReject}
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
    handleAccept: null,
    handleReject: null
}