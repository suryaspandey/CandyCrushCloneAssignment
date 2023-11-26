// gameStore.js

import { configureStore } from "@reduxjs/toolkit";
import gameReducerStore from "./reducers/gameReducerStore";

const store = configureStore({
  reducer: {
    game: gameReducerStore, // Assuming "game" as the slice name for the game reducer
  },
});

export default store;
