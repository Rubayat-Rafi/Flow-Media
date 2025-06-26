// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import Slice from "./slices/slice";

const store = configureStore({
  reducer: {
    Slice: Slice,
  },
});

export default store;
