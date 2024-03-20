import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";

import UserList from "./UserList";
import Blogs from "./Blogs";
import { logOut } from "../reducers/loginReducer";
import User from "./User";

const Loggedin = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const match = useMatch("/users/:id");
  const selectedUser = match
    ? users.find((u) => u.id == match.params.id)
    : null;

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>logout</button>
      <Routes>
        <Route path="users/:id" element={<User user={selectedUser} />} />
        <Route path="users" element={<UserList />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default Loggedin;
