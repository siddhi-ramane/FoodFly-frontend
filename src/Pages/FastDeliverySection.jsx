import React, { useState } from "react";
import "./FastDeliverySection.css";
import fastDeliveryImage from "../assets/fastDeliveryImage.png";
import { useNavigate } from "react-router-dom";

const FastDeliverySection = () => {

  const navigate = useNavigate();
  return (
    <section className="fast-delivery-section">

     
      <div className="fast-delivery-content">
        <h2>Fast & Reliable Delivery</h2>

        <p>
          Get your favorite meals delivered <strong>hot, fresh, and fast</strong> right to your doorstep.
          We ensure quick service, real-time tracking, and safe packaging so your food always arrives perfect.
        </p>

        <ul className="delivery-points">
          <li> Under 30–45 min delivery</li>
          <li> Live order tracking</li>
          <li> Hot & fresh packaging</li>
          <li> Easy online payments</li>
        </ul>

        <button className="cta-btn" onClick={()=>{navigate("/menuitems")}}>Order Now</button>
        
      </div>

   
      <div className="fast-delivery-image">
        <img src={fastDeliveryImage} alt="Fast Delivery Service" />
      </div>

    </section>
  );
};

export default FastDeliverySection;