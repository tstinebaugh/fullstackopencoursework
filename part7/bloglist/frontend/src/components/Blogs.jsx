import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import { initializeBlogs } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  const createNewBlog = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      {<BlogForm refs={blogFormRef} />}
    </Togglable>
  );

  return (
    <span>
      <h2>Blog App</h2>
      {createNewBlog()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </span>
  );
};

export default Blogs;
