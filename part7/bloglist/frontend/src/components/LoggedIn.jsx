import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";

import UserList from "./UserList";
import Blogs from "./Blogs";
import { logOut } from "../reducers/loginReducer";
import User from "./User";
import ExpandedBlog from "./ExpandedBlog";

const Loggedin = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  const blogs = useSelector((state) => state.blogs);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const userMatch = useMatch("/users/:id");
  const selectedUser = userMatch
    ? users.find((u) => u.id == userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const selectedBlog = blogMatch
    ? blogs.find((b) => b.id == blogMatch.params.id)
    : null;

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>logout</button>
      <Routes>
        <Route
          path="blogs/:id"
          element={<ExpandedBlog blog={selectedBlog} />}
        />
        <Route path="users/:id" element={<User user={selectedUser} />} />
        <Route path="users" element={<UserList />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default Loggedin;
