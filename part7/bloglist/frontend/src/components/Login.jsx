import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <Row>
      <Col xs="auto">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </Form.Group>
          <Button type="submit" id="login-button">
            login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
