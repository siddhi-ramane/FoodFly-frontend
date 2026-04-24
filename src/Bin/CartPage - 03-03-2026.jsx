// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CartPage.css";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

  
//   const loadCart = () => {
//     if (!user) 
//       return;

//     axios
//       .get(`https://foodfly-backend-17.onrender.com/cart/get/${user.id}`)
//       .then((res) => setCartItems(res.data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const increaseQty = (item) => {
//     axios
//       .patch(
//         `https://foodfly-backend-17.onrender.com/cart/update/${item.id}`,
//         null,
//         { params: { quantity: item.quantity + 1  } }
//       )
//       .then(() => loadCart())
//       .catch((err) => console.log(err));
//   };


//   const decreaseQty = (item) => {
//     if (item.quantity === 1) return;

//     axios
//       .patch(
//         `https://foodfly-backend-17.onrender.com/cart/update/${item.id}`,
//         null,
//         { params: { quantity: item.quantity - 1 } }
//       )
//       .then(() => loadCart())
//       .catch((err) => console.log(err));
//   };


//   const removeItem = (id) => {
//     axios
//       .delete(`https://foodfly-backend-17.onrender.com/cart/delete/${id}`)
//       .then(() => loadCart())
//       .catch((err) => console.log(err));
//   };

//   const grandTotal = cartItems.reduce(
//     (sum, item) => sum + item.total_amt,
//     0
//   );

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">My Cart</h2>

//       {cartItems.length === 0 && (
//         <p className="empty-msg">Your cart is empty</p>
//       )}

//       {cartItems.map((item) => (
//         <div key={item.id} className="cart-card">

//           <div className="cart-left">
//             <h3>{item.menu.item_name}</h3>
//             <p>Price: ₹{item.menu.price}</p>
//           </div>

//           <div className="cart-center">
//             <button onClick={() => decreaseQty(item)} className="qty-btn">-</button>
//             <span className="qty-value">{item.quantity}</span>
//             <button onClick={() => increaseQty(item)} className="qty-btn">+</button>
//           </div>

//           <div className="cart-right">
//             <p>Total: ₹{item.total_amt}</p>
//             <button onClick={() => removeItem(item.id)} className="remove-btn">
//               delete
//             </button>
//           </div>

//         </div>
//       ))}

//       {cartItems.length > 0 && (
//         <div className="cart-total">
//           Grand Total: ₹{grandTotal}
//         </div>
//       )}

//     </div>
//   );
// };

// export default CartPage;
