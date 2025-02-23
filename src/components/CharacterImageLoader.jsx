import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CharacterImageLoader = ({ character }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    import(`../assets/Prototype 0.1/Characters/${character.name}.png`).then((image) =>
      setImage(image.default)
    );
  }, [character.name]);

  return (
    <img src={image} alt={character.name} className="w-full h-full rounded-md" loading="lazy"/>
  )
};

CharacterImageLoader.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CharacterImageLoader;