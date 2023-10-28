import React from "react";
import {Link} from 'react-router-dom';

export default function Navigation() {
    return (
  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="index.html">Logo</a></h1>
      {/*<Link href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></Link>*/}

      <nav id="navbar" class="navbar">
        <ul>
          <li><Link class="nav-link scrollto active" to="/hero">Home</Link></li>
          <li><Link class="nav-link scrollto" to="/about">About</Link></li>
          <li><Link class="nav-link scrollto" to="/services">Services</Link></li>
          <li><Link class="nav-link scrollto " to="/crops">Crop Details</Link></li>
          <li><Link class="nav-link scrollto" to="/fertilizers">Fertilizers</Link></li>
          <li class="dropdown"><Link to="/"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></Link>
            <ul>
              <li><Link to="/">Drop Down 1</Link></li>
              <li class="dropdown"><Link to="/"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></Link>
                <ul>
                  <li><Link to="/">Deep Drop Down 1</Link></li>
                  <li><Link to="/">Deep Drop Down 2</Link></li>
                  <li><Link to="/">Deep Drop Down 3</Link></li>
                  <li><Link to="/">Deep Drop Down 4</Link></li>
                  <li><Link to="/">Deep Drop Down 5</Link></li>
                </ul>
              </li>
              <li><Link to="/">Drop Down 2</Link></li>
              <li><Link to="/">Drop Down 3</Link></li>
              <li><Link to="/">Drop Down 4</Link></li>
            </ul>
          </li>
          <li><Link class="nav-link scrollto" to="/contact">Contact</Link></li>
          <li><Link class="getstarted scrollto" to="/about">Get Started</Link></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>

    )
}