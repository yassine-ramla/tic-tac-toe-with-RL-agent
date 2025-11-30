import { useState } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import { boardStatus as getBoardStatus } from "./utils/game";
import ControlButtons from "./components/ControlButtons";
import axios from "axios";

const PlayerSpan = ({ player }: { player: string }) => {
  return (
    <span
      className={`font-bold text-xl lg:text-xl ${
        player === "You (X)" ? "text-red-500" : "text-blue-500"
      }`}>
      {player}
    </span>
  );
};

function App() {
  const [squares, setSquares] = useState<("#" | "X" | "O")[]>(
    Array(9).fill("#")
  );
  const [scoreBoard, setScoreBoard] = useState({ wins: 0, draws: 0, loses: 0 });
  const [gettingAIMove, setGettingAIMove] = useState(false);
  const [errorGettingAIMove, setErrorGettingAIMove] = useState(false);

  const boardStatus = getBoardStatus(squares);

  async function fetchNextState(
    previousState: string,
    currentState: string
  ): Promise<string | null> {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/next-state`,
        {
          previous_state: previousState,
          current_state: currentState,
        }
      );

      return response.data.next_state as string;
    } catch (error) {
      console.error("Backend request failed:", error);
      throw new Error("Backend request failed");
    }
  }

  async function handleSquareClick(i: number) {
    if (
      boardStatus?.winner ||
      squares[i] !== "#" ||
      gettingAIMove ||
      errorGettingAIMove
    )
      return;
    const next = squares.slice();
    next[i] = "X";
    setSquares(next);

    let nextBoardStatus = getBoardStatus(next);
    if (nextBoardStatus?.winner) {
      setScoreBoard((prev) => ({
        ...prev,
        loses: prev.loses + 1,
      }));
    } else if (nextBoardStatus?.draw) {
      setScoreBoard((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    }

    // make a query to the backend to decide which move to make next instead of randomly choosing
    setGettingAIMove(true);
    const nextState = await fetchNextState(squares.join(""), next.join(""))
      .then((nextState) => {
        setTimeout(() => {
          setGettingAIMove(false);
        }, 100);
        return nextState;
      })
      .catch((err) => {
        setErrorGettingAIMove(true);
        console.error("Error:", err);
        return null;
      });

    if (nextState) {
      for (let i = 0; i < next.length; i++) {
        if (next[i] !== nextState[i]) {
          next[i] = "O";
          break;
        }
      }
      setSquares(next);

      nextBoardStatus = getBoardStatus(next);
      if (nextBoardStatus?.winner) {
        setScoreBoard((prev) => ({
          ...prev,
          wins: prev.wins + 1,
        }));
        return;
      } else if (nextBoardStatus?.draw) {
        setScoreBoard((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
        return;
      }
    }
  }

  function newGame() {
    setErrorGettingAIMove(false);
    setGettingAIMove(false);
    setSquares(Array(9).fill("#"));
  }

  function resetScore() {
    setErrorGettingAIMove(false);
    setGettingAIMove(false);
    newGame();
    setScoreBoard({ wins: 0, draws: 0, loses: 0 });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#3d80f6] to-[#9134ea] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow p-[8%] space-y-8">
          <h1 className="text-2xl font-semibold text-center">Tic-Tac-Toe</h1>
          <div className="space-y-2">
            <Scoreboard {...scoreBoard} />
            <p className="w-full text-center text-xl p-2">
              {boardStatus?.draw ? (
                <span className="text-yellow-500 font-semibold">
                  it's a draw 🤝
                </span>
              ) : boardStatus?.winner ? (
                <span>
                  <PlayerSpan
                    player={boardStatus?.winner === "O" ? "AI (O)" : "You (X)"}
                  />{" "}
                  win{boardStatus?.winner === "O" && "s"}!
                </span>
              ) : gettingAIMove ? (
                <span>
                  <PlayerSpan player="AI (O)" /> Is Thinking...
                </span>
              ) : errorGettingAIMove ? (
                <span>Something Went Wrong! try to refresh the page.</span>
              ) : (
                <span>
                  <PlayerSpan player={"You (X)"} /> Play Next
                </span>
              )}
            </p>
            <Board
              squares={squares}
              onSquareClick={handleSquareClick}
              winningLine={boardStatus?.line}
            />
          </div>
          <ControlButtons onNewGame={newGame} onResetScore={resetScore} />
        </div>
      </div>
    </div>
  );
}

export default App;
