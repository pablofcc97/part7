import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", success: true },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

//RETURN THE REDUCER ACTIONS IN THE SLICE
export const { setNotification } = notificationSlice.actions;

//RETURN A SINGLE ASYNC ACTION WITH REDUX THUNK
export const showNotification = (content, timeToShow = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(
      () => dispatch(setNotification({ message: "", success: true })),
      timeToShow,
    );
  };
};

export default notificationSlice.reducer;
