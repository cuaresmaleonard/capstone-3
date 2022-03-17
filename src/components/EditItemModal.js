import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UserContext from "../UserContext";

const EditItemModal = (props) => {
  const { user, setUser } = useContext(UserContext);
  // const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  let token = localStorage.getItem("token");

  const editProduct = (e, productId) => {
    console.log(productId);
    console.log(name, description, price, countInStock);
    e.preventDefault();

    fetch(`http://localhost:5000/products/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        countInStock: countInStock,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName("");
          setDescription("");
          setPrice(0);
          setCountInStock(0);
          console.log(data);
          alert("Product updated");
        } else {
          setName("");
          setDescription("");
          setPrice(0);
          setCountInStock(0);
          alert("Error occured");
        }
      });
  };


  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Product details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => editProduct(e, props.productId)}>
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
};

export default EditItemModal;
