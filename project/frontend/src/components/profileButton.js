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
    localStorage.removeItem('role');
    console.log(localStorage.getItem('Email'));
    navigate("/");
  }

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={toggleDropdown}>
        Profile
      </button>
      {showDropdown && (
        <div className="profile-dropdown">
          {localStorage.getItem('role') ? (
            <Link to={`/${localStorage.getItem('role').toLowerCase()}_dashboard`}>
              Dashboard
            </Link>
          ) : (
           
            // You can replace "Default Dashboard" with the appropriate fallback link or handle it as needed.
         
        
          <Link to="/" onClick={logout}>
            Logout
          </Link>
           )}
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
