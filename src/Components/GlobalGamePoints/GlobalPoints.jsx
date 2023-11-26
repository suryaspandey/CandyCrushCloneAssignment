import React from "react";

const GlobalPoints = ({ gamePlayed, gameLost, gameWon }) => {
  return (
    <>
      <h1>Games gamePlayed: {gamePlayed}</h1>
      <h1>Games Won: {gameWon}</h1>
      <h1>Games Lost: {gameLost}</h1>
    </>
  );
};

export default GlobalPoints;
