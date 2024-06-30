import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";
import cloudinarySlice from "./slices/cloudinarySlice";
import userSlice from "./slices/userSlice";
import loginSlice from "./slices/loginSlice";
import popupSlice from "./slices/popupSlice";
import pathSlice from "./slices/pathSlice";
import productsSlice from "./slices/productsSlice";
import searchSlice from "./slices/searchSlice";
import languageSlice from "./slices/languageSlice";
import successErrorSlice from "./slices/successErrorSlice";

const persistConfig = {
  key: "user",
  storage,
};

const reducers = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  cloudinary: cloudinarySlice,
  user: userSlice,
  path: pathSlice,
});
const persistSliceReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: {
    persistSliceReducer,
    login: loginSlice,
    popup: popupSlice,
    products: productsSlice,
    search: searchSlice,
    language: languageSlice,
    successError: successErrorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
persistStore(store);
export default store;
