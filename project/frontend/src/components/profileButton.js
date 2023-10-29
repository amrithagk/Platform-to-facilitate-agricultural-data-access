// ProfileButton.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css'

const ProfileButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('Email');
    console.log(localStorage.getItem('Email'))
    navigate("/");
  }

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={toggleDropdown}>
        Profile
      </button>
      {showDropdown && (
        <div className="profile-dropdown">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/logout" onClick={logout}>Logout</Link>
          {/* Add more links as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
