import "./CartPage.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";



const CartPage = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [itemdata, setitemdata] = useState([]);
  const [msg, setmsg] = useState("");
  // const [clear, setclear] = useState("");


    const getdata = async () => {
      try {
     const respo = await axios.get(`https://foodfly-backend-9.onrender.com/cart/get/${user.id}`);
        setitemdata(respo.data);
        console.log(respo);

        
      } catch (error) {
        setmsg("No Item Found");
      }
    };

    
    


  // const clearalldata = async () => {
  //     try {
  //    const respo = await axios.get(`https://foodfly-backend-9.onrender.com/cart/get/${user.id}`);
  //       setclear(respo.data);
  //       console.log(respo);
  //     } catch (error) {
  //       setmsg("Couldn't clear data ");
  //     }
  //   }
  
  // clearalldata();

  
  useEffect(() => {
    if (!user) { 
      return;

     
    }
 getdata();
    }, [user]);



  

  const increasequantity = async (item) => {
    try {
    await axios.patch(
        "https://foodfly-backend-9.onrender.com/cart/update/cartitems",
        {
          cartid: item.cartid,
          quantity: item.quantity + 1},
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        
      );

      
  getdata();
   
    } catch (error) {
      setmsg("Error updating the item");
      console.log(error);
    }

  console.log(increasequantity);
  
  };

  



  const deleteitem = async (item) =>{ 
    try {
      await axios.delete(`https://foodfly-backend-9.onrender.com/cart/delete/${item.cartid}`,

      {
        
      },
      {
        header :{
          "Content-Type": "application/json"
        }
      }
    );
      getdata();
    } catch (error) {
      
    }
  }

  

  //   const deleteitemall = async (item) =>{
  //   try {
  //     await axios.delete("https://foodfly-backend-9.onrender.com/cart/delete/all",

  //     {
        
  //     },
  //     {
  //       header :{
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   );
  //   } catch (error) {
      
  //   }
  // }

  const decreasequantity = async (item) => {
    if (item.quantity === 1) {
      console.log(item);
      return;
    }
     try {
     await axios.patch(
        "https://foodfly-backend-9.onrender.com/cart/update/cartitems",
        {
          cartid: item.cartid,
           quantity: item.quantity - 1},
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

getdata();
    } catch (error) {
      setmsg("Error updating the item");
      console.log(error);
    }
  };


  const itemTotal = itemdata.reduce(
  (sum, item) =>  {
  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 1;
  return sum + price * qty;
}, 0
);

  const gst = itemTotal* 0.18;

  const delivery = 100;

  const totalamount = itemTotal + gst+ delivery;

const orderdata = {
  totalAmount: totalamount,
  customerId: user.id

}

const orderpostt = async (orderdata) => {
  try {
    const res = await axios.post(
      "https://foodfly-backend-9.onrender.com/create-order",
      orderdata
    );

    const order = res.data;

    const options = {
      key: "rzp_test_S6xwpQtV10MT8F",
      amount: order.totalAmount *100, 
      currency: "INR",
      order_id: order.id, 
      

      handler: function (response) {
        alert("Payment Successful");

        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
      },

      prefill: {
         name: "FoodFly",
     email: "ramanesiddhi9@gmail.com",
    contact: "9136568837"
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.log(error);
    alert("Payment Failed ");
  }
};

  return (
  <>
  <div className="main-div">

  {msg && (
    <div className="error-msg">
      {msg}
    </div>
  )}

  <div className="left-div"></div>

    
      {itemdata.length === 0 ? (
        <div className="errot">
          <div className="right-div">
            <p>Your cart is empty</p>
          </div>
        </div>
      ) : (
        <div className="cart-section">

     
          {itemdata.map((item) => (
            <div key={item.cartid} className="mainsecond-div">
              <ul className="list">
          <li className="listed">

           <div className="image">
                <img src={item.menuimg} alt="menu" />
                  </div>

          <div className="qty">
                 <button onClick={() => decreasequantity(item)}><FaMinus /></button>
            <span>{item.quantity}</span>
           <button onClick={() => increasequantity(item)}><FaPlus /></button>
            </div>

    <div className="price">
           Price: ₹{item.price}
   </div>

      <button onClick={() => deleteitem(item)}>
          <AiOutlineDelete />
 </button>

  <div className="total">
         Total: ₹{item.price * item.quantity}
    </div>

          </li>
              </ul>
            </div>
          ))}

          <div className="summary">
            <ul className="list">
              <li>Delivery Charges:    <b>₹100</b></li>
              <li>GST: <b>18% </b></li>
              <li>Total Amount: <b>₹{totalamount}</b></li>
            </ul>

            <button
              className="checkout-btn"
              onClick={() => orderpostt(orderdata)}
            >
              Place Order
            </button>
          </div>

        </div>
      )}

    </div>
  </>
);
};

export default CartPage;