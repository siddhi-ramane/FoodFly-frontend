import "./CartPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useCallback } from "react";

const CartPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [itemdata, setitemdata] = useState([]);
  const [msg, setmsg] = useState("");

  

const getdata = useCallback(async () => {
  try {
    const respo = await axios.get(
      `https://foodfly-backend-111.onrender.com/api/cart/get/${userId}`
    );
    setitemdata(respo.data);
  } catch (error) {
    setmsg("No Item Found");
  }
}, [userId]);

useEffect(() => {
  if (!userId) return;
  getdata();
}, [getdata, userId]);

  const increasequantity = async (item) => {
    try {
      await axios.patch(
        "https://foodfly-backend-111.onrender.com/api/cart/update/cartitems",
        {
          cartid: item.cartid,
          quantity: item.quantity + 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getdata();
    } catch (error) {
      setmsg("Error updating the item");
    }
  };

  const decreasequantity = async (item) => {
    if (item.quantity === 1) return;

    try {
      await axios.patch(
        "https://foodfly-backend-111.onrender.com/api/cart/update/cartitems",
        {
          cartid: item.cartid,
          quantity: item.quantity - 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getdata();
    } catch (error) {
      setmsg("Error updating the item");
    }
  };

  const deleteitem = async (item) => {
    try {
      await axios.delete(
        `https://foodfly-backend-111.onrender.com/api/cart/delete/${item.cartid}`
      );
      getdata();
    } catch (error) {
      setmsg("Error deleting item");
    }
  };

  const itemTotal = itemdata.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const gst = itemTotal * 0.18;
  const delivery = 100;
  const totalamount = itemTotal + gst + delivery;

  const orderdata = {
    totalAmount: totalamount,
    customerId: userId,
  };

  const orderpostt = async () => {
    try {
      const res = await axios.post(
        "https://foodfly-backend-111.onrender.com/api/create-order",
        orderdata
      );

      const order = res.data;

      const options = {
        key: "rzp_test_S6xwpQtV10MT8F",
        amount: order.totalAmount * 100,
        currency: "INR",
        order_id: order.id,
        handler: function (response) {
          alert("Payment Successful");
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
      alert("Payment Failed");
    }
  };

  return (
    <div className="main-div">
      {msg && <div className="error-msg">{msg}</div>}

      {itemdata.length === 0 ? (
        <div className="right-div">
          <p>Your cart is empty</p>
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
                    <button onClick={() => decreasequantity(item)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increasequantity(item)}>
                      <FaPlus />
                    </button>
                  </div>

                  <div className="price">Price: ₹{item.price}</div>

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
              <li>
                Delivery Charges: <b>₹100</b>
              </li>
              <li>
                GST: <b>18%</b>
              </li>
              <li>
                Total Amount: <b>₹{totalamount}</b>
              </li>
            </ul>

            <button className="checkout-btn" onClick={orderpostt}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;