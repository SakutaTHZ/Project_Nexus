import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardContainer from "./CardContainer";
import Soul from "../assets/Prototype 0.1/Card Back And Tokens/Soul.png";

const PlayerDeckContainer = ({
  player = {},
  rotationTrigger,
  customClass = "",
  updateSoulPoints,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showEditBox, setShowEditBox] = useState(false);

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

  return (
    <>
      {showEditBox && (
        <SoulsEditBox
          soulPoints={player.soulPoints}
          updateSoulPoints={updateSoulPoints}
          closeEditBox={() => setShowEditBox(false)}
        />
      )}
      <div
        className={`flex justify-center gap-20 min-h-32 w-screen p-2 items-center ${customClass}`}
      >
        {}
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
                {}
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

                {}
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

                {}
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
          Previous Soul Points - <span className="text-purple-600 text-4xl">{soulPoints}</span>
        </p>
        <p className="title_font text-2xl mt-2 border-t w-full pt-6">New Soul Points</p>
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

SoulsEditBox.propTypes = {
  soulPoints: PropTypes.number.isRequired,
  updateSoulPoints: PropTypes.func.isRequired,
  closeEditBox: PropTypes.func,
};

PlayerDeckContainer.propTypes = {
  customClass: PropTypes.string,
  updateSoulPoints: PropTypes.func.isRequired,
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
  }),
  rotationTrigger: PropTypes.bool.isRequired,
};

export default PlayerDeckContainer;
