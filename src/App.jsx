import { useEffect, useState } from "react";
import CandyGrid from "./Components/CandyGrid/CandyGrid";

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [targetScore, setTargetScore] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  // Add a state for the time limit
  const [timeLimit, setTimeLimit] = useState(20); // Set your desired time limit in seconds

  // Add a state for the timer
  const [timer, setTimer] = useState(timeLimit);

  // const red = "./red_jelly.png";
  // const blue = "./blue_jelly.png";
  // const yellow = "./yellow_jelly.webp";

  // const colors = ["/red_jelly.png", "/blue_jelly.png", "/yellow_jelly.webp"];

  useEffect(() => {
    if (!gameOver && totalScore < targetScore) {
      const intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);

        if (timer === 0) {
          setGameOver(true);
          console.log("Game over! Time's up!");
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, gameOver]);

  const generateRandomColors = () => {
    const colors = ["red", "blue", "yellow", "green"];
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

  const findConnectedCandies = (row, col, color, visited) => {
    if (
      row < 0 ||
      row >= gridSize ||
      col < 0 ||
      col >= gridSize ||
      visited[row][col] ||
      candyGrid[row][col] !== color
    ) {
      return [];
    }

    // visited[row * gridSize + col] = true;
    visited[row][col] = true;
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
    if (!gameOver) {
      // Logic to handle candy click (burst connected candies, update grid, etc.)
      console.log("candy block clicked");
      const clickedColor = candyGrid[row][col];
      // const visitedMatrix = findConnectedCandies(row, col, clickedColor);
      const visitedMatrix = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill(false)
      );

      // console.log(visitedMatrix);

      const findConsecutiveInRow = (row, col, color) => {
        const consecutiveCells = [];
        for (let j = col - 1; j >= 0 && candyGrid[row][j] === color; j--) {
          consecutiveCells.unshift({ row, col: j });
        }
        consecutiveCells.push({ row, col });
        for (
          let j = col + 1;
          j < gridSize && candyGrid[row][j] === color;
          j++
        ) {
          consecutiveCells.push({ row, col: j });
        }
        return consecutiveCells;
      };

      const findConsecutiveInColumn = (row, col, color) => {
        const consecutiveCells = [];
        for (let i = row - 1; i >= 0 && candyGrid[i][col] === color; i--) {
          consecutiveCells.unshift({ row: i, col });
        }
        consecutiveCells.push({ row, col });
        for (
          let i = row + 1;
          i < gridSize && candyGrid[i][col] === color;
          i++
        ) {
          consecutiveCells.push({ row: i, col });
        }
        return consecutiveCells;
      };

      const consecutiveInRow = findConsecutiveInRow(row, col, clickedColor);
      const consecutiveInCol = findConsecutiveInColumn(row, col, clickedColor);

      if (consecutiveInRow.length >= 3 || consecutiveInCol.length >= 3) {
        const connectedCandies = findConnectedCandies(
          row,
          col,
          clickedColor,
          visitedMatrix
        );

        // Mark the connected cells as true
        connectedCandies.forEach(({ row, col }) => {
          visitedMatrix[row][col] = true;
        });
        // Recursively mark additional connected cells as true

        let updated = true;
        while (updated) {
          updated = false;
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              if (visitedMatrix[i][j]) {
                // Check horizontally (left and right)
                if (
                  j > 0 &&
                  !visitedMatrix[i][j - 1] &&
                  candyGrid[i][j - 1] === clickedColor
                ) {
                  visitedMatrix[i][j - 1] = true;
                  updated = true;
                }
                if (
                  j < gridSize - 1 &&
                  !visitedMatrix[i][j + 1] &&
                  candyGrid[i][j + 1] === clickedColor
                ) {
                  visitedMatrix[i][j + 1] = true;
                  updated = true;
                }

                // Check vertically (Up and Down)
                if (
                  i > 0 &&
                  !visitedMatrix[i - 1][j] &&
                  candyGrid[i - 1][j] === clickedColor
                ) {
                  visitedMatrix[i - 1][j] = true;
                  updated = true;
                }
                if (
                  i < gridSize - 1 &&
                  !visitedMatrix[i + 1][j] &&
                  candyGrid[i + 1][j] === clickedColor
                ) {
                  visitedMatrix[i + 1][j] = true;
                  updated = true;
                }
              }
            }
          }
        }
        const totalTrueCells = connectedCandies.length;

        // const score = connectedCandies.length;
        setTotalScore((prevScore) => prevScore + totalTrueCells);
        console.log("Score:", totalTrueCells);

        if (totalScore >= targetScore) {
          // Implement win condition
          setGameOver(true);
          console.log("You won!");
          // Display win screen or proceed to the next level
        }

        // Update the grid with new colors and reset the game
        const newCandyGrid = candyGrid.map((row, rowIndex) =>
          row.map((col, colIndex) =>
            visitedMatrix[rowIndex][colIndex] ? generateRandomColors() : col
          )
        );

        setCandyGrid(newCandyGrid);

        console.log(visitedMatrix);
      }
    }
  };

  const [candyGrid, setCandyGrid] = useState(generateInitialGrid());

  return (
    <div className="App">
      <div className="score-box">Your Score: {totalScore}</div>
      <div>Target Score: {targetScore}</div>
      <div>Time Remaining: {timer} seconds</div>
      <CandyGrid grid={candyGrid} onCandyClick={handleCandyClick} />
    </div>
  );
}

export default App;
