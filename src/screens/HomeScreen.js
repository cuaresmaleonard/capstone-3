import { useEffect, useState, useContext } from 'react';
import './HomeScreen.css';
// import ProductScreen from './ProductScreen';
import UserContext from '../UserContext'
import Product from '../components/Product';
// import AdminDashboard from './AdminDashboard';



const HomeScreen = () => {
	const { user } = useContext(UserContext);
	console.log(user)
	const [products, setProducts] = useState([])
	// const [adminItems, setAdminItems] = useState()

	useEffect(()=> {
		fetch('https://evening-forest-87496.herokuapp.com/products')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setProducts(data.map(product => {
				return (
					<Product
					key={product._id}
					productProp={product}
					productId={product._id}
					/>					
					
				)
			}))
		})
	},[])

		console.log(products)
	return (
		<div className="homescreen">
		    <h2 className="homescreen-title">Latest Products</h2>
          <div className="homescreen-products">
			{products}
          </div>
		</div>
	)
}

export default HomeScreen;