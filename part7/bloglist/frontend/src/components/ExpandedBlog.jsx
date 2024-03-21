import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog)}> like </button>
      </div>
      <div>Added by {blog.author}</div>
      <button
        onClick={() => {
          handleDelete(blog);
        }}
      >
        Delete
      </button>
      <h3>Comments:</h3>
      <form onSubmit={handleComment}>
        <span>
          <input
            id="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </span>
        <button type="submit" id="add-comment">
          Add Comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={(Math.random() + 1).toString(36).substring(7)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

ExpandedBlog.propTypes = {
  blog: PropTypes.object,
};

export default ExpandedBlog;
