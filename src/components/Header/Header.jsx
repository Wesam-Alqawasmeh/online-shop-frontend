import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import AddModal from "../Modal/AddModal";

function Header() {
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user);
  const authenticated = user.status === "auth";
  const logOutHandler = () => {
    dispatcher(logOut());
  };

  const handleShowModal = () => {
    setShowAddModal((prevState) => !prevState);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Online Shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {authenticated && (
            <>
              <Nav.Link onClick={logOutHandler}>Log Out</Nav.Link>
              <Nav.Link onClick={handleShowModal}>Add new Product</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
      <AddModal show={showAddModal} handleClose={handleShowModal} />
    </Navbar>
  );
}

export default Header;
