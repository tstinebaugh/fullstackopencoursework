import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../reducers/loginReducer";

import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import UserList from "./UserList";
import Blogs from "./Blogs";

const Loggedin = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>logout</button>
      <Routes>
        <Route path="users" element={<UserList />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default Loggedin;
