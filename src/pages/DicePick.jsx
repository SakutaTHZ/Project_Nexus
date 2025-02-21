import { useState } from 'react';
import PropTypes from 'prop-types';
import CardBack from '../assets/Prototype 0.1/Card Back And Tokens/Card Back.png';

const DicePick = ({ singleMode, player, onCardSelected, onClose }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [flippedCards, setFlippedCards] = useState({});
    const [showSelectedCard, setShowSelectedCard] = useState(false);
  
    const handleCardClick = (number) => {
      if (selectedCard !== null) return;
  
      onCardSelected(number);
  
      setSelectedCard(number);
  
      setFlippedCards((prev) => ({
        ...prev,
        [number]: !prev[number],
      }));
  
      setShowSelectedCard(true);
      setTimeout(() => {
        setTimeout(() => {
          onClose();
        }, 1000);
      }, 2000);
    };
  
    return (
      <div className="opa-50 fixed top-0 right-0 p-4 w-screen h-screen bg-[#00000080] backdrop-blur-md flex flex-col justify-center items-center gap-4 z-20">
        {singleMode && (
          <div className="animate-slide-up absolute w-full h-1/5 flex justify-center bottom-0">
            {[1, 2, 3, 4]
              .sort(() => Math.random() - 0.5)
              .map((num, index) => {
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
                    isFlipped={flippedCards[num] || false}
                    setSelectedCard={handleCardClick}
                    selectedCard={selectedCard}
                    customClass={`absolute ${offsets[index]}`}
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
    isFlipped,
    setSelectedCard,
    selectedCard,
    showSelectedCard,
    isDisabled,
  }) => {
    return (
      <div
        className={`perspective-1000 transition-all absolute cursor-pointer ${selectedCard === number ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-125" : ""} ${isFlipped ? "" : customClass}`}
        onClick={() => !isDisabled && setSelectedCard(number)}
      >
        <div
          className={`relative w-32 h-48 transition-transform duration-500 transform ${isFlipped ? "rotate-y-180" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {}
          <div
            className="absolute inset-0 w-full h-full rounded-md flex justify-center items-center bg-gray-800 border border-gray-600 shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={CardBack}
              alt="Card Back"
              className="w-full h-full rounded-md"
            />
          </div>
  
          {}
          <div
            className={`absolute inset-0 w-full h-full rounded-md flex justify-center items-center xo_bg border-3 border-gray-600 shadow-lg transform rotate-y-180 ${showSelectedCard ? "opacity-100" : "opacity-0"}`}
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <span
              className={`absolute title_font text-2xl top-1 left-3 ${player ? "text-blue-500" : "text-red-500"}`}
            >
              {number}
            </span>
            <span
              className={`absolute title_font text-6xl ${player ? "text-blue-500" : "text-red-500"}`}
            >
              {number}
            </span>
            <span
              className={`absolute title_font text-2xl bottom-1 right-3 ${player ? "text-blue-500" : "text-red-500"}`}
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
  