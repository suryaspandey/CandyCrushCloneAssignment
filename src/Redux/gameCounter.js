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
      state.gamesPlayed += 1;
    },
    gameWon: (state) => {
      state.gamesWon += 1;
    },
    gameLost: (state) => {
      state.gamesLost += 1;
    },
  },
});

export const { gamePlayed, gameLost, gameWon } = counterSlice.actions;
export default counterSlice.reducer;
