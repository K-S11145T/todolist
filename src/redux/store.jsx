import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk"; // Named import use karo

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Thunk middleware add karo
  devTools: process.env.NODE_ENV !== "production",
});

export default store;