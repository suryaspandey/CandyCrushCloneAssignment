// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./gameCounter";

export const store = configureStore({
  reducer: {
    game: counterSlice, // Associating the 'game' slice with the counterSlice reducer,
  },
});
