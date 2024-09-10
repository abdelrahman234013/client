import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.user = "";
    },
  },
});

export const { userLoggedOut, userLoggedIn } = authSlice.actions;

export default authSlice.reducer;
