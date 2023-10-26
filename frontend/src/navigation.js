import React from "react";
import {Link} from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/fertilizers">Fertilizers</Link></li>
            </ul>
        </nav>
    )
}