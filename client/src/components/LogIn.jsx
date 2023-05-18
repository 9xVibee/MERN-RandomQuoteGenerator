import React, { useContext, useState } from "react";
import "../style/Login.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (data.error) toast.error(data.error);
      else {
        setEmail("");
        setPassword("");
        toast.success(data);
        setIsAuthenticated(true);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  return (
    <div id="login" className="container">
      <form className="form" onSubmit={SubmitHandler}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log In</button>
        <div className="forLogin">
          <p>Don't have account??</p>
          <a href="#signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
