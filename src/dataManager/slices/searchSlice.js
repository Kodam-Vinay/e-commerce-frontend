import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    category: "all",
  },
  reducers: {
    storeSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },

    storeCategoryType: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { storeSearchInput, storeCategoryType } = searchSlice.actions;
export default searchSlice.reducer;
