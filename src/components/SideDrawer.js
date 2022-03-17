import "./SideDrawer.css";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";

const SideDrawer = ({ show, click }) => {
  const { user } = useContext(UserContext);
  const sideDrawerClass = ["sidedrawer"];
  if (show) {
    sideDrawerClass.push("show");
  }

  return user.isAdmin === false && user ? (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer_links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="sidedrawer_cartbadge">{}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Shop</span>
          </Link>
        </li>
        <li>
          <Link to="logout">
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  ) : user.isAdmin ? (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer_links" onClick={click}>
        <li>
          <Link to="/admin">
          <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link to="logout">
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer_links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="sidedrawer_cartbadge">{}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Shop</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <span>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>Login</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
