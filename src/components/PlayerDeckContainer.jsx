import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardContainer from "./CardContainer";
import Soul from "../assets/Prototype 0.1/Card Back And Tokens/Soul.png";

const PlayerDeckContainer = ({
  player = {},
  rotationTrigger,
  customClass = "",
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    if (rotationTrigger) {
      setRotationAngle((prevAngle) =>
        player.rotation ? prevAngle + 120 : prevAngle - 120
      );
    }
  }, [rotationTrigger, player.rotation]);

  useEffect(() => {
    console.log("Rotation Angle Updated:", rotationAngle);
  }, [rotationAngle]);

  if (!player || !player.characters) {
    return <div className="text-red-500">Error: Player data is missing</div>;
  }

  return (
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
              transform: `rotate(${player.name === "Player 1" ? -rotationAngle : (-rotationAngle+180)}deg)`,
              transition: "transform 0.01s ease-in-out",
            }}
          >
            <img src={Soul} alt="Soul" className="w-16 h-16" />
            <p className={`absolute ${player.name === "Player 1" ? '-bottom-5' :'-top-6'} text-2xl text-white font-bold`}>
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
  );
};

PlayerDeckContainer.propTypes = {
  customClass: PropTypes.string,
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
