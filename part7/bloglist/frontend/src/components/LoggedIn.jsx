import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import UserList from "./UserList";
import Blogs from "./Blogs";
import User from "./User";
import ExpandedBlog from "./ExpandedBlog";
import Menubar from "./Menubar";

const Loggedin = () => {
  const users = useSelector((state) => state.users);

  const blogs = useSelector((state) => state.blogs);

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
      <Menubar />
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
