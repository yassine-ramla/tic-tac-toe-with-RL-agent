type Props = {
  onNewGame: () => void;
  onResetScore: () => void;
};

const ControlButtons = ({ onNewGame, onResetScore: onReset }: Props) => {
  return (
    <div className="w-full flex items-center justify-center gap-x-2">
      <button
        className="w-full rounded-lg text-center font-bold text-white text-xl p-2 bg-blue-500 cursor-pointer"
        onClick={onNewGame}>
        ⟲ New Game
      </button>
      <button
        className="w-full rounded-lg text-center font-bold text-white text-xl p-2 bg-gray-500 cursor-pointer"
        onClick={onReset}>
        Reset Scores
      </button>
    </div>
  );
};

export default ControlButtons;
