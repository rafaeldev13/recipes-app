import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeProgress from '../components/RecipesProgres';
import { fetchRecipe } from '../services/getAPI';

function FoodsInProgress() {
  const history = useHistory();
  const path = history.location.pathname.split('/');
  const ID = path[2];

  const type = path[1] === 'foods' ? 'meals' : 'drinks';
  const type0 = type === 'meals' ? 'Foods' : 'Drinks';
  const [food, setFood] = useState({});

  useEffect(() => {
    async function fetchFoodById() {
      setFood(await fetchRecipe(type0, ID));
    }
    fetchFoodById();
  }, [type0, ID]);

  function renderRecipes() {
    const recipe = food;
    const str1 = recipe[type][0].strMeal || recipe[type][0].strDrink;
    const str2 = recipe[type][0].strMealThumb || recipe[type][0].strDrinkThumb;
    const { strCategory, strInstructions } = recipe[type][0];
    return (<RecipeProgress
      foodObject={ recipe[type][0] }
      title={ str1 }
      image={ str2 }
      category={ strCategory }
      instructions={ strInstructions }
      recipe={ recipe }
      id={ ID }
    />);
  }

  return (
    <div>
      {Object.keys(food).length !== 0
       && (renderRecipes())}
    </div>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape({}),
}.isRequired;

export default FoodsInProgress;
