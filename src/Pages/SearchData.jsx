import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './SearchData.css'

const SearchData = () => {

    const {query} = useParams();

const user = JSON.parse(localStorage.getItem("user"));
  const[dataa, setdata] = useState([]);
  const [msg, setmsg] = useState(""); 
  
  
      const cuisineData = async()=>{
  try {
  
        const ans = await axios.get(`https://foodfly-backend-9.onrender.com/menuItems/search?q=${query}`)
        setdata(ans.data);
        
        
      } catch (error) {
            setmsg("Items not Found");
      }
      
      }

       const navigate = useNavigate();

   const addToCart = (item) => {
   
const quantity = 1;
    const price = item.price;
    const total_amt = quantity * price;

    axios.post("https://foodfly-backend-9.onrender.com/cart/add/cart",
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
      cuisineData();
  },[query]);



   return (
  <div className="menu-container">
    {/* <h1 className="menu-heading">Explore Items</h1> */}

    {dataa.length === 0 ? (
      <p className="menu-empty">{msg || "No items found"}</p>
    ) : (
      <div className="menu-grid-container">
        {dataa.map((p) => (
          <div className="menu-card-item" key={p.id}>

            <div className="menu-image-box">
              <img className="menu-image" src={p.image_URL} alt={p.item_name} />
              <span className="menu-price">₹{p.price}</span>
            </div>

            <div className="menu-content">
              <h2 className="menu-name">{p.item_name}</h2>  <span className="menu-chip">{p.type}</span>
              
              <p className="menu-desc">{p.item_Description}</p>

              <div className="menu-labels">
               
               
              </div>

              <div className="menu-detailss">
                <p><b>Restaurant:</b> {p.restaurantName}</p>
                <p><b>Prep:</b> {p.prep_time} mins</p>

                <p className={
                  p.is_Available === "Yes"? "status-green": "status-red"
                }>
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
  
export default SearchData