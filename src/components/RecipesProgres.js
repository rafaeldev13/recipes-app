import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeContext } from '../context/RecipesProvider';
import Ingredients from './Ingredients';
import handleFavorite from '../helpers/favoriteHelper';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';

const copy = require('clipboard-copy');

function RecipeProgress(props) {
  const { title, image, category, instructions, foodObject, id, recipe } = props;

  const { refreshComponent } = useContext(recipeContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const messageDuration = 200000;
    setTimeout(() => { setShowMessage(false); }, messageDuration);
  }, [showMessage]);

  useEffect(() => {
    const favorites = getFavoriteOrDoneRecipes();
    if (favorites !== undefined) {
      setIsFavorite(favorites.some((el) => el.id === id));
    }
  }, [id]);

  function clipboard() {
    const url = window.location.href.toString();
    copy(url.replace('/in-progress', ''));
    setShowMessage(true);
  }

  return (
    <fieldset>
      { showMessage && <p>Link copied!</p> }
      <legend data-testid="recipe-title">
        {title}
      </legend>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ `foto e receita de ${title} ` }
        style={ { width: '200px', height: '200px' } }
      />
      <input
        data-testid="favorite-btn"
        type="image"
        onClick={ () => handleFavorite(id, recipe, isFavorite, setIsFavorite) }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite button"
      />
      <input
        data-testid="share-btn"
        type="image"
        onClick={ clipboard }
        src={ shareIcon }
        height="80"
        width="50"
        alt="button"
      />
      <h3 data-testid="recipe-category">{category}</h3>
      <p data-testid="instructions">{instructions}</p>
      <Ingredients foodObject={ foodObject } testId="ingredient-step" checkbox />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ refreshComponent }
        onClick={ () => history.push('/done-recipes') }
      >
        Finalizar
      </button>
    </fieldset>
  );
}

RecipeProgress.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  recipe: PropTypes.object,
}.isRequired;

export default RecipeProgress;
