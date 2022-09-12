import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/products/productsSlice";
import cookie from "react-cookies";
import axios from "axios";
import Swal from "sweetalert2";

function ItemCard({
  image,
  title,
  description,
  price,
  category,
  owner_id,
  id,
}) {
  const userID = useSelector((state) => state.user.user.id);
  const dispatcher = useDispatch();

  const deleteHandler = async () => {
    axios
      .delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        },
        {}
      )
      .then(() => {
        dispatcher(getProducts());
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        dispatcher(getProducts());
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br /> <br />
          <strong>Price</strong>: {price} USD <br />
          <strong>Category</strong>: {category}
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
        {userID === owner_id && (
          <Button
            variant="danger"
            onClick={deleteHandler}
            style={{ marginLeft: "20px" }}
          >
            delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
