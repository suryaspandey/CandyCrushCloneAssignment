import { useState } from "react";
import CandyGrid from "./Components/CandyGrid/CandyGrid";

function App() {
  // const red = "./red_jelly.png";
  // const blue = "./blue_jelly.png";
  // const yellow = "./yellow_jelly.webp";

  // const colors = ["/red_jelly.png", "/blue_jelly.png", "/yellow_jelly.webp"];

  const generateRandomColors = () => {
    const colors = ["red", "blue", "yellow"];
    // const colors = ["red_jelly.png", "blue_jelly.png", "yellow_jelly.webp"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const generateInitialGrid = () => {
    const rows = 10;
    const cols = 10;

    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(generateRandomColors());
      }
      grid.push(row);
    }
    return grid;
  };

  const gridSize = 10;
  const findConnectedCandies = (row, col, color, visited = []) => {
    if (
      row < 0 ||
      row >= gridSize ||
      col < 0 ||
      col >= gridSize ||
      visited[row * gridSize + col] ||
      candyGrid[row][col] != color
    ) {
      return [];
    }

    visited[row * gridSize + col] = true;
    const connectedCandies = [{ row, col }];

    // Check horizontally (left and right)
    connectedCandies.push(
      ...findConnectedCandies(row, col - 1, color, visited), // Left
      ...findConnectedCandies(row, col + 1, color, visited) // Right
    );

    // Check vertically (Up and Down)
    connectedCandies.push(
      ...findConnectedCandies(row + 1, col, color, visited), // Down
      ...findConnectedCandies(row - 1, col, color, visited) // UP
    );

    return connectedCandies;
  };
  const handleCandyClick = (row, col) => {
    // Logic to handle candy click (burst connected candies, update grid, etc.)
    console.log("candy block clicked");
    const clickedColor = candyGrid[row][col];
    const visitedMatrix = findConnectedCandies(row, col, clickedColor);
    console.log(visitedMatrix);
  };

  const [candyGrid, setCandyGrid] = useState(generateInitialGrid());

  return (
    <div className="App">
      <CandyGrid grid={candyGrid} onCandyClick={handleCandyClick} />
    </div>
  );
}

export default App;
