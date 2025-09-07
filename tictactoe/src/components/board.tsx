type Player = "X" | "O" | null;

interface BoardProps {
  squares: Player[];
  onSquareClick: (index: number) => void;
}

export default function Board({ squares, onSquareClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((square, index) => (
        <button
          key={index}
          onClick={() => onSquareClick(index)}
          className="w-20 h-20 flex items-center justify-center text-3xl font-bold 
                     rounded-lg bg-slate-600 hover:bg-slate-500 
                     transition-colors shadow-md text-white"
        >
          {square}
        </button>
      ))}
    </div>
  );
}
