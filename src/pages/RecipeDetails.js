import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailCards from '../components/DetailCards';
import { fetchRecipe } from '../services/getAPI';
import { getDoneRecipes,
  getInProgressRecipes, saveInProgressRecipes } from '../helpers/handleLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipesDetails() {
  const [currRecipe, setCurrRecipe] = useState();
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);

  const { pathname } = history.location;
  const pathArray = pathname.split('/');
  const type = pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1);
  const invertedType = (type === 'Foods') ? 'Drinks' : 'Foods';
  const id = pathArray[2];

  useEffect(() => {
    const getInfo = async () => {
      const result = await fetchRecipe(type, id);
      setCurrRecipe(result);
    };
    getInfo();
  }, [type, id]);

  useEffect(() => {
    const messageDuration = 2000;
    setTimeout(() => { setShowMessage(false); }, messageDuration);
  }, [showMessage]);

  const handleYoutube = (url) => {
    const newUrl = url.includes('watch') ? url.replace('watch?v=', 'embed/') : url;

    return (
      <div className="video-responsive"/* css in App.css */>
        <iframe
          width="80%"
          src={ newUrl }
          frameBorder="0"
          data-testid="video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    );
  };

  const formatIngredients = (data) => {
    const filteredIngredients = data.filter((key) => key[0]
      .includes('strIngredient') && (key[1] !== null && key[1] !== ''));
    const ingArray = filteredIngredients.reduce((acc, value) => [...acc, value[1]], []);
    const filteredMeasures = data.filter((key) => key[0]
      .includes('strMeasure') && (key[1] !== null && key[1] !== ' '));
    const meaArray = filteredMeasures.reduce((acc, value) => [...acc, value[1]], []);
    return ingArray.map((ing, index) => `- ${ing} - ${meaArray[index]}`);
  };

  const renderIngredients = (data) => {
    const arrayToMap = formatIngredients(data);
    return (
      arrayToMap.map((string, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {string}
        </p>)));
  };

  const recipeRender = () => {
    const LowerType = currRecipe.drinks ? 'drinks' : 'meals';
    const upperType = currRecipe.drinks ? 'Drink' : 'Meal';
    return (
      <>
        <img
          width="80%"
          src={ currRecipe[LowerType][0][`str${upperType}Thumb`] }
          alt={ LowerType }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">
          { currRecipe[LowerType][0][`str${upperType}`] }
        </h2>
        {currRecipe.meals
          ? (
            <h3 data-testid="recipe-category">
              { currRecipe[LowerType][0].strCategory }
            </h3>)
          : (
            <h3 data-testid="recipe-category">
              { currRecipe[LowerType][0].strAlcoholic }
            </h3>) }
        {currRecipe && renderIngredients(Object.entries(currRecipe[LowerType][0]))}
        <p data-testid="instructions">
          { currRecipe[LowerType][0].strInstructions }
        </p>
        { currRecipe[LowerType][0].strYoutube
          && handleYoutube(currRecipe[LowerType][0].strYoutube) }
        {<DetailCards typeOf={ invertedType } />}
      </>
    );
  };
  const startRecipe = () => {
    const LowerType = currRecipe.drinks ? 'drinks' : 'meals';
    const ingredientsList = formatIngredients(Object.entries(currRecipe[LowerType][0]));
    saveInProgressRecipes(pathArray[1], id, ingredientsList);
    history.push(`/${pathArray[1]}/${id}/in-progress`);
  };

  const renderStartBtn = () => {
    const LowerType = currRecipe.drinks ? 'drinks' : 'meals';
    const upperType = currRecipe.drinks ? 'Drink' : 'Meal';
    const drinkOrMeal = currRecipe.drinks ? 'cocktails' : 'meals';
    const objectId = currRecipe[LowerType][0][`id${upperType}`];
    const existInDone = getDoneRecipes()
      .filter((recipe) => recipe.id === objectId);
    console.log(getInProgressRecipes());
    const existProgress = getInProgressRecipes()[drinkOrMeal][objectId];
    if (existInDone.length === 0) {
      return (
        <button
          type="button"
          className="startBtn"
          data-testid="start-recipe-btn"
          onClick={ (existProgress !== undefined)
            ? () => history.push(`/${pathArray[1]}/${id}/in-progress`)
            : startRecipe }
        >
          {(existProgress !== undefined) ? 'Continue Recipe' : 'Start Recipe' }
        </button>);
    }
  };

  function clipboard() {
    const url = window.location.href.toString();
    copy(url);
    setShowMessage(true);
  }

  // function addFavorite() {
  //   const LowerType = currRecipe.drinks ? 'drink' : 'food';
  //   const favorite = {
  //     id,
  //     type: LowerType,
  //   }
  //   saveFavoriteOrDoneRecipes()
  // }

  return (
    <div>
      RecipesDetails
      <p>{ pathname }</p>
      { showMessage && <p>Link copied!</p> }
      { currRecipe && recipeRender() }

      <input
        type="image"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="button"

      />
      <input
        data-testid="share-btn"
        type="image"
        onClick={ clipboard }
        src={ shareIcon }
        height="80"
        width="50"
        alt="button"
      />
      <br />
      <br />
      { currRecipe && renderStartBtn()}
    </div>
  );
}

export default RecipesDetails;
