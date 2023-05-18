import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Context } from "./index.js";

function App() {
  const { setIsAuthenticated } = useContext(Context);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/user/me", {
          withCredentials: true,
        })
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Router>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
