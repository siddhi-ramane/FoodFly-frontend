import React, { useState } from 'react'
import './Registration.css'
import axios from 'axios';

const Registration = () => {

    const [form, setForm] = useState({name : "" ,
        lastname: "",
        email: "",
        PhoneNumber: "",
        password: "",
        confirmpassword: "",
        img: "",
        address: "",
        location: "",
        state: "",
        Country: ""

    })
const [message, setMessage] = useState("");
    const hanndleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

const handleSubmit = async (e) =>{
     e.preventDefault();

     const passcontrain = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if(!passcontrain.test(form.password)){
      setMessage("Password must be at least 8 chars, include upper & lower case, number, and special char")
      return;
    }
     

     if(form.password !== form.confirmpassword){
        setMessage("Enter Correct Password");
        return;
     }

     try{
        const resp = await axios.post("https://foodfly-backend-11.onrender.com/customerDetails/register", 
           {
            name : form.name,
            lastName: form.lastname,
            phoneNumber: form.PhoneNumber,
            email: form.email,
            password: form.password,
           profile: form.img,
           area: form.location,
           address: form.address,
           state: form.state,
           country: form.Country
           },
           {
            headers: {
              "Content-Type": "application/json"} 
        
     }
    
);
 console.log("User added:", resp.data);
        setMessage("Registration successful!");

        setForm({
        name: "",
        lastname: "",
        email: "",
        PhoneNumber: "",
        password: "",
        confirmpassword: "",
        img: null,
        address:"",
        location: "",
        state: "",
        country: ""
    });
      } catch (error) {
        console.error(error);
        setMessage("Registration failed!");
      }
    };

  return (
    <div className="registration-container">
  <div className="form-wrapper">
    <h1 className="form-title">Register Here</h1>
    <form onSubmit={handleSubmit} className="registration-form">
  <div className="form-row">
      <input type="text" name='name' value={form.name} placeholder='First Name' required onChange={hanndleChange} />
        <input type="text" name='lastname' value={form.lastname} placeholder='Last Name' required onChange={hanndleChange}/>
      </div>

     <div className="form-row">
    <input type="email" name='email' value={form.email} placeholder='Email' required onChange={hanndleChange} />
        <input type="tel" name='PhoneNumber' value={form.PhoneNumber} placeholder='Phone Number' required onChange={hanndleChange}/>
      </div>

      <div className="form-row">
    <input type="password" name='password' value={form.password} placeholder='Password' required onChange={hanndleChange} />
        <input type="password" name='confirmpassword' value={form.confirmpassword} placeholder='Confirm Password' required onChange={hanndleChange} />
      </div>

      <div className="form-row">
     <input type="file" accept='image/*' name='img' onChange={hanndleChange} />
      </div>

      <div className="form-row">
    <input type="text" name='address' value={form.address} placeholder='Address' onChange={hanndleChange}/>
        
      </div>

      <div className="form-row">
    <input type="text" name='location' value={form.location} placeholder='Location' onChange={hanndleChange}/>
        <input type="text" name='state' value={form.state} placeholder='State' onChange={hanndleChange}/>
      </div>

      <div className="form-row">
        <input type="text" name='Country' value={form.Country} placeholder='Country' onChange={hanndleChange}/>
     </div>

      <button type='submit' className="submit-btn">Submit</button>
    </form>

    {message && <p className="form-message">{message}</p>}
  </div>
</div>

  );
};

export default Registration;