import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuCard.css';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const MenuItem = () => {
  // const [menu, setMenu] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
const [menuData, setMenuData] = useState([]); 
  const [page, setPage] = useState(0);       
  const [size] = useState(8);               
  const [totalPages, settotalPages] = useState(0);



  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     try {
  //       const response = await axios.get("https://foodfly-backend-17.onrender.com/menuItems/get");
  //       setMenu(response.data);
       

  //       //  localStorage.setItem("user", JSON.stringify(response))
  //     } catch (error) {
  //       setMsg("No Items Found");
  //     }

     
  //   };
      
  //   fetchMenu();

  
  // }, []);




  const pagedata = async () => {
    try {
      const res = await axios.get(
        `https://foodfly-backend-17.onrender.com/menuItems/get?page=${page}&size=${size}`
      );

     
      setMenuData(response.data.content);     
      setTotalPages(response.data.totalPages);

    } catch (error) {
      setMsg("No Items Found");
    }
  };

 useEffect(() => {
    fetchMenu();
  }, [page, size]);

  const addToCart = (item) => {
 
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

  const isApproved = parseInt(user.isApproved || user.is_approved || "0", 10);
if (isApproved !== 1) {
  alert("Your account is not approved yet!");
  return;
}

    const quantity = 1;
    const price = item.price;
    const total_amt = quantity * price;

    axios.post("https://foodfly-backend-17.onrender.com/cart/add/cart",
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

  return (
    <>
    <div className="menu-container">
      {menuData.length > 0 ? menuData.map((p) => (
        <div className="menu-card" key={p.id}>
          <div className="menu-image">
            <img src={p.image_URL} alt={p.item_name} />
          </div>
          <div className="menu-details">
            <h2 className="menu-title">{p.item_name}</h2>
            <p className="menu-description">{p.item_Description}</p>
            <div className="menu-info">
              <p><strong>Price:</strong> ₹{p.price}</p>
              <p><strong>Cuisine:</strong> {p.cuision_Type}</p>
              <p><strong>Type:</strong> {p.type}</p>
              <p><strong>Restaurant:</strong> {p.restaurantName}</p>
              <p><strong>Preparation Time:</strong> {p.prep_time} mins</p>
              <p><strong>Status:</strong> {p.status}</p>
            </div>
            <button className="add-btn" onClick={() => addToCart(p)}>
              Add To Cart
            </button>
          </div>
        </div>
      )) : <p>{msg}</p>}




    </div>


<div className='paginationnn'>

      <button className='lefttt' disabled={page === 0} 
          onClick={() => setPage(prev => prev - 1)}>
<FaLongArrowAltLeft />

      </button>

 {Array.from({ length: totalPages }, (_, i) => (
  <button key={i}  className='main-buttonn' onClick={()=>{setPage(i)}}>
    {i +1 }


  </button>

 ))
}


<button className='right' 
          disabled={page === totalPages - 1} 
          onClick={() => setPage(prev => prev + 1)}> <FaLongArrowAltRight /> </button>
</div>
</>
  );
};

export default MenuItem;
