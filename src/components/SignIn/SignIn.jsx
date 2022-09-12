import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { signIn } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function SignIn() {
  const dispatcher = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    dispatcher(signIn({ username, password }));
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <Form onSubmit={submitHandler}>
        <Form.Label>
          <h1>Sign In</h1>
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter your name"
            id="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/sign-up">Not registered?</Link>
      </Form>
    </Container>
  );
}

export default SignIn;
