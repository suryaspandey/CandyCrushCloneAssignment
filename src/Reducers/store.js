import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./gameCounter";

export const store = configureStore({
  reducer: {
    game: counterSlice, // game is the name in counterSlice
  },
});
