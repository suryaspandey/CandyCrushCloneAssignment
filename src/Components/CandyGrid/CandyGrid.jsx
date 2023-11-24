import React from "react";
import Candy from "../Candy/Candy";
import "./candyGrid.css";

const CandyGrid = ({ grid, onCandyClick }) => {
  return (
    <div className="candy-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="candy-row">
          {row.map((color, colIndex) => (
            <Candy
              key={colIndex}
              color={color}
              onClick={() => onCandyClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CandyGrid;
