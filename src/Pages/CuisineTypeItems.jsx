import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CuisineTypeItems.css'

const CuisineTypeItems = () => {
const {id} = useParams();
const[data, setdata] = useState([]);
const [msg, setmsg] = useState(""); 


const user = JSON.parse(localStorage.getItem("user"));
const addToCart = (item) => {
   
const quantity = 1;
    const price = item.price;
    const total_amt = quantity * price;

    axios.post("https://foodfly-backend-12.onrender.com/cart/add/cart",
       {
        user: { id: user.id },     
        menu: { id: item.id },    
        quantity: 1,
        price,
        total_amt,
        area: user.area}
      ,{
        headers:{
          "Content-Type": "application/json"
        }
    
    })
    .then(() => {
      alert("Item Added To Cart");
      navigate("/cart");
    })
    .catch(err => {
      console.error(err);
      alert("Error adding item to cart");
    });
  

      
   
  };
useEffect(()=>{
    const cuisineData = async()=>{
try {

      const ans = await axios.get(`https://foodfly-backend-12.onrender.com/menuItems/cuisine/${id}`)
      setdata(ans.data);
    } catch (error) {
          setmsg("Items not Found");
    }
    }

    


    cuisineData();
},[id]);

  
 const navigate = useNavigate();


 return (
  <div className="food-wrapper">
    <h1 className="food-heading">Explore Items</h1>

    {data.length === 0 ? (
      <p className="food-empty">{msg || "No items found"}</p>
    ) : (
      <div className="food-grid">
        {data.map((p) => (
          <div className="food-card" key={p.id}>
            
            <div className="food-img-box">
              <img src={p.image_URL} alt={p.item_name} />
              
            </div>

            <div className="food-content">
              <h2 className="food-name">{p.item_name}</h2>
              <p className="food-desc">{p.item_Description}</p>
              <p className="food-price">₹{p.price}</p>

              <div className="food-tags">
                <span>{p.type}</span>
                <span>{p.cuisinetype?.cusineTypeName}</span>
              </div>

              <div className="food-meta">
                <p><b>Restaurant:</b> {p.restaurantName}</p>
                <p><b>Prep:</b> {p.prep_time} mins</p>
                <p className={p.is_Available === "Yes" ? "available" : "not-available"}>
                  Available: {p.is_Available}
                </p>
              </div>
            </div>
 <button className="add-btn" onClick={() => addToCart(p)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default CuisineTypeItems