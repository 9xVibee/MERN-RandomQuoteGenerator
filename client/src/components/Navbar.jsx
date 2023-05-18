import { useContext } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { Context } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logoutHandler = () => {
    try {
      axios.get("http://10.0.2.2:8000/user/logout", {
        withCredentials: true,
      });

      toast.success("Logout Successfull");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true);
    }
  };
  return (
    <div className="containerr">
      <div className="wrapperr">
        <Link to="/">Generate-Quote</Link>

        {isAuthenticated ? (
          <button className="btn" onClick={() => logoutHandler()}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {!isAuthenticated && <Link to="/signup">Register</Link>}
      </div>
    </div>
  );
};

export default Navbar;
