import { useState } from "react";
import Board from "../components/board";

type Player = "X" | "O" | null;

export default function Game() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  function checkWinner(newBoard: Player[]) {
    for (const [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
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
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl">Tic Tac Toe</h1>

      <Board squares={board} onSquareClick={handleSquareClick} />

      {winner && <p className="text-lg">Winner: {winner}</p>}
      {!winner && board.every((s) => s) && <p className="text-lg">Draw!</p>}

      <button className="px-4 py-2 border rounded" onClick={resetGame}>
        {winner || board.some((s) => s) ? "Reset Game" : "Start Game"}
      </button>
    </div>
  );
}
