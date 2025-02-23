import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardContainer from "./CardContainer";
import Soul from "../assets/Prototype 0.1/Card Back And Tokens/Soul.png";

const PlayerDeckContainer = ({
  player = {},
  rotationTrigger,
  customClass = "",
  updateSoulPoints,
  updateCharacterData,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showCharacterEditBox, setShowCharacterEditBox] = useState(false);

  useEffect(() => {
    if (rotationTrigger) {
      setRotationAngle((prevAngle) =>
        player.rotation ? prevAngle + 120 : prevAngle - 120
      );
    }
  }, [rotationTrigger, player.rotation]);

  if (!player || !player.characters) {
    return <div className="text-red-500">Error: Player data is missing</div>;
  }

  const updateCharacterStats = (characterName, newData) => {
    updateCharacterData(player.name,characterName, newData); 
  };

  return (
    <>
      {showEditBox && (
        <SoulsEditBox
          soulPoints={player.soulPoints}
          updateSoulPoints={updateSoulPoints}
          closeEditBox={() => setShowEditBox(false)}
        />
      )}
      {showCharacterEditBox && (
        <CharactersEditBox
          characters={player.characters}
          updateCharacterData={updateCharacterStats} 
          closeEditBox={() => setShowCharacterEditBox(false)}
        />
      )}
      <div
        className={`flex justify-center gap-20 min-h-32 w-screen p-2 items-center ${customClass}`}
      >
        <button
          className={`absolute top-2 p-1 px-2 rounded-md ${
            player.name === "Player 2"
              ? "rotate-180 bg-red-400 right-2"
              : "bg-blue-400  left-2"
          }`}
          onClick={() => setShowCharacterEditBox(true)}
        >
          Characters
        </button>
        <div className="flex w-[15%] justify-center items-center">
          <div
            className="characters h-52 w-fit relative border flex justify-center items-center aspect-square rounded-full transition-transform duration-500"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            <div
              className="soulContainer relative w-16 h-16 rounded-full flex justify-center items-center"
              style={{
                transform: `rotate(${
                  player.name === "Player 1"
                    ? -rotationAngle
                    : -rotationAngle + 180
                }deg)`,
                transition: "transform 0.01s ease-in-out",
              }}
              onClick={() => setShowEditBox(true)}
            >
              <img src={Soul} alt="Soul" className="w-16 h-16" />
              <p
                className={`absolute ${
                  player.name === "Player 1" ? "-bottom-5" : "-top-6"
                } text-2xl text-white font-bold`}
              >
                {player.soulPoints}
              </p>
            </div>
            {player.characters.length >= 3 && (
              <>
                <CardContainer
                  character={player.characters[0]}
                  customClass={`absolute transform ${
                    player.name === "Player 2" && "rotate-180"
                  }`}
                  style={{
                    top: "-35%",
                    transform: `rotate(${-rotationAngle}deg)`,
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
                <CardContainer
                  character={player.characters[1]}
                  customClass={`absolute transform ${
                    player.name === "Player 2" && "rotate-180"
                  }`}
                  style={{
                    bottom: "-10%",
                    left: "-17%",
                    transform: `rotate(${-rotationAngle}deg)`,
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
                <CardContainer
                  character={player.characters[2]}
                  customClass={`absolute transform ${
                    player.name === "Player 2" && "rotate-180"
                  }`}
                  style={{
                    bottom: "-10%",
                    right: "-17%",
                    transform: `rotate(${-rotationAngle}deg)`,
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SoulsEditBox = ({ soulPoints, updateSoulPoints, closeEditBox }) => {
  const [newSoulSet, setNewSoulSet] = useState(soulPoints);

  const handleSoulPoints = () => {
    updateSoulPoints(newSoulSet);
    closeEditBox();
  };

  return (
    <div className="soulEditBox fixed w-screen h-screen bg-[#29172e80] backdrop-blur-md z-50 flex justify-center items-center">
      <div className="w-full h-full fixed z-[51]" onClick={closeEditBox}></div>
      <div className="bg-[#00000095] z-[55] p-8 sm:p-16 flex flex-col justify-center items-start gap-4 rounded-md">
        <p className="title_font text-2xl">
          Previous Soul Points -{" "}
          <span className="text-purple-600 text-4xl">{soulPoints}</span>
        </p>
        <p className="title_font text-2xl mt-2 border-t w-full pt-6">
          New Soul Points
        </p>
        <input
          type="number"
          value={newSoulSet}
          onChange={(e) => setNewSoulSet(Number(e.target.value))}
          className="bg-white text-black p-2 rounded-md w-full"
        />
        <button
          className="button bg-purple-600 w-full p-2 rounded-md hover:bg-purple-700 transition"
          onClick={handleSoulPoints}
        >
          Set New Points
        </button>
      </div>
    </div>
  );
};

const CharactersEditBox = ({ characters, updateCharacterData, closeEditBox }) => {
  const [editedCharacters, setEditedCharacters] = useState([...characters]);

  const handleChange = (index, field, value) => {
    setEditedCharacters((prev) =>
      prev.map((char, i) => (i === index ? { ...char, [field]: value } : char))
    );
  };

  const saveChanges = () => {
    editedCharacters.forEach((char) => {
      updateCharacterData(char.name, char); 
    });
    closeEditBox();
  };

  return (
    <div className="soulEditBox fixed w-screen h-screen bg-[#00000080] backdrop-blur-md z-50 flex justify-center items-center">
      <div className="w-full h-full fixed z-[51]" onClick={closeEditBox}></div>
      <div className="bg-[#00000095] z-[55] p-8 sm:p-16 flex flex-col justify-center items-start gap-4 rounded-md">
        {editedCharacters.map((character, index) => (
          <div key={index} className="flex flex-col justify-between items-center w-full">
            <p>{character.name}</p>
            <input
              type="number"
              value={character.health}
              onChange={(e) => handleChange(index, "health", Number(e.target.value))}
              className="text-xl bg-gray-700 text-white p-2 rounded-md"
            />
          </div>
        ))}
        <button
          className="button bg-purple-600 w-full p-2 rounded-md hover:bg-purple-700 transition"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

CharactersEditBox.propTypes = {
  closeEditBox: PropTypes.func.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      health: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateCharacterData: PropTypes.func.isRequired,
};

SoulsEditBox.propTypes = {
  soulPoints: PropTypes.number.isRequired,
  updateSoulPoints: PropTypes.func.isRequired,
  closeEditBox: PropTypes.func.isRequired,
};

PlayerDeckContainer.propTypes = {
  customClass: PropTypes.string,
  updateSoulPoints: PropTypes.func.isRequired,
  updateCharacterData: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    soulPoints: PropTypes.number,
    rotation: PropTypes.bool,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  rotationTrigger: PropTypes.bool.isRequired,
};

export default PlayerDeckContainer;
