import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteBtn from '../components/FavoriteBtn';
import Header from '../components/Header';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [recipesFilter, setRecipesFilter] = useState(getFavoriteOrDoneRecipes());
  const [showMessage, setShowMessage] = useState(false);
  const [updateFavorites, setUpdateFavorites] = useState(false);

  useEffect(() => {
    const filteredRecipes = getFavoriteOrDoneRecipes()
      .filter((recipe) => recipe.type.includes(filter));
    setRecipesFilter(filteredRecipes);
  }, [filter, updateFavorites]);

  useEffect(() => {
    const messageDuration = 200000;
    const timeout = setTimeout(() => { setShowMessage(false); }, messageDuration);
    return () => { clearTimeout(timeout); };
  }, [showMessage]);

  function clipboard(recipe) {
    const type = recipe.type === 'food' ? 'foods' : 'drinks';
    copy(`http://localhost:3000/${type}/${recipe.id}`);
    setShowMessage(true);
  }

  function recipeRedirect(recipe) {
    const type = recipe.type === 'food' ? 'foods' : 'drinks';
    history.push(`/${type}/${recipe.id}`);
  }

  function handleUpdate() {
    setUpdateFavorites(!updateFavorites);
  }

  return (
    <div>
      <Header title="Favorite Recipes" hideSearchIcon />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      { showMessage && <p>Link copied!</p> }
      <div>
        {recipesFilter.map((recipe, recipeIndex) => (
          <div key={ recipe.name }>
            <input
              type="image"
              src={ recipe.image }
              alt={ recipe.name }
              width="300px"
              data-testid={ `${recipeIndex}-horizontal-image` }
              onClick={ () => recipeRedirect(recipe) }
            />

            <a href={ `http://localhost:3000/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}` } data-testid={ `${recipeIndex}-horizontal-name` }>
              <p>{recipe.name}</p>
            </a>

            {!recipe.alcoholicOrNot && (
              <p data-testid={ `${recipeIndex}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>)}

            {recipe.alcoholicOrNot && (
              <p data-testid={ `${recipeIndex}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>)}

            <p data-testid={ `${recipeIndex}-horizontal-done-date` }>
              {`Done date: ${recipe.doneDate}`}
            </p>

            <input
              type="image"
              alt="Share Icon"
              data-testid={ `${recipeIndex}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => clipboard(recipe) }
            />

            <FavoriteBtn
              recipe={ recipe }
              index={ recipeIndex }
              update={ () => { handleUpdate(); } }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
