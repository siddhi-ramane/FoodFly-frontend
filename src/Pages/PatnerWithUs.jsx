import React from 'react'
import "./Partnerwithus.css";
import { useNavigate } from 'react-router-dom';



const PatnerWithUs = () => {

  const navigate = useNavigate();
 return (

    <div className='main-class'>
    <div className="partner-wrapper">

     <section className="heroo">
  <div className="hero-overlay">
    <div className="hero-contentt">
      <h1>Grow Your Business With Us</h1>
      <p>Reach more customers, increase orders, and scale faster.</p>
    </div>
  </div>
</section>


      <section className="stats">
        <div className="stat">
          <h2>10K+</h2>
          <p>Active Partners</p>
        </div>
        <div className="stat">
          <h2>1M+</h2>
          <p>Customers</p>
        </div>
        <div className="stat">
          <h2>50+</h2>
          <p>Cities</p>
        </div>
      </section>

     
      <section className="benefits">
        <h2>Why Partner With Us?</h2>

        <div className="benefit-grid">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" alt="" />
            <h3>Boost Revenue</h3>
            <p>Increase your income with more daily orders.</p>
          </div>

          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" alt="" />
            <h3>Wider Reach</h3>
            <p>Get discovered by nearby customers instantly.</p>
          </div>

          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="" />
            <h3>Quick Setup</h3>
            <p>Start your journey with simple onboarding.</p>
          </div>
        </div>
      </section>

  
      <section className="categories">
        <h2>Who Can Join?</h2>

        <div className="category-grid">
          <div className="cat">
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="" />
            <p>Restaurants</p>
          </div>

          <div className="cat">
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="" />
            <p>Cafes</p>
          </div>

          <div className="cat">
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075973.png" alt="" />
            <p>Cloud Kitchens</p>
          </div>

          <div className="cat">
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075972.png" alt="" />
            <p>Home Chefs</p>
          </div>
        </div>
      </section>

     
      <section className="testimonial">
        <h2>What Our Partners Say</h2>
        <p className="quote">
          “Partnering with this platform doubled our daily orders in just 2 months.”
        </p>
        <span>- Restaurant Owner</span>
      </section>

    
      <section className="cta-banner">
        <h2>Ready to Grow?</h2>
        <p>Join us today and take your business to the next level.</p>
      </section>

    </div>
    <div className="partner-container">
      <div className="overlay">
        <h1>Already a partner?</h1>
        <p>Login here to continue managing your business</p>

        <button className="login-btn" onClick={() => navigate("/restaurant/login")}>
          Login Here
        </button>
      </div>
    </div>
    </div>
  );
};
export default PatnerWithUs
