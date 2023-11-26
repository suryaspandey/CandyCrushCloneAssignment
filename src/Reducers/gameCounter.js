import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
};

export const counterSlice = createSlice({
  initialState: initialState,
  name: "game",
  reducers: {
    gamePlayed: (state) => {
      console.log("Action: gamePlayed");
      state.gamesPlayed += 1;
    },
    gameWon: (state) => {
      console.log("Action: gameWon");
      state.gamesWon += 1;
    },
    gameLost: (state) => {
      console.log("Action: gameLost");
      state.gamesLost += 1;
    },
  },
});

export const { gamePlayed, gameLost, gameWon } = counterSlice.actions;
export default counterSlice.reducer;
