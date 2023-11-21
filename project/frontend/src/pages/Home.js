// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="container mt-5 vh-100">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>Platform to Facilitate Agriculture Data Accessibility</h1>
          <p className="lead">
            Welcome to our platform dedicated to providing easy access to
            agriculture data. Explore valuable insights and information for
            improved farming practices.
          </p>
          <p>
            Ready to get started?{' '}
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
