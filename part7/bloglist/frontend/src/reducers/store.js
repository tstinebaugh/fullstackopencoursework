import { configureStore } from "@reduxjs/toolkit";

import NotifyReducer from "./notifyReducer";
import BlogReducer from "./blogReducer";
import LoginReducer from "./loginReducer";
import UserReducer from "./userReducer";

const Store = configureStore({
  reducer: {
    notify: NotifyReducer,
    blogs: BlogReducer,
    login: LoginReducer,
    users: UserReducer,
  },
});

export default Store;
