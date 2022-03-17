import { Link } from "react-router-dom";
import UserContext from '../UserContext';
import { useContext, useState, useEffect } from "react";
import "./Navbar.css";


const Navbar = ({click}) => {

  const { user } = useContext(UserContext);

  // let myCart = JSON.parse(localStorage.getItem('items'))
  // console.log(typeof myCart.length)


  // const [cartCount, setCartCount] = useState(0)
  // setCartCount(Number(myCart.length))
  // const getCartCount = () => {
  //   return cartItems.reduce((qty, item) => qty + Number(item.qty), 0)
  // };
  return (
    (user.isAdmin === false && user) ?
    <nav className="navbar">
      <div className="navbar-logo">
        Shopee
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/cart" className="cart_link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              {/* { myCart.length > 0 &&
                <span className="cartlogo_badge">{Number(myCart.length)}</span>
              } */}
              <span className="cartlogo_badge">0</span>
            </span>
            <span>Cart</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
              <span>
                Profile
              </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/logout">
          <span>Logout</span>
          </Link>
        </li>
      </ul>
      <div className="hamburger_menu" onClick={click}>
      <div></div>
      <div></div>
      <div></div>
      </div>

    </nav>
    : (user.isAdmin) ?
    <nav className="navbar">
    <div className="navbar-logo">
      Shopee
    </div>
    <ul className="navbar-links">
      <li>
        <Link to="/admin">
        <span>Admin</span>
        </Link>
      </li>
      <li>
        <Link to="/logout">
        <span>Logout</span>
        </Link>
      </li>
    </ul>
    <div className="hamburger_menu" onClick={click}>
    <div></div>
    <div></div>
    <div></div>
    </div>

  </nav>
    : 

  <nav className="navbar">
  <div className="navbar-logo">
  {/* <img src="./M1-.png" alt="logo"/> */}
  Shopee
  </div>
  <ul className="navbar-links">
    <li>
      <Link to="/cart" className="cart_link">
        <i className="fas fa-shopping-cart"></i>
        <span>
          {/* <span className="cartlogo_badge">{Number(myCart.length)}</span> */}
        </span>
        <span>Cart</span>
      </Link>
    </li>
    <li>
      <Link to="/">Shop</Link>
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
  <div className="hamburger_menu" onClick={click}>
  <div></div>
  <div></div>
  <div></div>
  </div>

</nav>
  );
};

export default Navbar;
