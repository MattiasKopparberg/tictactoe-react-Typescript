import Square from "../components/square";

type BoardProps = {
  squares: ("X" | "O" | null)[];
  onSquareClick: (index: number) => void;
};

export default function Board({ squares, onSquareClick }: BoardProps) {
  return (
    <div className="container gap-4">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}
  