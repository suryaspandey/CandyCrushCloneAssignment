import React from "react";
import "./homePg.css";

const HomePg = ({ gamesPlayed, gamesWon, gamesLost, onStart }) => {
  return (
    <>
      <div className="global-scores">
        <h1 className="global-pts-h1">Games Played: {gamesPlayed}</h1>
        <h1 className="global-pts-h1">Games Won: {gamesWon}</h1>
        <h1 className="global-pts-h1">Games Lost: {gamesLost}</h1>
      </div>

      <button className="start-btn" onClick={onStart}>
        Start
      </button>
    </>
  );
};

export default HomePg;
