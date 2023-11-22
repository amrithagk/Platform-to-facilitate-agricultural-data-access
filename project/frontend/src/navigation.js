import {React, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import './css/styles.css';

export default function Navigation() {
  const [authState, setAuthState] = useState(0); 
  /*
    0 - not logged in
    1 - farmer
    2 - dealer
  */

  useEffect(() => {
    const getAuthState = () => {
      try {
        const role = localStorage.getItem("role");
        console.log("role", role);
        if (role === 'Farmer'){
          return 1;
        } else if (role === 'Dealer') {
          return 2;
        } else {
          return 0;
        }
      } catch(err){
        console.log("auth error", err);
        return 0;
      }
    };
    
    setAuthState(getAuthState());
    console.log("authstate", authState);
  }, []);

  const handleLogout = () => {
    setAuthState(0);
    console.log("authstate after farmer logout", authState);
    localStorage.removeItem('Email');
    localStorage.removeItem('role');
  }

  return (
  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto mt-3 mb-30"><a href="/">CropSphere</a></h1>

      <nav id="navbar" class="navbar mt-15 mb-30">
        <ul>
          <li><Link class="nav-link scrollto active" to="/">Home</Link></li>
          <li><Link class="nav-link scrollto " to="/crops">Crop Details</Link></li>
          <li><Link class="nav-link scrollto" to="/fertilizers">Fertilizers</Link></li>
          <li><Link class="nav-link scrollto" to="/pesticide">Pesticides</Link></li>
          <li><Link class="nav-link scrollto" to="/warehouse">Warehouse</Link></li>
          <li><Link class="nav-link scrollto" to="/incentives">Incentive Schemes</Link></li>
          
          { authState === 0 ? 
            (
              <>
            <li><Link class="nav-link scrollto getstarted" to="/login">Login / SignUp</Link></li>
              </>
            )
            :
            (
              authState === 1 ? (
                //show farmer dashboard
                <>
                <li><Link class="nav-link scrollto" to="/farmer_dashboard">Dashboard</Link></li>
                <li><Link class="getstarted scrollto" to="/" onClick={()=>{
                    setAuthState(0);
                    localStorage.removeItem('Email');
                    localStorage.removeItem('role');
                  }}>Log out</Link></li>
                </>
              ) : (
                //show  dealer dashboard
                <>
                <li><Link class="nav-link scrollto" to="/dealer_dashboard">Dashboard</Link></li>
                <li><Link class="getstarted scrollto" to="/" onClick={handleLogout}>Log out</Link></li>
                </>
              )
              
              //set authstate to 0 after logout?
            )
          }
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>

    )
}