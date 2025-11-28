export function boardStatus(
  squares: ("#" | "X" | "O")[]
): { winner: "X" | "O" | null; line: number[] | null; draw: boolean } | null {
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

  for (const [a, b, c] of lines) {
    if (
      squares[a] !== "#" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a] as "X" | "O", line: [a, b, c], draw: false };
    }
  }
  if (squares.every((square) => square !== "#"))
    return { winner: null, line: null, draw: true };

  return null;
}
