import axios from "axios";
import React from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getProducts } from "../../features/products/productsSlice";
import cookie from "react-cookies";

function AddModal({ show, handleClose }) {
  const categories = useSelector((state) => state.products.categories);
  const user = useSelector((state) => state.user);
  const dispatcher = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const price = e.target.price.value;
    const category = e.target.title.value;
    const owner_id = user.user.id;

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          title,
          description,
          image,
          price,
          category,
          owner_id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );

      dispatcher(getProducts());
      handleClose();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "An error occurred!",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                id="title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a brief description"
                id="description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Image URL" id="image" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder={0} id="price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example" id="category">
                <option>Select category</option>
                {categories.map((item) => (
                  <option>{item}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
