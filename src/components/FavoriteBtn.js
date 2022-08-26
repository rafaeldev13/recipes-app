import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import handleFavorite from '../helpers/favoriteHelper';

function FavoriteBtn(props) {
  const { recipe, index, update } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavoriteOrDoneRecipes();
    if (favorites !== undefined) {
      setIsFavorite(favorites.some((el) => el.id === recipe.id));
    }
  }, []);

  function handleClick() {
    handleFavorite(recipe.id, recipe, isFavorite, setIsFavorite);
    update();
  }

  return (
    <input
      data-testid={ `${index}-horizontal-favorite-btn` }
      type="image"
      onClick={ handleClick }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      alt="favorite button"
    />
  );
}

FavoriteBtn.propTypes = {
  index: PropTypes.string,
  recipe: PropTypes.object,
  handleUpdate: PropTypes.func,
}.isRequired;

export default FavoriteBtn;
