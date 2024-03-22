import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { logOut } from "../reducers/loginReducer";

const Menubar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {user && (
            <>
              <Navbar.Text className="me-3">
                Signed in as: {user.name}
              </Navbar.Text>
              <Button variant="secondary" onClick={handleLogOut}>
                logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menubar;
