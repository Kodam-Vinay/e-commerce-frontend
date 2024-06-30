import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    activeAuth: "login",
    registerActiveAuth: "buyer",
  },
  reducers: {
    makeActiveAuth: (state, action) => {
      state.activeAuth = action.payload;
    },
    toggleRegisterActiveAuth: (state, action) => {
      state.registerActiveAuth = action.payload;
    },
  },
});

export const { toggleRegisterActiveAuth, makeActiveAuth } = authSlice.actions;
export default authSlice.reducer;
