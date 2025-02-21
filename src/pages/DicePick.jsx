import { useState} from "react";
import PropTypes from "prop-types";
import CardBack from "../assets/Prototype 0.1/Card Back And Tokens/Card Back.png";

const DicePick = ({ singleMode, player, onCardSelected, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [showSelectedCard, setShowSelectedCard] = useState(false);

  const handleCardClick = (index) => {
    if (selectedCard !== null) return; // Disable further clicks if a card is already selected

    setSelectedCard(index);
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle flip state per card
    }));

    // Show the card for 3 seconds before passing it
    setShowSelectedCard(true);
    setTimeout(() => {
      onCardSelected(index); // Pass selected card number to parent
      setShowSelectedCard(false); // Hide card after 3 seconds

      // Close the component after 2 seconds (from card selection)
      setTimeout(() => {
        onClose(); // Call the onClose function passed from the parent
      }, 2000); // 2-second delay to close
    }, 3000); // 3-second delay to show the card
  };

  return (
    <div className="opa-50 fixed top-0 right-0 p-4 w-screen h-screen bg-[#00000080] backdrop-blur-md flex flex-col justify-center items-center gap-4 z-20">
      {singleMode && (
        <div className="absolute w-full h-2/5 flex justify-center bottom-0">
          {[1, 2, 3, 4].sort(() => Math.random() - 0.5).map((num, index) => {
            const offsets = [
              "-rotate-15 -translate-x-28 translate-y-4",
              "-rotate-7 -translate-x-12",
              "rotate-7 translate-x-12",
              "rotate-15 translate-x-28 translate-y-4",
            ];

            return (
              <FlipCard
                key={index}
                player={player}
                number={num}
                index={index}
                isFlipped={flippedCards[index] || false}
                setSelectedCard={handleCardClick}
                selectedCard={selectedCard}
                customClass={`absolute ${offsets[index]}`}
                showSelectedCard={showSelectedCard} // Pass showSelectedCard prop
                isDisabled={selectedCard !== null} // Disable other cards after one is selected
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
  index,
  isFlipped,
  setSelectedCard,
  selectedCard,
  showSelectedCard,
  isDisabled,
}) => {
  return (
    <div
      className={`perspective-1000 transition-all absolute cursor-pointer ${
        selectedCard === index
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-125"
          : ""
      } ${isFlipped ? "" : customClass}`}
      onClick={() => !isDisabled && setSelectedCard(index)} // Disable click if another card is selected
    >
      <div
        className={`relative w-32 h-48 transition-transform duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }} // ✅ Ensures 3D flipping works
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-md flex justify-center items-center bg-gray-800 border border-gray-600 shadow-lg"
          style={{ backfaceVisibility: "hidden" }} // ✅ Hides when flipped
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
          }} // ✅ Ensures front face is visible
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
  customClass: PropTypes.string,
  showSelectedCard: PropTypes.bool, // Add this prop to FlipCard
  isDisabled: PropTypes.bool, // Add the isDisabled prop to disable other cards
};

DicePick.propTypes = {
  singleMode: PropTypes.bool,
  player: PropTypes.bool,
  onCardSelected: PropTypes.func.isRequired, // Ensure onCardSelected is passed as a prop
  onClose: PropTypes.func.isRequired, // Add onClose prop to close the component
};

export default DicePick;
