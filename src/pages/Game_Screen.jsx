import { useState } from "react";
import PlayerDeckContainer from "../components/PlayerDeckContainer";
import DicePick from "./DicePick";

function GameScreen() {
  const [currentTurn, setCurrentTurn] = useState(true);
  const [rotationTrigger, setRotationTrigger] = useState(false);
  const [player1, setPlayer1] = useState({
    name: "Player 1",
    soulPoints: 0,
    rotation: true,
    characters: [
      { name: "Aegis Warden", role: "Tank", health: 100, sp: 0, statuses: [] },
      {
        name: "Elandra Aurelian",
        role: "Healer",
        health: 100,
        sp: 0,
        statuses: [],
      },
      {
        name: "Pyrael the Frost Fire Sage",
        role: "Mage",
        health: 100,
        sp: 0,
        statuses: [],
      },
    ],
  });

  const [player2, setPlayer2] = useState({
    name: "Player 2",
    soulPoints: 0,
    rotation: true,
    characters: [
      { name: "Aegis Warden", role: "Tank", health: 100, sp: 0, statuses: [] },
      {
        name: "Elandra Aurelian",
        role: "Healer",
        health: 100,
        sp: 0,
        statuses: [],
      },
      {
        name: "Pyrael the Frost Fire Sage",
        role: "Mage",
        health: 100,
        sp: 0,
        statuses: [],
      },
    ],
  });

  const setPlayerTurn = () => {
    setIsDicePickVisible(true);
    setCurrentTurn(!currentTurn);
    setRotationTrigger((prev) => !prev);
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelected = (cardNumber) => {
    setSelectedCard(cardNumber);

    if (currentTurn) {
      setPlayer1((prev) => ({
        ...prev,
        soulPoints: prev.soulPoints + cardNumber,
      }));
    } else {
      setPlayer2((prev) => ({
        ...prev,
        soulPoints: prev.soulPoints + cardNumber,
      }));
    }
  };

  const [isDicePickVisible, setIsDicePickVisible] = useState(false);
  const handleClose = () => {
    setIsDicePickVisible(false);
  };

  return (
    <div className="Main_Menu overflow-hidden w-screen h-screen flex flex-col justify-center items-center gap-6 p-4">
      {isDicePickVisible && (
        <DicePick
          singleMode={true}
          player={currentTurn}
          onCardSelected={handleCardSelected}
          onClose={handleClose}
        />
      )}
      <div className="currentTurn w-full flex justify-between items-center">
        <p
          className={`${
            currentTurn ? "text-blue-500" : "text-red-500"
          } title_font text-2xl `}
        >
          {currentTurn ? "Player 1's Turn" : "Player 2's Turn"}
          {"  "}
          <span className="text-purple-500 font-bold">+{selectedCard}</span>
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
        player={player1}
        rotationTrigger={!rotationTrigger}
        customClass={`fixed h-1/2 -bottom-10 ${
          currentTurn && "border-x-2 border-[#37a1f9] bg-[#37a1f910]"
        }`}
      />
      <PlayerDeckContainer
        player={player2}
        rotationTrigger={rotationTrigger}
        customClass={`fixed h-1/2 -top-10 rotate-180 ${
          !currentTurn && "border-x-2  border-[#f93737] bg-[#f9373710]"
        }`}
      />
    </div>
  );
}

export default GameScreen;
