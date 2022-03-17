import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditItemModal from "./EditItemModal";
import Swal from "sweetalert2";

const Items = ({ props, productId, fetchData, testFunction }) => {
  // console.log(props);
  // console.log(fetchData);
  // const productId = props._id

  useEffect(() => {}, []);

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);

  // const [imgUrl, setImgUrl] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [countInStock, setCountInStock] = useState(0);
  // const [productId, setProductId] = useState("");
  // const [products, setProducts] = useState([]);
  // const [items, setItems] = useState([])

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // console.log(productId);
  let token = localStorage.getItem("token");

  

  const handleClose = () => setShowEdit(false);

  const archiveProduct = (e, productId) => {
    fetch(`https://damp-brushlands-99424.herokuapp.com/products/${productId}/archive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // console.log(data);
          fetchData();
          Swal.fire({
            title: 'Archive successful',
            icon: 'success',
            text: 'Product now set to inactive'
          })

        } else {
          Swal.fire({
            title: 'Error occurred',
            icon: 'error',
            text: 'Please try again later'
          })

        }
      });
  };

  const activateProduct = (e, productId) => {
    fetch(`https://damp-brushlands-99424.herokuapp.com/products/${productId}/setActive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetchData();
          Swal.fire({
            title: 'Set Active successful',
            icon: 'success',
            text: 'Product now set to active'
          })
        } else {
          Swal.fire({
            title: 'Error Occurred',
            icon: 'error',
            text: 'Please try again later'
          })
        }
      });
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stocks</th>
            <th>isActive</th>
          </thead>
          <tbody>
            <tr key={productId}>
              <td>{props.name}</td>
              <td>{props.description}</td>
              <td>{props.price}</td>
              <td>{props.countInStock}</td>
              <td>{String(props.isActive)}</td>
              <td>
                <Button
                  className="btn mr-3 mb-2"
                  variant="outline-dark"
                  onClick={() => setShowEdit(true)}
                >
                  Edit
                </Button>
              </td>
              {props.isActive ? (
                <td>
                  <Button onClick={(e) => archiveProduct(e, productId)}>
                    Remove
                  </Button>
                </td>
              ) : (
                <td>
                  <Button onClick={(e) => activateProduct(e, productId)}>
                    Set Active
                  </Button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <EditItemModal
        show={showEdit}
        onHide={handleClose}
        productId={productId}
      />
    </>
  );
};

export default Items;
