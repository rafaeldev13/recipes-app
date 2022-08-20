import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { recipeContext } from '../context/RecipesProvider';
import handleCards from '../helpers/searchBarHelp';
import { fetchCategory, fetchIngredient, fetchOption } from '../services/getAPI';
import { FIVE } from '../helpers/magicNumbers';

function Recipes() {
  const [categories, setCategories] = useState({ meals: [] });
  const [currCategory, setCurrCategory] = useState('');
  const { currType, currRecipes, setCurrRecipes } = useContext(recipeContext);

  const handleFilters = async ({ target }) => {
    if (currCategory !== target.id) {
      const result = await fetchIngredient(currType, 'filter', target.id);
      setCurrRecipes(result);
      setCurrCategory(target.id);
    } else {
      const result = await fetchOption(currType, 'name', '');
      setCurrRecipes(result);
      setCurrCategory('');
    }
  };

  const handleCategories = (data) => {
    const type = data.drinks ? 'drinks' : 'meals';
    const newArray = data[type].slice(0, FIVE);
    const result = newArray.map((category) => (
      <li
        key={ category.strCategory }
      >
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          id={ category.strCategory }
          onClick={ handleFilters }
        >
          {category.strCategory}
        </button>
      </li>
    ));
    return (
      <ul>
        {result}
      </ul>
    );
  };

  useEffect(() => {
    const getRecipes = async () => {
      const result = await fetchOption(currType, 'name', '');
      setCurrRecipes(result);
      const catResult = await fetchCategory(currType);
      setCategories(catResult);
    };
    getRecipes();
  }, [currType]);

  return (
    <div>
      <Header title={ currType } />
      Recipes
      { (Object.keys(categories)[0].length > 1)
          && handleCategories(categories) }
      { (Object.keys(currRecipes)[0].length > 1)
          && handleCards(currRecipes) }
      <Footer />
    </div>
  );
}

export default Recipes;
