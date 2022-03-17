
import "./CartScreen.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

//components
import CartItem from "../components/CartItem";


const CartScreen = () => {
  const token = localStorage.getItem('token')
  const {user} = useContext(UserContext)
  console.log(user)
  let userId = user.id
  const [cartTotal, setCartTotal] = useState(0)
  useEffect(() => {
    if(localStorage.getItem('cartTotal')){
      setCartTotal(JSON.parse(localStorage.getItem('cartTotal')))
    }
  },[cartTotal])
  
  console.log(cartTotal)
  let myCart
 if(localStorage.getItem('items')){  
   myCart = JSON.parse(localStorage.getItem('items'))
  }
  let productId;
  if(myCart){
    productId = myCart[0]._id
  }
  

  console.log(myCart)

  // const [cartPrice, setCartPrice] = useState(0)
  // const [price, setPrice] = useState(0);
  // const [qty, setQty] = useState(1);

  function checkOut(e){
    e.preventDefault()
    
    fetch('http://localhost:5000/order/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        console.log(data)
        localStorage.removeItem('item')
        localStorage.removeItem('items')
        alert('Thank you for your purchase')
      } else {
        alert('error occured')
      }
    })
  }
  
  return (
    <>
    <div className="cartscreen">
      <div className="cartscreen-left">
        <h2>Shopping Cart</h2>
        {(!myCart || myCart.length === 0) ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          myCart.map((item) => (
            <CartItem
              key={item._id}
              item={item}

            />
          ))
        )}
      </div>

      <div className="cartscreen-right">
        <div className="cartscreen-info">
          <p>Subtotal () items</p>
          <p>${cartTotal}</p>
        </div>
        <div>
          <button onClick={(e) => checkOut(e)}>Procced To Checkout</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartScreen;
