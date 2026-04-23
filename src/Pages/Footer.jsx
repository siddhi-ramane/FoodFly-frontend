import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();
    return (
    <footer className="foodfly-footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">FoodFly 🍔</h2>
          <p className="footer-description">
            FoodFly delivers your favorite meals fresh and fast.
            Experience delicious food at your doorstep with just a few clicks.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li onClick={()=>{navigate("/")}}>Home</li>
            <li onClick={()=>{navigate("menuitems")}}>Menu</li>
            <li onClick={()=>{navigate("partnerwithus")}}>Partner With Us</li>
            <li onClick={()=>{navigate("contactus")}}>Contact</li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 123 Food Street, Mumbai, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ support@foodfly.com</p>
        </div>

       
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FoodFly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
