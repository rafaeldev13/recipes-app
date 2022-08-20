import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { recipeContext } from '../context/RecipesProvider';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { setCurrType } = useContext(recipeContext);

  const handleType = ({ target }) => {
    setCurrType(target.id.charAt(0).toUpperCase() + target.id.slice(1));
    history.push(`/${target.id}`);
  };

  return (
    <div className="footer" data-testid="footer">
      <input
        type="image"
        id="drinks"
        src={ drinkIcon }
        alt="drink"
        data-testid="drinks-bottom-btn"
        onClick={ handleType }
      />
      <input
        type="image"
        id="foods"
        src={ mealIcon }
        alt="meal"
        data-testid="food-bottom-btn"
        onClick={ handleType }
      />
    </div>
  );
}

export default Footer;
