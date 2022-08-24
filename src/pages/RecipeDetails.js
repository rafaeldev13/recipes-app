import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DetailCards from '../components/DetailCards';
import { fetchRecipe } from '../services/getAPI';

function RecipesDetails() {
  const [currRecipe, setCurrRecipe] = useState();
  const history = useHistory();

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
    // const getRecomended = async () => {
    //   const currRecomended = await fetchOption(type, 'name', '');
    //   setRenderRecomended(currRecomended);
    // };
    // getRecomended();
  }, []);

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

  // const mapIngMea = (array) => (
  //   array.map((string, index) => (
  //     <p
  //       key={ index }
  //       data-testid={ `${index}-ingredient-name-and-measure` }
  //     >
  //       {string}
  //     </p>))
  // );

  const handleIngMeaDrink = (data) => {
    const filteredIngredients = data.filter((key) => key[0]
      .includes('strIngredient') && key[1] !== (null && ''));
    const ingArray = filteredIngredients.reduce((acc, value) => [...acc, value[1]], []);
    const filteredMeasures = data.filter((key) => key[0]
      .includes('strMeasure') && key[1] !== (null && ' '));
    const meaArray = filteredMeasures.reduce((acc, value) => [...acc, value[1]], []);
    const arrayToMap = ingArray.map((ing, index) => `- ${ing} - ${meaArray[index]}`);

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
        {currRecipe.drinks && handleIngMeaDrink(Object.entries(currRecipe[LowerType][0]))}
        <p data-testid="instructions">
          { currRecipe[LowerType][0].strInstructions }
        </p>
        { currRecipe[LowerType][0].strYoutube
          && handleYoutube(currRecipe[LowerType][0].strYoutube) }
        {<DetailCards typeOf={ invertedType } />}
      </>
    );
  };
  function clipboard() {
    const url = window.location.href.toString();
    navigator.clipboard.writeText(url);
    global.alert('Link copied');
  }

  return (
    <div>
      RecipesDetails
      <p>{ pathname }</p>
      { currRecipe && recipeRender() }
      {/* <button
        type="button"
      >
        Favoritar
      </button> */}
      <div
        style={ {
          margin: 'auto',
          display: 'block',
          width: 'fit-content',
        } }
      >
        <FormControlLabel
          data-testid="favorite-btn"
          control={ <Checkbox
            icon={ <FavoriteBorder /> }
            checkedIcon={ <Favorite /> }
            name="checkedH"
          /> }
          label="Favoritar"
        />
      </div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ clipboard }
        value="Exibir Alert"
      >
        <img
          src="src/images/shareIcon.svg"
          height="80"
          width="100"
          alt="button"
        />
        Compartilhar
      </button>
    </div>
  );
}

export default RecipesDetails;
