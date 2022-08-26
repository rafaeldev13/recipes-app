import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { recipeContext } from '../context/RecipesProvider';
import checkCheckBox from '../helpers/checkCheckBox';

function Ingredients(props) {
  const { setRefreshComponent } = useContext(recipeContext);

  const { foodObject, testId } = props;
  const ID = foodObject.idMeal || foodObject.idDrink;
  const [savedCheckbox, setSavedCheckbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idFood, setIdFood] = useState(0);
  useEffect(() => {
    setIdFood(ID);
    if (!localStorage.getItem('food')) {
      localStorage.setItem('food', JSON.stringify({}));
    }
    const savedFood = JSON.parse(localStorage.getItem('food'));
    if (savedFood[ID]) {
      setSavedCheckbox(savedFood[ID]);
    }
    setLoading(true);
  }, [foodObject.idMeal, foodObject.idDrink, ID]);

  function handleClick({ target }, index) {
    checkCheckBox(index);
    const { checked } = target;
    if (!checked) {
      const savedFood = JSON.parse(localStorage.getItem('food'));
      console.log(savedFood);
      delete (savedFood[idFood][index]);
      localStorage.setItem('food', JSON.stringify(savedFood));
    } else {
      if (!localStorage.getItem('food')) {
        localStorage.setItem('food', JSON.stringify({ [idFood]: { index: true } }));
      }
      const savedFood = JSON.parse(localStorage.getItem('food'));
      localStorage.setItem('food',
        JSON.stringify({ [idFood]: { [index]: true, ...savedFood[idFood] } }));
    }
    const savedFood = JSON.parse(localStorage.getItem('food'));
    const trueIngred = Object.values(savedFood[ID]).length;
    const totalIngred = Number(localStorage.getItem('quantIngredient'));
    setRefreshComponent(trueIngred !== totalIngred);
    const binary = trueIngred !== totalIngred ? 1 : 0;
    localStorage.setItem('refreshComponent', binary);
    setSavedCheckbox(savedFood[idFood]);
  }

  function displayIngredients(mesures) {
    return mesures.map((mesure, index) => {
      const classRiscado = savedCheckbox[index] ? 'riscado' : '';
      console.log(savedCheckbox[index]);
      return (
        <form action="" key={ index }>
          <label htmlFor="checkboxIngredient" data-testid={ `${index}-${testId}` }>
            <span className={ classRiscado } id={ index }>{mesure}</span>
            <input
              name="checkboxIngredient"
              type="checkbox"
              onChange={ (event) => handleClick(event, index) }
              checked={ !!savedCheckbox[index] }
            />
          </label>
        </form>
      );
    });
  }

  function generateArrayOfIngredientsAndMeasures(response) {
    const IngredientsAndMeasures = [];
    if (response) {
      const arrayOfEntries = Object.entries(response);
      const THIRTEEN_CHARACTER = 13;
      const FIFTEEN_CHARACTER = 15;
      arrayOfEntries.forEach((item) => {
        const [ingredientKey, ingredientValue] = item;
        if (ingredientKey.includes('strIngredient') && ingredientValue) {
          const itemIndex = item[0].slice(THIRTEEN_CHARACTER, FIFTEEN_CHARACTER);
          const getMeasures = arrayOfEntries.find((measure) => (
            measure[0] === `strMeasure${itemIndex}`
          ));
          const mesuresValue = getMeasures[1];
          IngredientsAndMeasures.push(`${ingredientValue} ${mesuresValue}`);
        }
      });
    }
    localStorage.setItem('quantIngredient', IngredientsAndMeasures.length);
    return displayIngredients(IngredientsAndMeasures);
  }

  return (
    <div>
      {loading && generateArrayOfIngredientsAndMeasures(foodObject) }
    </div>
  );
}

Ingredients.propTypes = {
  foodObject: PropTypes.shape({}),
}.isRequired;

export default Ingredients;
