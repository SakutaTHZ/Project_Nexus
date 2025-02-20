import PropTypes from "prop-types";
import Character from "../assets/Prototype 0.1/Characters/Thalor_the_Crowned_Knight.png"

const CardContainer = ({ customClass = "", style = {} }) => {
  return (
    <>
      <div
        className={`w-24 h-36 rounded-md border-dotted border-2 border-opacity-45 backdrop-blur-lg transition-all ease-[cubic-bezier(0.6, -0.28, 0.735, 0.045)] delay-200 ${customClass}`}
        style={style}
      >
        <img src={Character} alt="Character" className="w-full h-full rounded-md" />
      </div>
    </>
  );
};

CardContainer.propTypes = {
  customClass: PropTypes.string,
  style: PropTypes.object,
};

export default CardContainer;
