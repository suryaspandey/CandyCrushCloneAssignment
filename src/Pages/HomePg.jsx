import React from "react";
import "./homePg.css";

const HomePg = ({ gamesPlayed, gamesWon, gamesLost, onStart }) => {
  return (
    <>
      <div className="candyCrush-logo-container">
        <img src="/candyCrushLogo.png" alt="Candy crush Logo" />
      </div>
      <div className="global-scores">
        <h1 className="global-pts-h1">Games Played: {gamesPlayed}</h1>
        <h1 className="global-pts-h1">Games Won: {gamesWon}</h1>
        <h1 className="global-pts-h1">Games Lost: {gamesLost}</h1>
      </div>
      <div className="game-rules-txt">
        <h2>
          Start a burst bonanza journey by clicking on candies that match!
        </h2>
      </div>
      <button className="start-btn" onClick={onStart}>
        Start
      </button>
    </>
  );
};

export default HomePg;
