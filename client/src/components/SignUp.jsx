import React, { useContext, useState } from "react";
import "../style/Signup.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/signup",
        {
          name,
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
        setName("");
        toast.success(data);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="container" id="signup">
      <form className="form" onSubmit={SubmitHandler}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Enter your name.."
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
        <button type="submit">Sign Up</button>
        <div className="forLogin">
          <p>Already have a account?</p>
          <a href="#login">Log In</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
