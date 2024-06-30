import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    activeLanguage: "en",
  },
  reducers: {
    toggleLanguage: (state, action) => {
      state.activeLanguage = action.payload;
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
