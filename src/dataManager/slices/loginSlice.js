import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoginClicked: false,
  },
  reducers: {
    toggleLoginRegister: (state, action) => {
      state.isLoginClicked = action.payload;
    },
  },
});

export const { toggleLoginRegister } = loginSlice.actions;
export default loginSlice.reducer;
