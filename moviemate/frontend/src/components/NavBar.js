import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar({ onLogout }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/add-movie" className="nav-link">Add Collection</Link>
        </li>
        <li className="nav-item">
          <button onClick={onLogout} className="nav-button">Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
