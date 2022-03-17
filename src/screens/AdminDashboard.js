import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Items from "../components/Items";
import MyVerticallyCenteredModal from '../components/MyVerticallyCenteredModal'


const AdminDashboard = () => {

  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([])
 
	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
  const [productCtr, setProductCtr] = useState(0);
  
  // console.log(products)
  let token = localStorage.getItem("token");

  const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);



    const closeEdit = () => {
      setShowEdit(false)
      setName('')
      setDescription('')
      setPrice(0)
      setImgUrl('')
      setCountInStock(0)
    }


  useEffect(()=> {
		fetch('https://evening-forest-87496.herokuapp.com/products')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setProducts(data.map(product => {
				return (
					<Items
					key={product._id}
					props={product}
					productId={product._id}
          fetchData={fetchData}
					/>					
				)
			}))
		})

	},[productCtr])

  const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://evening-forest-87496.herokuapp.com/products',{
			method: "GET"
		})
		.then(result => result.json())
		.then(result => {
			
			let ctr = productCtr + 1;
      setProductCtr(ctr);
			setItems(result);

		})
	}

  useEffect(() => {
    fetchData();
  },[])


  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="items">
      <h2>Admin Dashboard</h2>
      <div>
        <button variant="primary" onClick={() => setModalShow(true)}>Add product</button>
        
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      </div>
      <div>
          {products}    
      </div>
    </div>
  );
};

export default AdminDashboard;
