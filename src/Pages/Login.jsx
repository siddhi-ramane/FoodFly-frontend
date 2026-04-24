import axios from 'axios';
import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email:"",
        password: ""
    })

    const nagivate = useNavigate();

const [message, setMessage] = useState("");
const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name] : e.target.value

    })
}

const submition = async (e)=>{
    e.preventDefault();

    try{
        const resp = await axios.post("https://foodfly-backend-9.onrender.com/customerDetails/login",

            {
               email: form.email,
        password: form.password
      });

      const userData = resp.data;

     
      localStorage.setItem("user", JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        area: userData.area,
        isApproved: userData.isApproved 
      }));

      alert("Login Successful");

      nagivate("/menuitems"); 
    } catch (err) {
      alert("Invalid email or password");
      setMessage("Invalid email or password");
      console.log(err);
    }
  };

  return (
    <div className="login-page1">
    <div className="login-container">
        <h2>Login</h2>
        
            <form onSubmit={submition}>
                <input type="text"  name='email' value={form.email} required placeholder='Enter Email' onChange={handleChange}/>
                <input type="password" name='password' value={form.password} required placeholder='Enter Password' onChange={handleChange}/>
               <button type="submit">Login</button>
            </form>
            {/* <p  className='paraa' onClick={()=>nagivate("/forgetPassword")}>Forget Password?</p> */}

            <div className="message">{message}</div>
        </div>
        </div>
    );

};  

export default Login;