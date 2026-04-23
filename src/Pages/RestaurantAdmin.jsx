import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RestaurantAdmin.css";

const RestaurantAdmin = () => {

  const [cuisine, setcusine]  = useState([]);
  const[msg, setmsg] = useState("");
  const [form, setForm] = useState({
    item_name: "",
    item_Description: "",
    price: "",
   cuisinetype: {
  cusineTypeid: 1
},
    type: "",
    restaurantName: "",
    image_URL: "",
    prep_time: "",
    is_Available: "",
    status: "",
    isActive: false,
  });

const data = async ()=>{
try {
    const resss =  await axios.get("https://foodfly-backend-9.onrender.com/cuisine/getcusine");
setcusine(resss.data);

} catch (error) {
  setmsg("Error while fetching data")
}
}

useEffect(()=>{
  data();
} ,[]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 const submitdata={...form,
      price: form.price ? Number(form.price) : null,
      prep_time: form.prep_time ? Number(form.prep_time) : null,
      isActive: form.isActive ?? true,
 }
      await axios.post("https://foodfly-backend-9.onrender.com/menu/add/items",
         submitdata,
          {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Item added successfully!");
      setForm({
        item_name: "",
        item_Description: "",
        price: "",
      cuisinetype: {
  cusineTypeid: 1
},
        type: "",
        restaurantName: "",
        image_URL: "",
        prep_time: "",
        is_Available: "",
      
        isActive: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add item.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Menu Item</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">

          <select  value={form.cuisinetype.cusineTypeid} onChange={(e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      cuisinetype: {
        cusineTypeid: Number(value)
      }
    }));
  }}
>
  <option value="">Select an Option</option>
  {cuisine.map((i) => (
    <option key={i.cusineTypeid} value={i.cusineTypeid}>
      {i.cusineTypeName}
    </option>
  ))}
</select>

          {/* <input
            type="text"
            name="cuision_Type"
            placeholder="Cuisine Type"
            value={form.cuision_Type}
            onChange={handleChange}
          /> */}


          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={form.item_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type (Veg/Non-Veg)"
            value={form.type}
            onChange={handleChange}
          />
          <input
            type="text"
            name="prep_time"
            placeholder="Preparation Time"
            value={form.prep_time}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={form.restaurantName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image_URL"
            placeholder="Image URL"
            value={form.image_URL}
            onChange={handleChange}
          />
        </div>

        <div className="form-row full-width">
          <textarea
            name="item_Description"
            placeholder="Item Description"
            value={form.item_Description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-row">
          <select
            name="is_Available"
            value={form.is_Available}
            onChange={handleChange}
          >
            <option value="">Select Availability</option>
            <option value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
{/* 
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="new">Available</option>
            <option value="popular">Popular</option>
          </select> */}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RestaurantAdmin;
