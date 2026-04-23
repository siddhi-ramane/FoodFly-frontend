import React, { useState } from "react";
import axios from "axios";

function ResetPasswordUI() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [msg, setMsg] = useState("");

  const sendCode = async () => {

   
    if (password !== repassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `https://foodfly-backend-9.onrender.com/send-code?email=${email}`
      );

      setMsg(res.data);

    } catch (err) {
      setMsg(err.response?.data || "Error sending code");
    }
  };

  return (
    <div className="container">

      <h2>Reset Password</h2>

     
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Re-enter Password"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
      />

      <button onClick={sendCode}>Send Code</button>

      <p>{msg}</p>

    </div>
  );
}

export default ResetPasswordUI;