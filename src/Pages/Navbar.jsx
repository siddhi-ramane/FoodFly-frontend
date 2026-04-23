import React, { useState } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setquery] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const lists = [
    { name: "Home", path: "/" },
    { name: "Partner With Us", path: "/partnerwithus" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Menu", path: "/menuitems" }
  ];

  const go = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
      setquery("");      


      
    }
  };

  const handleSelectChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
      
    }
  };

  return (
    <nav className="navbar">

    
      <div className="navbar-left">

        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
          <span className="company-name">FoodFly</span>
        </div>

    
        {menuOpen ? (
          <FaTimes 
            className="hamburger" 
            onClick={() => setMenuOpen(false)} 
          />
        ) : (
          <FaBars 
            className="hamburger" 
            onClick={() => setMenuOpen(true)} 
          />
        )}

       
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {lists.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                onClick={() => setMenuOpen(false)}  
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Food or Cuisine"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <button onClick={go}>Go</button>
        </div>
      </div>

      <div className="navbar-right">

        <select onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>Login</option>
          <option value="/register">Register</option>
          <option value="/login">User Login</option>
        </select>

        <FaShoppingCart 
          className="icon" 
          onClick={() => navigate("/cart")} 
        />

      </div>

    </nav>
  );
};

export default Navbar;