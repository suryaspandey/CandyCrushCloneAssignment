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
import HomePg from "./Pages/HomePg";

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [targetScore, setTargetScore] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const [timeLimit, setTimeLimit] = useState(20); //  desired time limit

  const [timer, setTimer] = useState(timeLimit); // timer state

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");

  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);
  const scoreUpdateAudio = new Audio(scoreUpdateSound);

  const dispatch = useAppDispatch();

  const { gamesPlayed, gamesWon, gamesLost } = useAppSelector(
    (state) => state.game
  );

  const handleGamePlayed = () => {
    dispatch(gamePlayed());
  };

  const handleGameWon = () => {
    dispatch(gameWon());
  };

  const handleGameLost = () => {
    dispatch(gameLost());
  };

  const candyImgs = ["/red_jelly.png", "/blue_jelly.png", "/green_jelly.png"];

  useEffect(() => {
    if (totalScore > 0) {
      scoreUpdateAudio.play();
    }
  }, [totalScore]);

  useEffect(() => {
    if (!gameOver && totalScore < targetScore) {
      const intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);

        if (timer === 1) {
          setGameOver(true);
          setModalMessage("You Lost! Try Again!");
          setShowModal(true);
          handleGameLost();
          loseAudio.play();
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, gameOver]);

  const generateRandomColors = () => {
    const randomIndex = Math.floor(Math.random() * candyImgs.length);
    return candyImgs[randomIndex];
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
      // Logic to handle candy click
      const clickedColor = candyGrid[row][col];
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

        setTotalScore((prevScore) => {
          const newScore = prevScore + totalTrueCells;

          if (newScore >= targetScore) {
            // Implement win condition
            setGameOver(true);
            setModalMessage("You won!");
            setShowModal(true);
            handleGameWon();
            winAudio.play();
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
      }
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
    setCurrentScreen("game");
  };

  const handleExit = () => {
    // Handle exit logic if needed
    setTotalScore(0);
    setTimer(timeLimit);

    setShowModal(false);
    setIsGameStarted(false);
    setCurrentScreen("home");
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  useEffect(() => {
    if (isGameStarted) {
      setTimer(timeLimit);
    }
  }, [isGameStarted]);

  return (
    <div className="game-container">
      {currentScreen === "game" && (
        <>
          <div className="game-data">
            <div className="score-box">Your Score: {totalScore}</div>
            <div className="score-box">Target Score: {targetScore}</div>
          </div>
          <div className="score-box timer-box">
            Time Remaining: {timer} seconds
          </div>
          <div className="game-grid-container">
            <CandyGrid grid={candyGrid} onCandyClick={handleCandyClick} />
          </div>

          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        </>
      )}
      {currentScreen === "home" && (
        <HomePg
          onExit={handleExit}
          onStart={handleRestart}
          gamesPlayed={gamesPlayed}
          gamesWon={gamesWon}
          gamesLost={gamesLost}
        />
      )}

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
