import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { errorNotification } from "../reducers/notifyReducer";
import { likeBlog, removeBlog, addComment } from "../reducers/blogReducer";

const ExpandedBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleLike = async (blogObject) => {
    dispatch(likeBlog(blogObject));
  };

  const handleDelete = async (blogObject) => {
    if (
      !confirm(
        `Are you sure you want to delete ${blogObject.title} by ${blogObject.author}?`
      )
    ) {
      return;
    }
    try {
      dispatch(removeBlog(blogObject.id));
      navigate("/");
    } catch (exception) {
      dispatch(errorNotification("error deleting blog", 5));
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    setComment("");
  };

  if (!blog) {
    return null;
  }

  return (
    <Row>
      <Col xs="auto">
        <h2 className="my-3">{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className="my-2">
          {blog.likes} likes{" "}
          <Button onClick={() => handleLike(blog)}> like </Button>
        </div>
        <div className="my-1">Added by {blog.author}</div>
        <Button
          className="my-1"
          onClick={() => {
            handleDelete(blog);
          }}
        >
          Delete
        </Button>

        <h3 className="my-1">Comments:</h3>
        <Form onSubmit={handleComment}>
          <FloatingLabel
            className="my-3 me-3 d-inline-block"
            label="Comment"
            xs="auto"
          >
            <Form.Control
              className="text-muted d-inline-block"
              id="comment"
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </FloatingLabel>
          <Button className="mb-3" type="submit" id="add-comment">
            Add Comment
          </Button>
        </Form>

        <ListGroup as="ul" className="d-inline-block">
          {blog.comments.map((comment) => (
            <ListGroup.Item key={(Math.random() + 1).toString(36).substring(7)}>
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

ExpandedBlog.propTypes = {
  blog: PropTypes.object,
};

export default ExpandedBlog;
