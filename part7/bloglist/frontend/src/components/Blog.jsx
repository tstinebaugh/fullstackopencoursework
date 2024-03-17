import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { errorNotification } from "../reducers/notifyReducer";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

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
    } catch (exception) {
      dispatch(errorNotification("error deleting blog", 5));
    }
  };

  const hideWhenExpanded = { display: expanded ? "none" : "" };
  const showWhenExpanded = { display: expanded ? "" : "none" };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}> view </button>
      </div>
      <div style={showWhenExpanded} className="togglableContent">
        <div>
          Title: {blog.title}
          <button onClick={toggleExpanded}> hide </button>
        </div>
        <div>Author: {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}> like </button>
        </div>
        <div>User: {blog.user?.username}</div>
        <div>
          {" "}
          <button onClick={() => handleDelete(blog)}> Delete </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
