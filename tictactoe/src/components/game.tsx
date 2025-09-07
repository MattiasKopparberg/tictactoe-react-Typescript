import { useState } from "react";
import Board from "../components/board";

type Player = "X" | "O" | null;

export default function Game() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(newBoard: Player[]) {
    for (const [a, b, c] of lines) {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handleSquareClick(index: number) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  }

  return (
    <div className="bg-slate-700 shadow-xl rounded-2xl p-6 flex flex-col items-center gap-6 w-full max-w-md">
      <h1 className="text-3xl font-bold tracking-wide text-white">
        Tic Tac Toe
      </h1>

      <Board squares={board} onSquareClick={handleSquareClick} />

      <div className="h-6">
        {winner && (
          <p className="text-lg font-semibold text-green-400">
            Winner: {winner}
          </p>
        )}
        {!winner && board.every((s) => s) && (
          <p className="text-lg font-semibold text-yellow-400">Draw!</p>
        )}
        {!winner && board.some((s) => !s) && (
          <p className="text-lg font-medium text-blue-300">
            Turn: {currentPlayer}
          </p>
        )}
      </div>

      <button
        className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors shadow-md text-white"
        onClick={resetGame}>
        {winner || board.some((s) => s) ? "Reset Game" : "Start Game"}
      </button>
    </div>
  );
}
