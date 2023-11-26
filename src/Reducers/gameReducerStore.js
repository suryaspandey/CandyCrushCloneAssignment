// gameReducerStore.js
// Create a Redux store with a reducer that handles the game state.
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
};

// const gameReducerStore = (state = initialState, action) => {
//   switch (action.type) {
//     case "GAME_PLAYED": {
//       return { ...state, gamesPlayed: state.gamesPlayed + 1 };
//     }
//     case "GAME_WON":
//       return { ...state, gamesWon: state.gamesWon + 1 };
//     case "GAME_LOST":
//       return { ...state, gamesLost: state.gamesLost + 1 };
//     default:
//       return state;
//   }
// };

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gamePlayed: (state) => {
      console.log("Action: gamePlayed");
      state.gamesPlayed += 1;
    },
    gameWon: (state) => {
      console.log("Action: gameWOn");
      state.gamesWon += 1;
    },
    gameLost: (state) => {
      console.log("Action: gameLost");
      state.gamesLost += 1;
    },
  },
});

export const { gamePlayed, gameWon, gameLost } = gameSlice.actions;

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});
// console.log("Initial Store State:", store.getState());

export default store;
// export default gameSlice.reducer;
