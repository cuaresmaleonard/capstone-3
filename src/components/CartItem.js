import "./CartItem.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import CartScreen from "../screens/CartScreen";


const CartItem = ({ item }) => {
  console.log(item)

  
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [tableRows, setTableRows] = useState([])



  const [cartPrice, setCartPrice] = useState(item.price)
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  
  console.log(cart)
  
  useEffect(() => {
    if(localStorage.getItem('items')){
      setCart(JSON.parse(localStorage.getItem('items')))
    }
  }, []);
  useEffect(() => {
    let tempTotal = 0

    cart.forEach((cart) => {
      tempTotal += cart.price;
    })
  
    setTotal(tempTotal)
  },[cart])

  localStorage.setItem('cartTotal', JSON.stringify(total))
  // const removeBtn = (item._id) => {
  //   let tempCart = [...item]
  //   let cartIds = tempCart.map((i) => {

  //   })
  // }

  return (
    <div className="cartitem">
      <div>
        <img src={item.imgUrl} alt={item.name} />
      </div>

      <Link to={`/products/${item.product}`} className="cartitem-name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem-price">${cartPrice}</p>

      <select
        value={qty}
        onChange={(e) =>
          {
            setQty(e.target.value)
            setCartPrice(e.target.value *  item.price)
            // setTotal(total + cartPrice)
          }}
        className="cartitem-select"
      >
        {[...Array(item.countInStock).keys()].map((x,i) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
      className="cartitem-deleteBtn"
      // onClick={}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
