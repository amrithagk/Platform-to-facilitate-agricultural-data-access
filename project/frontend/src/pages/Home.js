// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function Home() {
  return (
    <div className="mt-5 row justify-content-center">
      <div className="row border-top pl-2">
        <img src='crops.jpg' style={{ width: 230, height: 500 }}></img>
        <div className="col-md-8 text-center">
          <h1 className='page-header'>Platform to Facilitate Agriculture Data Accessibility</h1>
          <p className="lead">
            Welcome to our platform dedicated to providing easy access to
            agriculture data. <br/><br/>Explore valuable insights and information for
            improved farming practices.
          </p>
          <p>
            Ready to get started?{' '}
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </p>
        </div>
        <img src='crops.jpg' style={{ width: 230, height: 500 }}></img>
      </div>
    </div>
  );
}

export default Home;
