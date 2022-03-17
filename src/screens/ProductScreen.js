import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../UserContext'
import './ProductScreen.css';



const ProductScreen = () => {



    const { user } = useContext(UserContext)


    const { productId } = useParams();
    // const [, forceRender] = useState({});
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
    const [imgUrl, setImgUrl] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [qty, setQty] = useState(1);
    const [cartPrice, setCartPrice] = useState(0)
    const [cart, setCart] = useState([])
    const [item, setItem] = useState([])

    

    useEffect(() => {
        // console.log(productId)
        fetch(`https://evening-forest-87496.herokuapp.com/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('item',JSON.stringify(data))  
            console.log(data)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setImgUrl(data.imgUrl)
            setCountInStock(data.countInStock)
            setCartPrice(data.price)
        })

    },[productId])

    useEffect(() =>{

        // console.log(cart.length)
        
        localStorage.setItem('items', JSON.stringify(cart))

    },[cart.length])

    let shudbeitem;
    if(localStorage.getItem('item')){
        console.log(localStorage.getItem('item'))
        shudbeitem = JSON.parse(localStorage.getItem('item'));
    }
    
    console.log(typeof shudbeitem)
    const addToCart = (shudbeitem) => {
        console.log([...cart, shudbeitem])
        console.log(...cart)
        console.log(shudbeitem)
        setCart([...cart, shudbeitem])
    }


    // let items = JSON.parse(localStorage.getItem('items'))
    // console.log(items)
        // console.log(user)
	return (
        (user.isAdmin === false && user.id) ?
        <div className="productscreen">
		<div className='productscreen-left'>
                <div className='left-image'>
                    <img
                    src={imgUrl}
                    alt={name}
                    />
                </div>
                <div className='left-info'>
                    <p className='left-name'>{name}</p>
                    <p>Price: ${price}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
            <div className='productscreen-right'>
                <div className='right-info'>
                    <p>
                        Price: <span>${cartPrice}</span>
                    </p>
                    <p>
                        Status: <span>
                        {countInStock > 0 ? "In stock" : "Out of stock"}
                        </span>
                    </p>
                    <p>
                        Quantity:
                        <select value={qty} onChange={(e) =>
                        {
                            setQty(e.target.value)
                            setCartPrice(e.target.value * price)
                        }}>
                        {[...Array(countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                        </select>
                    </p>
                    <p>
                        <button type="button" onClick={() => {addToCart(shudbeitem)}}>Add To Cart</button>
                    </p>
                </div>
            </div>
		</div>
        : 
		<div className="productscreen">
		<div className='productscreen-left'>
                <div className='left-image'>
                    <img
                    src={imgUrl}
                    alt={name}
                    />
                </div>
                <div className='left-info'>
                    <p className='left-name'>{name}</p>
                    <p>Price: ${price}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
            <div className='productscreen-right'>
                <div className='right-info'>
                    <p>
                        Price: <span>${cartPrice}</span>
                    </p>
                    <p>
                        Status: <span>
                        {countInStock > 0 ? "In stock" : "Out of stock"}
                        </span>
                    </p>
                    <p>
                        Quantity:
                        <select disabled value={qty} onChange={(e) =>
                        {
                            setQty(e.target.value)
                            setCartPrice(e.target.value * price)
                        }}>
                        {[...Array(countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                        </select>
                    </p>
                    <p>
                        <button type="button" onClick={addToCart} disabled>Add To Cart</button>
                    </p>
                </div>
            </div>
		</div>
	)
}

export default ProductScreen;