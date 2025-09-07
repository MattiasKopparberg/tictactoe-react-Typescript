type SquareProps = {
  value: "X" | "O" | null;
  onClick: () => void;
};

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 border text-xl flex items-center justify-center"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
