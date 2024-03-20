import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { initializeBlogs } from "./reducers/blogReducer";
import { checkCachedToken, login, logOut } from "./reducers/loginReducer";
import UserList from "./components/UserList";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(checkCachedToken());
  }, [dispatch]);

  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  const createNewBlog = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      {<BlogForm refs={blogFormRef} />}
    </Togglable>
  );

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const blogList = () => {
    return (
      <div>
        {createNewBlog()}
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const loggedIn = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>logout</button>
        <Routes>
          <Route path="users" element={<UserList />} />
          <Route path="/" element={blogList()} />
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && loginForm()}
      {user && loggedIn()}
    </div>
  );
};

export default App;
