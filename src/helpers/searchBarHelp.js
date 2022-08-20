import React from 'react';
import { TWELVE } from './magicNumbers';

const handleCards = (array) => {
  const type = array.drinks ? 'drinks' : 'meals';
  const newArray = array[type].slice(0, TWELVE);
  return newArray.map((recipe) => {
    const id = recipe.idDrink
      ? recipe.idDrink
      : recipe.idMeal;
    const image = recipe.idDrink
      ? recipe.strDrinkThumb
      : recipe.strMealThumb;
    const name = recipe.idDrink
      ? recipe.strDrink
      : recipe.strMeal;
    return (
      <div key={ id } data-testid={ `${id}-recipe-card` }>
        <img
          src={ image }
          alt={ name }
          width="200px"
          data-testid={ `${id}-card-image` }
        />
        <p data-testid={ `${id}-card-name` }>{ `${name}` }</p>
      </div>
    );
  });
};

export default handleCards;
