type Props = {
  value: "#" | "X" | "O";
  onClick: () => void;
  highlight?: boolean;
};

export default function Square({ value, onClick, highlight = false }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full aspect-square flex items-center justify-center text-3xl font-bold rounded-xl transition-colors shadow-md cursor-pointer ${
        highlight
          ? "bg-blue-100 border-blue-300"
          : "bg-[#f9fafb] hover:bg-gray-100"
      }
      ${value === "X" ? "text-red-500" : "text-blue-500"}`}>
      {value === "#" ? "" : value}
    </button>
  );
}
