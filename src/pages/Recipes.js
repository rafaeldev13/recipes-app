import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { recipeContext } from '../context/RecipesProvider';
import Cards from '../components/Cards';
import { fetchCategory, fetchIngredient, fetchOption } from '../services/getAPI';
import { FIVE } from '../helpers/magicNumbers';

function Recipes({ foodOrDrink }) {
  const [categories, setCategories] = useState({ meals: [] });
  const [currCategory, setCurrCategory] = useState('');
  const {
    currType,
    setCurrType,
    currRecipes,
    setCurrRecipes,
  } = useContext(recipeContext);

  const handleFilters = async ({ target }) => {
    if (currCategory !== target.id) {
      if (target.id === 'all') {
        const allResult = await fetchOption(currType, 'name', '');
        setCurrRecipes(allResult);
      }
      if (target.id !== 'all') {
        const result = await fetchIngredient(currType, 'filter', target.id);
        setCurrRecipes(result);
      }
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
        <li>
          <button
            type="button"
            data-testid="All-category-filter"
            id="all"
            onClick={ handleFilters }
          >
            All
          </button>
        </li>
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

  useEffect(() => {
    setCurrType(foodOrDrink);
  }, []);

  return (
    <div>
      <Header title={ currType } />
      Recipes

      { (Object.keys(categories)[0].length > 1)
          && handleCategories(categories) }
      { (Object.keys(currRecipes)[0].length > 1 && Object.keys(currRecipes)[0])
          && <Cards array={ currRecipes } /> }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  foodOrDrink: propTypes.string,
};

Recipes.defaultProps = {
  foodOrDrink: 'Foods',
};

export default Recipes;
