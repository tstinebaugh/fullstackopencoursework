import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { errorNotification } from "../reducers/notifyReducer";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const ExpandedBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        {" "}
        Delete{" "}
      </button>
    </div>
  );
};

ExpandedBlog.propTypes = {
  blog: PropTypes.object,
};

export default ExpandedBlog;
