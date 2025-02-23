import PropTypes from "prop-types";
import CharacterImageLoader from "./CharacterImageLoader";

const CardContainer = ({ customClass = "",character, style = {} }) => {
  return (
    <>
      <div
        className={`w-24 h-36 rounded-md border border-opacity-45 backdrop-blur-lg transition-all ease-[cubic-bezier(0.6, -0.28, 0.735, 0.045)] delay-200 ${customClass}`}
        style={style}
      >
        <p className="absolute -top-2 -right-4 text-lg text-white bg-red-400 border-3 border-red-500 w-12 px-1.5 h-8 rounded-full flex justify-center items-center font-bold">{character.health}</p>
        <p className="absolute top-7 -right-4 text-lg text-white bg-blue-400 border-3 border-blue-500 w-12 px-1.5 h-8 rounded-full flex justify-center items-center font-bold">{character.sp}</p>
        <CharacterImageLoader character={character} />
      </div>
    </>
  );
};

CardContainer.propTypes = {
  customClass: PropTypes.string,
  style: PropTypes.object,
  character: PropTypes.object,
};

export default CardContainer;
