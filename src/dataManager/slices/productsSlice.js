import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
    filteredProducts: {},
    isLoading: true,
  },
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    storeFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { storeProducts, toggleLoading, storeFilteredProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
