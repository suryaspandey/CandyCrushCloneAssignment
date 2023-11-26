// gameAction.js
//Create action creators for updating the game state.

export const gamePlayed = () => ({
  type: "GAME_PLAYED",
});

export const gameWon = () => ({
  type: "GAME_WON",
});

export const gameLost = () => ({
  type: "GAME_LOST",
});
