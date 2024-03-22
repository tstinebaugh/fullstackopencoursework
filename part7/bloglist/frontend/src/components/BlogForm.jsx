import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { infoNotification } from "../reducers/notifyReducer";
import { createNew } from "../reducers/blogReducer";

const BlogForm = (refs) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const handleNewBlog = async (event) => {
    event.preventDefault();

    refs.refs.current.toggleVisibility();

    const blogObject = { title, author, url };
    dispatch(createNew(blogObject));
    dispatch(
      infoNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    );
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <Row>
      <Col xs="auto">
        <h2>Create New Blog</h2>
        <Form onSubmit={handleNewBlog}>
          <FloatingLabel className="mb-3" controlId="blog-title" label="Title">
            <Form.Control
              className="text-muted"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="blog-author"
            label="Author"
          >
            <Form.Control
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId="blog-url" label="URL">
            <Form.Control
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setURL(target.value)}
            />
          </FloatingLabel>
          <Button className="mb-3" type="submit">
            create
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default BlogForm;
