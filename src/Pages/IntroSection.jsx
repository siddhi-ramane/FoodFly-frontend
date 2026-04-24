import React, { useEffect, useRef, useState } from "react";
import "./IntroSection.css";
import foodflyImage from "../assets/foodflyImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IntroSection = () => {
  // const [item, setitem] = useState([]);
  const [data, setdata] = useState([]);
  const [msg, setmsg] = useState("");
  const navigate = useNavigate();

  // const itemScrollRef = useRef();
  const cuisineScrollRef = useRef();

  const scroll = (ref, direction) => {
    ref.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  const items = async () => {
    try {
      const info = await axios.get("https://foodfly-backend-17.onrender.com/items/getItems");
      setdata(info.data);
    } catch (error) 
    {
      setmsg("Items not Found");
      
    }
  };

  const cuisinedata = async () => {
    try {
      const info = 
      await axios.get("https://foodfly-backend-17.onrender.com/cuisine/getcusine");
    setdata(info.data);
    } 
    catch (error) {
      setmsg("Cuisine not Found");
    }
  };

     useEffect(() => {
    items();
    cuisinedata();
  }, []);

  const datafetched = async (id)=>{
     navigate(`/items/${id}`)
    
  }



  return (
    <>
      
      <div className="intro-section">


  <div className="intro-image">
    <img src={foodflyImage} alt="FoodFly App" />
  </div>

  <div className="intro-content">

    <div className="badge">⭐ 100% Customer Satisfaction Guaranteed</div>

    <h1>Food You Love. Service You Trust. </h1>

       <p className="main-text">
  
        At FoodFly, customer satisfaction is our top priority.
        We ensure every order is delivered fresh, fast, and exactly the way you expect it.
     
    </p>

 
            


    <div className="trust-box">
      "We don’t just deliver food, we deliver satisfaction."
    </div>

    <button className="download-btn" onClick={()=>{navigate("/menuitems")}} >Order with Confidence</button>

  </div>

</div>

      {/* <div className="grid-wrapper">
        <h2 className="section-title">Explore Items</h2>



        <div className="scroll-container">
          <button
            className="arrow left"
            onClick={() => scroll(itemScrollRef, "left")}
          >


            ❮
          </button> */}


          {/* <div className="grid" ref={itemScrollRef}>
            {item.map((i) => (
              <div key={i.itemid} className="cards">
                <img className="imgg" src={i.itemimage} alt="menu" />
                 <h4 className="product-name">{i.itemName}</h4>
              </div>
    ))}
          </div> */}
{/* 
          <button
            className="arrow right"
            onClick={() => scroll(itemScrollRef, "right")}
          >
            ❯
           </button>
        </div>
      </div> */}

      <div className="carousel-wrapper">
        <h2 className="carousel-title">Explore Our Cuisines </h2>

      {msg && <div className="error-msg">{msg}</div>}

        <div className="carousel-container">
          <button
            className="nav-btn prev"
            onClick={() => scroll(cuisineScrollRef, "left")}
          >
            ❮

          </button>

          <div className="carousel-track" ref={cuisineScrollRef}>
            {data.map((i) => (
              <div key={i.cusineTypeid} className="product-card" onClick={()=>datafetched(i.cusineTypeid) } >
                <img
                  className="product-img"
                  src={i.cusineTypeimage}
                  alt="item"

                  onClick={()=> datafetched(i)}
                />
                {/* <h4 className="product-name">{i.cusineTypeName}</h4> */}
              </div>
            ))}
          </div>



          <button
            className="nav-btn next"
            onClick={() => scroll(cuisineScrollRef, "right")}
          >
            ❯
          </button>
        </div>
      </div>
    </>
  );
};

export default IntroSection;