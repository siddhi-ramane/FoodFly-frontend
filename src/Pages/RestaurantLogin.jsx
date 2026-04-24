import axios from 'axios'
import React, { useState } from 'react'
import "./RestaurantLogin.css"
import { useNavigate } from 'react-router-dom';

const RestaurantLogin = () => {
const navigate  = useNavigate();
const[form, setForm] = useState({
email: "",
password:""
})
const [message, setMessage] = useState("");

    const handleChange = (e) =>{
       setForm({
         ...form,
         [e.target.name]: e.target.value
       })

    }

    const submitform = async (e)=>{
e.preventDefault();

        try {
            const ress = await axios.post("https://foodfly-backend-11.onrender.com/Role/Login",
        {
            email: form.email,
            password: form.password

        },

        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

     setMessage("Login Done")
     setForm({
         email:"",
         password: ""
        });

        localStorage.setItem("user", JSON.stringify(ress.data));
        if(ress.data.role === "Restaurant"){
            navigate("/restaurant/addmenu");
         
    }
    else{
        navigate("/RiderAdmin")
    }
}
        catch(error){
            setMessage("Login Failed")
        }


    } ;



  return (
    <div className="login-containerr">
      <form className="login-form" onSubmit={submitform}>
        <h2 className="login-title">Restaurant Login</h2>

            <input  className="login-input" type="text" name='email'placeholder='Enter Email' value={form.email} required onChange={handleChange}/>
            <input className="login-input" type="password" name='password'placeholder='Enter Password' value={form.password} required onChange={handleChange}/>
         <button type="submit" className="login-button">Login</button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default RestaurantLogin