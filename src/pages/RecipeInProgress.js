import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipe } from '../services/getAPI';
import checkCheckBox from '../helpers/checkCheckBox';
// import data1 from '../data';

function RecipeInProgress() {
  // if (!localStorage.getItem('inProgressRecipes')) {
  //   const dataMock = JSON.stringify(data1);
  //   localStorage.setItem('inProgressRecipes', dataMock);
  // }

  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const FOODS = 'Foods';

  const aux1 = data.meals ? Object.keys(data.meals) : [];
  const aux2 = data.cocktails ? Object.keys(data.cocktails) : [];

  const ID_FOODS = [...aux1, ...aux2];

  const DRINKS = 'Drinks';
  let result = [];
  let auxiliar;
  const ingredientesFoods = ID_FOODS.map((id) => {
    if (data.meals && data.cocktails) {
      auxiliar = data.meals[id] || data.cocktails[id];
    } else if (data.meals && !data.cocktails) {
      auxiliar = data.meals[id];
    } else {
      auxiliar = data.cocktails[id];
    }

    result = auxiliar.map((el) => [el, false]);
    return result;
  });

  function verificaCheckBox(target, ind, ind2) {
    if (target.checked) {
      // console.log(ingredientesFoods[ind][0][ind2][1]);
      ingredientesFoods[ind][ind2][1] = true;
    } else {
      ingredientesFoods[ind][ind2][1] = false;
    }
    return ingredientesFoods;
  }
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const btnFinishDisable = true;

  useEffect(() => {
    const eu2 = [];
    const dadosTeste = async () => {
      const eu3 = [];
      ID_FOODS.forEach(async (id) => {
        const fix = 49000;
        if (id > fix) {
          const { meals } = await fetchRecipe(FOODS, id);
          eu3.push(meals);
          setRecipes(eu2.concat(eu3));
        } else {
          const { drinks } = await fetchRecipe(DRINKS, id);
          eu3.push(drinks);
          setRecipes(eu2.concat(eu3));
        }
      });
    };
    dadosTeste();
  }, [FOODS, DRINKS]);

  return (
    <div>
      {recipes.map((elem, index) => {
        const ingredientes = ingredientesFoods;

        const nameCheckBox = Object.keys(elem[0])[0] === 'idMeal'
          ? 'foods' : 'drinks';

        return (
          <div key={ index }>
            <img
              style={ { width: '200px' } }
              // data-testid="recipe-photo"
              src={ elem[0].strMealThumb || elem[0].strDrinkThumb }
              alt="receita"
            />
            <h2 data-testid="recipe-title">{elem[0].strMeal || elem[0].strDrink}</h2>
            <p data-testid="recipe-category">{elem[0].strCategory}</p>
            <p data-testid="instructions">{elem[0].strInstructions}</p>
            <h3>Ingredientes</h3>
            <ul>
              {ingredientes[index].map((ingrediente, ind) => (
                <li
                  key={ ind }
                  id={ `${ind}-${nameCheckBox}-${index}` }
                  data-testid={ `${ind}-ingredient-step` }
                >
                  {ingrediente}
                  <input
                    type="checkbox"
                    name={ nameCheckBox }
                    data-testid={ `${ind}-ingredient-step` }
                    onChange={ ({ target }) => {
                      checkCheckBox(`${ind}-${nameCheckBox}-${index}`);
                      const ing = !verificaCheckBox(target, index, ind)[index]
                        .every((ingrediente2) => ingrediente2[1] === true);
                      document.getElementById(index).disabled = ing;
                    } }
                  />
                </li>
              ))}
            </ul>
            <input type="button" data-testid="share-btn" value="Compartilhar" />
            <input type="button" data-testid="favorite-btn" value="Favoritar" />
            <input
              disabled={ btnFinishDisable }
              id={ index }
              name={ `${index}-Name` }
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/done-recipes') }
              value="Finalizar Receita"
            />
          </div>);
      })}
    </div>
  );
}

export default RecipeInProgress;
