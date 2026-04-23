import "./Contact.css";
import { MdLocationOn } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FaTriangleExclamation } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { FaMailBulk } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const ContactUs = () => {
  return (
    <div className="contact-wrapper">

 
      {/* <div className="hero-content">
        <h1>Contact Us</h1>
        <p>We’re here to help you. Reach out anytime.</p>
      </div> */}

    
      <div className="contact-container">

   
        <div className="contact-info">

       
          <div className="info-card">
            <h2> <MdLocationOn /> Address</h2>
            <p>ABC Company Pvt Ltd</p>
            <p>2nd Floor, Business Park</p>
            <p>Thane, Maharashtra, India</p>
          </div>

    
          <div className="info-card">
            <h2> <IoIosContact /> Contact</h2>
            <p>Email: support@company.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

          <div className="info-card">
            <h2> <FaTriangleExclamation /> Escalation Matrix</h2>
            <p><strong>Level 1:</strong> support@company.com</p>
            <p><strong>Level 2:</strong> manager@company.com</p>
            <p><strong>Level 3:</strong> head@company.com</p>
          </div>

        </div>

   
        <div className="contact-form">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Your Message" rows="4"></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
<div className="map-section">
  <h2>Find Us</h2>
  <iframe
    src="https://www.google.com/maps?q=Thane,Maharashtra&output=embed"
    title="map"
    loading="lazy"
  ></iframe>
</div>

<div className="quick-contact">
  <div className="qc-card">
    <h3><IoMdCall /> Call Us</h3>
    <p>+91 9876543210</p>
  </div>

  <div className="qc-card">
    <h3> <FaMailBulk /> Email</h3>
    <p>support@company.com</p>
  </div>

  <div className="qc-card">
    <h3><IoChatbubbleEllipsesSharp /> Live Chat</h3>
    <p>Available 24/7</p>
  </div>
</div>
      </div>
      
    </div>

    
  );
};

export default ContactUs;