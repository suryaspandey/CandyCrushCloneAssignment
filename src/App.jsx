import { useEffect, useState } from "react";
import CandyGrid from "./Components/CandyGrid/CandyGrid";
import "./App.css";
import GameModal from "./Components/GameModal/GameModal";
import winSound from "/win.mp3";
import loseSound from "/lost.mp3";
import scoreUpdateSound from "/score.mp3";
import React from "react";
import { gameLost, gamePlayed, gameWon } from "./Reducers/gameCounter";
import { useAppSelector, useAppDispatch } from "./Reducers/hooks";

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [targetScore, setTargetScore] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  // Add a state for the time limit
  const [timeLimit, setTimeLimit] = useState(20); // Set your desired time limit in seconds

  // Add a state for the timer
  const [timer, setTimer] = useState(timeLimit);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);
  const scoreUpdateAudio = new Audio(scoreUpdateSound);

  const dispatch = useAppDispatch();

  const { gamesPlayed, gamesWon, gamesLost } = useAppSelector(
    (state) => state.game
  );

  const handleGamePlayed = () => {
    console.log("Dispatching gamePlayed action");
    dispatch(gamePlayed());
  };

  const handleGameWon = () => {
    console.log("Dispatching gameWon action");
    dispatch(gameWon());
  };

  const handleGameLost = () => {
    console.log("Dispatching gameLost action");
    dispatch(gameLost());
  };

  // const red = "./red_jelly.png";
  // const blue = "./blue_jelly.png";
  // const yellow = "./yellow_jelly.webp";

  // const colors = ["/red_jelly.png", "/blue_jelly.png", "/yellow_jelly.webp"];

  useEffect(() => {
    console.log("Component rendered with showModal:", showModal);
  }, [showModal]);

  useEffect(() => {
    if (totalScore > 0) {
      scoreUpdateAudio.play();
    }
  }, [totalScore]);

  useEffect(() => {
    if (!gameOver && totalScore >= targetScore) {
      // Implement win condition
      winAudio.play();
      setGameOver(true);
      setModalMessage("You won!");
      setShowModal(true);
      console.log("You won!");
    } else if (gameOver) {
      loseAudio.play();
      setModalMessage("You Lost! Try Again!");
      setShowModal(true);
      console.log("You lost!");
    }

    if (totalScore >= targetScore) {
      handleGameWon();
    } else if (gameOver) {
      handleGameLost();
    }
  }, [totalScore, targetScore, gameOver]);

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
    const colors = ["orange", "#29B6F6", "#9CCC65", "#E1BEE7"];
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
        // setTotalScore((prevScore) => prevScore + totalTrueCells);
        // console.log("Score:", totalTrueCells);

        // if (totalScore + totalTrueCells >= targetScore) {
        //   // Implement win condition
        //   setGameOver(true);
        //   setModalMessage("You won!");
        //   setShowModal(true);
        //   console.log("You won!");
        //   // Display win screen or proceed to the next level
        // }

        setTotalScore((prevScore) => {
          const newScore = prevScore + totalTrueCells;

          if (newScore >= targetScore) {
            // Implement win condition
            setGameOver(true);
            setModalMessage("You won!");
            setShowModal(true);
            console.log("You won!");
            // Display win screen or proceed to the next level
          }

          return newScore;
        });

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
    {
      console.log("gameOver?  ", gameOver);
    }
  };

  const [candyGrid, setCandyGrid] = useState(generateInitialGrid());

  const handleRestart = () => {
    // Reset game state
    setTotalScore(0);
    setTimer(timeLimit);
    setGameOver(false);
    setCandyGrid(generateInitialGrid());
    setShowModal(false);
    handleGamePlayed();
  };

  const handleExit = () => {
    // Handle exit logic if needed
    setShowModal(false);
  };

  return (
    <div className="game-container">
      <div className="game-data">
        <div className="score-box">Your Score: {totalScore}</div>
        <div className="score-box">Target Score: {targetScore}</div>
      </div>
      <div className="score-box" style={{ width: "225px" }}>
        Time Remaining: {timer} seconds
      </div>
      <div className="game-grid-container">
        <CandyGrid grid={candyGrid} onCandyClick={handleCandyClick} />
      </div>

      <h1>Games gamePlayed: {gamesPlayed}</h1>
      <h1>Games Won: {gamesWon}</h1>
      <h1>Games Lost: {gamesLost}</h1>

      {showModal && (
        <GameModal
          message={modalMessage}
          onRestart={handleRestart}
          onExit={handleExit}
          isVisible={showModal}
        />
      )}
    </div>
  );
}

export default App;
