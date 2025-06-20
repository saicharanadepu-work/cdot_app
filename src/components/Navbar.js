import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // adjust path as needed

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Cigar Distributors Of Texas
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
      
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
