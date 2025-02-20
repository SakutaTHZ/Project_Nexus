import { useState } from "react";
import PlayerDeckContainer from "../components/PlayerDeckContainer";

function GameScreen() {
  // Variables
  const [currentTurn, setCurrentTurn] = useState(true);
  const [rotationTrigger, setRotationTrigger] = useState(false);
  const [player1, setPlayer1] = useState({
    name: "Player 1",
    rotation: true,
    characters : [
      { name: "Aegis Warden", role: "Tank" },
      { name: "Elandra Aurelian", role: "Healer" },
      { name: "Pyrael the Frost Fire Sage", role: "Mage" },
    ],
  });
  const [player2, setPlayer2] = useState({
    name: "Player 2",
    rotation: false,
    characters : [
      { name: "Aegis Warden", role: "Tank" },
      { name: "Elandra Aurelian", role: "Healer" },
      { name: "Pyrael the Frost Fire Sage", role: "Mage" },
    ],
  });

  const setPlayerTurn = () => {
    setCurrentTurn(!currentTurn);
    setRotationTrigger((prev) => !prev);
  };

  return (
    <div className="Main_Menu overflow-hidden w-screen h-screen flex flex-col justify-center items-center gap-6 p-4">
      <div className="currentTurn w-full flex justify-between items-center">
        <p
          className={`${
            currentTurn
              ? "text-blue-500"
              : "text-red-500"
          } title_font text-2xl `}
        >
          {currentTurn ? "Player 1's Turn" : "Player 2's Turn"}
        </p>
        <button
          className={`text-white p-1 px-6 rounded-md transition ${
            currentTurn ? "bg-[#37a1f9]" : "bg-[#f93737]"
          }`}
          onClick={setPlayerTurn}
        >
          End Turn
        </button>
      </div>
      <PlayerDeckContainer
      player={player1} rotationTrigger={!rotationTrigger}
        customClass={`fixed h-1/2 -bottom-10 ${
          currentTurn && "border-x-2 border-[#37a1f9] bg-[#37a1f910]"
        }`}
      />
      <PlayerDeckContainer
      player={player2} rotationTrigger={rotationTrigger}
        customClass={`fixed h-1/2 -top-10 rotate-180 ${
          !currentTurn && "border-x-2  border-[#f93737] bg-[#f9373710]"
        }`}
      />
    </div>
  );
}

export default GameScreen;
