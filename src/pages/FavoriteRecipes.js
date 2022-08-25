import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [recipesFilter, setRecipesFilter] = useState(getFavoriteOrDoneRecipes());
  // const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const filteredRecipes = getFavoriteOrDoneRecipes()
      .filter((recipe) => recipe.type.includes(filter));
    setRecipesFilter(filteredRecipes);
  }, [filter]);

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
      {/* { showMessage && <p>Link copied!</p> } */}
      <div>
        {recipesFilter.map((recipe) => (
          <p key={ recipe.name }>{recipe.name}</p>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
