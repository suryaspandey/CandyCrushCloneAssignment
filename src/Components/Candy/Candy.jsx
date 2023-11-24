import React from "react";
import "./candy.css";
const Candy = ({ color, onClick }) => {
  return (
    <div
      className="candy-block"
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></div>
  );
};

export default Candy;
