import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Login";
import Loggedin from "./components/LoggedIn";
import Notification from "./components/Notification";

import { checkCachedToken } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCachedToken());
  }, [dispatch]);

  const user = useSelector((state) => state.login);

  return (
    <div>
      <Notification />
      {user ? <Loggedin /> : <Login />}
    </div>
  );
};

export default App;
