import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";

import { logOut } from "../reducers/loginReducer";

const Menubar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
  };

  const extraPadding = {
    padding: 5,
  };

  return (
    <div style={style}>
      <Link to="/" style={extraPadding}>
        Blogs
      </Link>
      <Link to="/users" style={extraPadding}>
        Users
      </Link>
      {user && (
        <>
          <span style={extraPadding}>{user.name} logged in</span>
          <button onClick={handleLogOut}>logout</button>
        </>
      )}
    </div>
  );
};

export default Menubar;
