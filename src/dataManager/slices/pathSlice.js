import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "path",
  initialState: {
    currentPath: "/",
    previousPath: "/",
  },
  reducers: {
    storeCurrentPath: (state, action) => {
      const currPath = state.currentPath;
      const newPath = action.payload;
      if (currPath !== newPath) {
        state.previousPath = currPath;
        state.currentPath = action.payload;
      }
    },
  },
});

export const { storeCurrentPath } = pathSlice.actions;
export default pathSlice.reducer;
