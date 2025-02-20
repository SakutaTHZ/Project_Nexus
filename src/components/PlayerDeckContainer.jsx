import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardContainer from "./CardContainer";

const PlayerDeckContainer = ({
  player = {},
  rotationTrigger,
  customClass = "",
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  // Update rotation when rotationTrigger is toggled
  useEffect(() => {
    if (rotationTrigger) {
      setRotationAngle((prevAngle) => (player.rotation ? prevAngle + 120 : prevAngle - 120));
    }
  }, [rotationTrigger, player.rotation]); // Runs only when rotationTrigger or player.rotation changes

  // Debugging: Log every update of rotation angle
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
      {/* Rotating Characters */}
      <div className="flex w-[15%] justify-center items-center">
        <div
          className="characters h-52 w-fit relative border flex justify-center items-center aspect-square rounded-full transition-transform duration-500"
          style={{ transform: `rotate(${rotationAngle}deg)` }} // Rotate whole container
        >
          {player.characters.length >= 3 && (
            <>
              {/* Top Card */}
              <CardContainer
                character={player.characters[0]}
                customClass={`absolute transform ${player.name === "Player 2" && "rotate-180"}`}
                style={{
                  top: "-35%",
                  transform: `rotate(${-rotationAngle}deg)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              />

              {/* Bottom-Right Card */}
              <CardContainer
                character={player.characters[1]}
                customClass={`absolute transform ${player.name === "Player 2" && "rotate-180"}`}
                style={{
                  bottom: "-10%",
                  left: "-17%",
                  transform: `rotate(${-rotationAngle}deg)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              />

              {/* Bottom-Left Card */}
              <CardContainer
                character={player.characters[2]}
                customClass={`absolute transform ${player.name === "Player 2" && "rotate-180"}`}
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
    rotation: PropTypes.bool, // Boolean for rotation
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      })
    ),
  }),
  rotationTrigger: PropTypes.bool.isRequired, // Boolean to trigger rotation
};

export default PlayerDeckContainer;
