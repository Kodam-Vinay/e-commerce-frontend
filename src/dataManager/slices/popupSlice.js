import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    showPopup: false,
    popupData: {
      text: "",
      type: "",
    },
  },
  reducers: {
    togglePopup: (state, action) => {
      state.showPopup = action.payload;
    },
    storePopupData: (state, action) => {
      state.popupData = action.payload;
    },
  },
});

export const { togglePopup, storePopupData } = popupSlice.actions;
export default popupSlice.reducer;
