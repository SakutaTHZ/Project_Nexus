import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardBack from "../assets/Prototype 0.1/Card Back And Tokens/Card Back.png";

const DicePick = ({ singleMode, player, onCardSelected, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [borderedCard, setBorderedCard] = useState(null); // Tracks the card with the border
  const [flippedCards, setFlippedCards] = useState({});
  const [showSelectedCard, setShowSelectedCard] = useState(false);

  const [shuffledNumbers, setShuffledNumbers] = useState([]);

  useEffect(() => {
    // Shuffle the numbers only once when the component mounts
    setShuffledNumbers(
      Array.from({ length: 6 }, (_, i) => i + 1) // Create an array [1, 2, 3, 4, 5, 6]
        .sort(() => Math.random() - 0.5) // Shuffle the array
        .slice(0, 4) // Take the first 4 numbers
    );
  }, []); // Empty dependency array ensures it runs only once

  const handleCardClick = (number, index) => {
    if (selectedCard !== null) return; // Prevent multiple selections

    if (borderedCard === index) {
      setFlippedCards((prev) => ({
        ...prev,
        [index]: !prev[index], // Flip based on index
      }));

      onCardSelected(number, index); // ✅ Pass correct number and index

      setSelectedCard(number); // ✅ Store the actual card number, not index
      setBorderedCard(null);
      setShowSelectedCard(true);

      setTimeout(() => {
        setTimeout(() => {
          onClose();
        }, 1000);
      }, 2000);
    } else {
      setBorderedCard(index);
    }
  };

  return (
    <div className="opa-50 fixed top-0 right-0 w-screen h-screen bg-[#00000080] backdrop-blur-md flex flex-col justify-center items-center gap-4 z-20">
      <p
        className={`title_font text-4xl absolute top-5 ${
          player ? "text-blue-500" : "text-red-500"
        }`}
      >
        Pick a Card. Any Card!
      </p>
      {showSelectedCard && (
        <div
          className="BgPlaceholder w-full h-full"
          onClick={() => onClose()}
        ></div>
      )}
      {singleMode && (
        <div className="slideUp absolute w-full h-2/5 flex justify-center items-center bottom-0">
          {shuffledNumbers.map((num, index) => {
            const offsets = [
              "-rotate-15 translate-y-68 -translate-x-50 md:translate-y-72 md:-translate-x-74",
              "-rotate-8 translate-y-64 -translate-x-24 md:translate-y-64 md:-translate-x-34",
              "rotate-8 translate-y-64  -translate-x-4 md:translate-y-64 md:translate-x-2",
              "rotate-15 translate-y-68 translate-x-18 md:translate-y-72 md:translate-x-42",
            ];

            return (
              <FlipCard
                key={index}
                player={player}
                number={num}
                index={index} // Correctly passing index
                isFlipped={flippedCards[index] || false} // Flip logic fixed
                setSelectedCard={handleCardClick}
                selectedCard={selectedCard}
                borderedCard={borderedCard}
                customClass={`absolute ${offsets[index]} index-${index} number-${num}`}
                showSelectedCard={showSelectedCard}
                isDisabled={selectedCard !== null}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const FlipCard = ({
  customClass,
  player,
  number,
  index, // Accept index
  isFlipped,
  setSelectedCard,
  selectedCard,
  borderedCard,
  showSelectedCard,
  isDisabled,
}) => {
  return (
    <div
      className={`perspective-1000 transition-all absolute cursor-pointer ${
        selectedCard === selectedCard // Compare selected card properly
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-125"
          : ""
      } ${!isFlipped && customClass}`}
      onClick={() => !isDisabled && setSelectedCard(number, index)} // Pass correct values
    >
      <div
        className={`relative w-32 h-48 transition-transform duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 w-full h-full rounded-md flex justify-center items-center bg-gray-800 border  shadow-lg ${
            borderedCard === index
              ? `border-4 -translate-y-2 ${
                  player ? "text-blue-500" : "text-red-500"
                }`
              : "border-gray-600" // Apply border properly
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={CardBack}
            alt="Card Back"
            className="w-full h-full rounded-md"
          />
        </div>

        {/* Card Front */}
        <div
          className={`absolute inset-0 w-full h-full rounded-md flex justify-center items-center xo_bg border-3 border-gray-600 shadow-lg transform rotate-y-180 ${
            showSelectedCard ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className={`absolute title_font text-2xl top-1 left-3 ${
              player ? "text-blue-500" : "text-red-500"
            }`}
          >
            {number}
          </span>
          <span
            className={`absolute title_font text-6xl ${
              player ? "text-blue-500" : "text-red-500"
            }`}
          >
            {number}
          </span>
          <span
            className={`absolute title_font text-2xl bottom-1 right-3 ${
              player ? "text-blue-500" : "text-red-500"
            }`}
          >
            {number}
          </span>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  player: PropTypes.bool,
  number: PropTypes.number,
  index: PropTypes.number,
  isFlipped: PropTypes.bool,
  setSelectedCard: PropTypes.func,
  selectedCard: PropTypes.number,
  borderedCard: PropTypes.number, // Accept borderedCard prop
  customClass: PropTypes.string,
  showSelectedCard: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

DicePick.propTypes = {
  singleMode: PropTypes.bool,
  player: PropTypes.bool,
  onCardSelected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DicePick;
