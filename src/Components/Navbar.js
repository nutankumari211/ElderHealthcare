import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = ({ user, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const openDropdown = () => {
    setShowDropdown(true);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Medo Logo" className="logo" />
        <span className="logo-name">Medo</span>
      </div>
      <ul className="nav-links">
        {user ? (
          <div className="nav-items">
            <Link to="/dashboard">Dashboard</Link>
            <li className="dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <span>About</span>
              {showDropdown && (
                <div className="dropdown-content show">
                  <Link to="/about/aboutus">About Us</Link>
                  <Link to="/about/contactus">Contact Us</Link>
                  <Link to="/about/medicine-tracker">Medicine Tracker</Link>
                </div>
              )}
            </li>
            <button onClick={onSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="nav-items">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
