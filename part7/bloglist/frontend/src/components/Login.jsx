import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };

  return (
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
};

export default Login;
