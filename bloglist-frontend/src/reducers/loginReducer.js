import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const handleLogin = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLogin(user));
    } catch (exception) {
      dispatch(
        showNotification(
          { message: `wrong credentials`, success: false },
          3000,
        ),
      );
      console.log(exception);
    }
  };
};

export const verifyLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setLogin(user));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setLogin(null));
  };
};

export default loginSlice.reducer;
