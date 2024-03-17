import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { errorNotification, infoNotification } from "./notifyReducer";

const loginTokenName = "loggedBlogappUser";

const initialState = "";

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUserState(_state, action) {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    removeUserState(_s, _a) {
      blogService.setToken("");
      return "";
    },
  },
});

export const { addUserState, removeUserState } = loginSlice.actions;

export const checkCachedToken = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(loginTokenName);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(addUserState(user));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(loginTokenName, JSON.stringify(user));
      dispatch(addUserState(user));
    } catch (exception) {
      dispatch(errorNotification("failed to log in", 5));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(loginTokenName);
    dispatch(removeUserState());
  };
};

export default loginSlice.reducer;
