import React from 'react';
import { useHistory } from 'react-router-dom';
import { TWELVE } from '../helpers/magicNumbers';

function Cards({ array }) {
  const history = useHistory();
  const type = array.drinks ? 'drinks' : 'meals';
  const typeTwo = array.drinks ? 'drinks' : 'foods';

  const handleRedirect = ({ target }) => {
    history.push(`/${typeTwo}/${target.id}`);
  };

  const newArray = array[type].slice(0, TWELVE);
  return newArray.map((recipe, index) => {
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
      <div
        key={ id }
        id={ id }
        role="button"
        tabIndex={ id }
        data-testid={ `${index}-recipe-card` }
        onClick={ handleRedirect }
        onKeyDown={ handleRedirect }
      >
        <img
          src={ image }
          alt={ name }
          id={ id }
          width="200px"
          data-testid={ `${index}-card-img` }
        />
        <p id={ id } data-testid={ `${index}-card-name` }>{ `${name}` }</p>
      </div>
    );
  });
}

export default Cards;
