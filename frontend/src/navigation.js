import {React, useState} from "react";
import {Link} from 'react-router-dom';

export default function Navigation() {
  const [authState, setAuthState] = useState(0);
    return (
  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="index.html">Logo</a></h1>
      {/*<Link href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></Link>*/}

      <nav id="navbar" class="navbar">
        <ul>
          <li><Link class="nav-link scrollto active" to="/home">Home</Link></li>
          <li><Link class="nav-link scrollto" to="/about">About</Link></li>
          <li><Link class="nav-link scrollto " to="/crops">Crop Details</Link></li>
          <li><Link class="nav-link scrollto" to="/fertilizers">Fertilizers</Link></li>
          <li><Link class="nav-link scrollto" to="/pesticides">Pesticides</Link></li>
          <li><Link class="nav-link scrollto" to="/incentives">Incentive Schemes</Link></li>
          <li><Link class="nav-link scrollto" to="/dashboard">Dashboard</Link></li>
          { authState === 0 ? 
            (
              <>
            <li><Link class="getstarted scrollto" to="/login">Login</Link></li>
            <li><Link class="getstarted scrollto" to="/signup">Sign Up</Link></li>
              </>
            )
            :
            (
              //show dashboard
              <>
            <li><Link class="nav-link scrollto" to="/dashboard">Dashboard</Link></li>
            <li><Link class="getstarted scrollto" to="/" onClick={()=>setAuthState(0)}>Log out</Link></li>
              </>
              //set authstate to 0
              
            )
          }
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>

    )
}