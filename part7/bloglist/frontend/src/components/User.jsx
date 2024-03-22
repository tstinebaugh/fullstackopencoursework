import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <span>
      <h2>{user.name}</h2>
      <h3>Added Blogs:</h3>
      <ListGroup as="ul" className="d-inline-block">
        {user.blogs.map((blog) => (
          <LinkContainer to={`/blogs/${blog.id}`} key={user.name + blog.id}>
            <ListGroup.Item action to={`/blogs/${blog.id}`}>
              {blog.title}
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </ListGroup>
    </span>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default User;
