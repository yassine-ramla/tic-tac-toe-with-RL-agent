import Square from "./Square";

type Props = {
  squares: ("#" | "X" | "O")[];
  onSquareClick: (i: number) => void;
  winningLine?: number[] | null;
};

export default function Board({ squares, onSquareClick, winningLine }: Props) {
  function renderSquare(i: number) {
    const isWinning =
      Array.isArray(winningLine) && winningLine.includes(i) ? true : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={isWinning}
      />
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4 w-full aspect-square">
      {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
    </div>
  );
}
