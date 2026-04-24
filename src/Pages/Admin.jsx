import axios from "axios";
import React, { useEffect, useState } from "react";
import './MenuCard.css';

const Admin = () => {
  const [select, setSelect] = useState("menulist");
  const [menu, setMenu] = useState([]);
  const[msg, setmsg] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    conformpassword: "",
    role: ""
  });

  useEffect(() => {
    const getMenu = async () => {
      if (select === "menulist") {
        try {
          const response = await axios.get("https://foodfly-backend-9.onrender.com/menu/get");
          setMenu(response.data);
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      }
    };
    getMenu();
  }, [select]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
// const [approve, setapprove] = useState({});

// const changehandle = (e)=>{
//   setapprove({
//     [e.target.name] : e.target.value
//   })
// }


  const Patchhandle =  async (id)=>{
        try {
           await axios.patch(`https://foodfly-backend-9.onrender.com/menu/${id}/approve`,
           {
            isApproved: "true"
           },

           {
            headers: {
              "Content-Type": "application/json"
            }
           }
          );
         setmsg(()=>({
          
              [id]: "Successfully Approved"
           })
          )
        } catch (error) {
            setmsg("Failed");
        }
  }

 const deletehandlee =  async (id)=>{
        try {
           await axios.delete(`https://foodfly-backend-9.onrender.com/menu/${id}/delete`,
          
          );
           alert("Successfully Rejected"
           )
        

        } catch (error) {
            alert(
              "Failed"
            )
        }

        // const deletee = async (id) =>{
        //     try {
        //       await axios.delete
              
        //     } catch (error) {
              
        //     }
        // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.conformpassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
     await axios.post(
        "https://foodfly-backend-9.onrender.com/Role/add",
        {
          username: form.username,
          password: form.password,
          email: form.email,
          role: form.role
        },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("User added successfully!");
      setForm({ username: "", 
        email: "",
         password: "", 
        
        conformpassword: "",
        
         role: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  const renderContent = () => {
    switch (select) {
      case "menulist":
        return (
  <div className="menu-container">
    {menu.map((p) => (
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

          <div className="btn-group"><button className="menu-btn"onClick={() => Patchhandle(p.id)} > Approve</button>

            <button className="menu-btn" onClick={() => deletehandlee(p.id)}>Delete</button>
          </div>

          {msg[p.id] && (
            <div className="message">
              {msg[p.id]}
            </div>
          )}
          
        </div>
      </div>
    ))}
  </div>
);


      case "assignrole":
        return (
            <div> <h1>Assign Role</h1>
          <div className="form-container">
           
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Enter UserName" required />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter Email" required />
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Rider">Rider</option>
              </select>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" required />
              <input type="password" name="conformpassword" value={form.conformpassword} onChange={handleChange} placeholder="Enter Confirm Password" required />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="message">{msg}</div>

          </div>

        );

      default:
        return <h2>No Data</h2>;
        
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={select === "menulist" ? "active" : ""} onClick={() => setSelect("menulist")}>Menu List</li>
          <li className={select === "assignrole" ? "active" : ""} onClick={() => setSelect("assignrole")}>Assign Role</li>
        </ul>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
