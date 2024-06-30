import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "successError",
  initialState: {
    errorMessage: "",
    isError: false,
    successMessage: "",
    isSuccess: false,
  },
  reducers: {
    toggleError: (state, action) => {
      state.isError = action.payload;
    },
    storeErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    toggleSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    storeSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

export const {
  toggleError,
  storeErrorMessage,
  toggleSuccess,
  storeSuccessMessage,
} = popupSlice.actions;
export default popupSlice.reducer;
