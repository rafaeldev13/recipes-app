import {
  getFavoriteOrDoneRecipes,
  removeFavoriteOrDoneRecipes,
  saveFavoriteOrDoneRecipes,
} from './handleLocalStorage';

function addFavorite(id, currRecipe) {
  const LowerType = currRecipe.drinks ? 'drink' : 'food';
  const recipeType = currRecipe.drinks ? 'drinks' : 'meals';
  const nameKey = currRecipe.drinks ? 'strDrink' : 'strMeal';
  const imageKey = currRecipe.drinks ? 'strDrinkThumb' : 'strMealThumb';
  const recipe = currRecipe[recipeType][0];
  const favorite = {
    id,
    type: LowerType,
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[nameKey],
    image: recipe[imageKey],
  };
  saveFavoriteOrDoneRecipes(favorite);
}

export default function handleFavorite(id, currRecipe, isFavorite, setIsFavorite) {
  if (!isFavorite) {
    addFavorite(id, currRecipe);
  } else {
    removeFavoriteOrDoneRecipes(id);
  }
  setIsFavorite(getFavoriteOrDoneRecipes().some((el) => el.id === id));
}
