import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./Slices/counter";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
