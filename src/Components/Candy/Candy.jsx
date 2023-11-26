import React from "react";
import "./candy.css";
const Candy = ({ color, onClick }) => {
  return (
    <div
      className="candy-block"
      // style={{ backgroundColor: color }}
      style={{
        backgroundImage: `url(${color})`,
        height: "40px",
        width: "40px",
        backgroundSize: "cover",
      }}
      onClick={onClick}
    ></div>
  );
};

export default Candy;
