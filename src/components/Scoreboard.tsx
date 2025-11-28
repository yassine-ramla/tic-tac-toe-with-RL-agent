type Props = {
  wins: number;
  draws: number;
  loses: number;
};

export default function Scoreboard({ wins, draws, loses }: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-x-3">
      <div className="w-full flex flex-col items-center justify-center rounded-xl cursor-pointer p-3 bg-red-50">
        <span className="text-red-500 font-bold text-xl lg:text-xl text-center">
          You (X)
        </span>
        <span className="text-xl">{loses}</span>
      </div>
      <div className="w-full flex flex-col items-center justify-center rounded-xl cursor-pointer p-3 bg-gray-50">
        <span className="text-gray-500 font-bold text-xl lg:text-xl text-center">
          Draws
        </span>
        <span className="text-xl">{draws}</span>
      </div>
      <div className="w-full flex flex-col items-center justify-center rounded-xl cursor-pointer p-3 bg-blue-50">
        <span className="text-blue-500 font-bold text-xl lg:text-xl text-center">
          AI (O)
        </span>
        <span className="text-xl">{wins}</span>
      </div>
    </div>
  );
}
