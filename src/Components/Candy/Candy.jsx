import React from "react";
import "./candy.css";
const Candy = ({ candyImg, onClick }) => {
  return (
    <div
      className="candy-block"
      style={{
        backgroundImage: `url(${candyImg})`,

        backgroundSize: "cover",
      }}
      onClick={onClick}
    ></div>
  );
};

export default Candy;
