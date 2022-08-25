import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { recipeContext } from '../context/RecipesProvider';
import Ingredients from './Ingredients';

function RecipeProgress(props) {
  const { refreshComponent } = useContext(recipeContext);

  const { title, image, category, instructions, foodObject } = props;

  return (
    <fieldset>
      <legend data-testid="recipe-title">
        {title}
      </legend>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ `foto e receita de ${title} ` }
        style={ { width: '200px', height: '200px' } }
      />
      <h3 data-testid="recipe-category">{category}</h3>
      <p data-testid="instructions">{instructions}</p>
      <Ingredients foodObject={ foodObject } testId="ingredient-step" checkbox />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ refreshComponent }
      >
        Finalizar
      </button>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      {/*  */}
    </fieldset>
  );
}

RecipeProgress.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default RecipeProgress;
