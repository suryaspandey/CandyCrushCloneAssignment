// Example component

import React from "react";
import { useSelector } from "react-redux";

const GameStats = () => {
  console.log("Rendering GameStats component");
  const gameState = useSelector((state) => state.game);
  console.log("Redux State:", gameState);

  const { gamesPlayed, gamesWon, gamesLost } = useSelector(
    (state) => state.game
  );

  //   const gamesPlayed = useSelector((state) => state.game.gamesPlayed);
  //   const gamesWon = useSelector((state) => state.game.gamesWon);
  //     const gamesLost = useSelector((state) => state.game.gamesLost);

  //   const gamesPlayed = gameState.gamesPlayed;
  //   const gamesWon = gameState.gamesWon;
  //   const gamesLost = gameState.gamesLost;

  return (
    <div>
      <p>Total Games Played: {gamesPlayed}</p>
      <p>Games Won: {gamesWon}</p>
      <p>Games Lost: {gamesLost}</p>
    </div>
  );
};

export default GameStats;
