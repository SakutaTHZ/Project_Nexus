import React from "react";
import PropTypes from "prop-types";
import CardContainer from "./CardContainer";

const PlayerDeckContainer = ({ customClass = "" }) => {
  const [rotationAngle, setRotationAngle] = React.useState(0);

  const rotate = () => {
    setRotationAngle(rotationAngle + 120);
  };

  return (
    <>
      <div
        className={`flex justify-center gap-20 min-h-32 w-screen rounded p-2 items-center ${customClass}`}
      >
        {/* First Column - Rotating Characters */}
        <div className="flex w-[15%] justify-center items-center">
          <div
            className="characters h-52 w-fit relative border flex justify-center items-center aspect-square rounded-full transition-transform duration-500"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
            onClick={rotate}
          >
            {/* Top Card */}
            <CardContainer
              customClass={`absolute transform `}
              style={{
                top: "-35%",
                transform: `rotate(-${rotationAngle}deg)`,
              }}
            />

            {/* Bottom-Right Card */}
            <CardContainer
              customClass={`absolute transform`}
              style={{
                bottom: "-10%",
                left: "-17%", // Adjusted for wider spacing
                transform: `rotate(-${rotationAngle}deg)`,
              }}
            />

            {/* Bottom-Left Card */}
            <CardContainer
              customClass={`absolute transform `}
              style={{
                bottom: "-10%",
                right: "-17%", // Adjusted for wider spacing
                transform: `rotate(-${rotationAngle}deg)`,
              }}
            />
          </div>
        </div>

        
      </div>
    </>
  );
};

PlayerDeckContainer.propTypes = {
  customClass: PropTypes.string,
};

export default PlayerDeckContainer;
