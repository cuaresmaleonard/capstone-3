import { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import UserContext from "../UserContext";

function MyVerticallyCenteredModal(props) {
  const { user, setUser } = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
 

  

  let token = localStorage.getItem("token");




  function addProduct(e) {
    e.preventDefault();

    fetch("https://evening-forest-87496.herokuapp.com/products/create-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        imgUrl: imgUrl,
        name: name,
        description: description,
        price: price,
        countInStock: countInStock,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setImgUrl("");
          setName("");
          setDescription("");
          setPrice(0);
          setCountInStock(0);

          alert("Product added");
        } else {
          alert("Error occured");
        }
      });
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Product details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => addProduct(e)}>
          <div>
            <label>Image Url</label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="form-control"
              placeholder="Image Url"
              required
            />
          </div>
          <div>
          <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder="Place item description here"
              required
            />
          </div>
          <div>
          <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div>
          <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div>
          <label>Stocks</label>
            <input
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="form-control"
              placeholder="Stocks Left"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Send
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
