import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipe } from '../services/getAPI';

function RecipesDetails() {
  const [currRecipe, setCurrRecipe] = useState();
  const history = useHistory();

  const { pathname } = history.location;
  const pathArray = pathname.split('/');
  const type = pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1);
  const id = pathArray[2];

  useEffect(() => {
    const getInfo = async () => {
      const result = await fetchRecipe(type, id);
      console.log(result);
      setCurrRecipe(result);
    };
    getInfo();
  }, []);

  const handleYoutube = (url) => {
    const newUrl = url.includes('watch') ? url.replace('watch?v=', 'embed/') : url;

    return (
      <div className="video-responsive"/* css in App.css */>
        <iframe
          width="80%"
          src={ newUrl }
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    );
  };

  const recipeRender = () => {
    const LowerType = currRecipe.drinks ? 'drinks' : 'meals';
    const upperType = currRecipe.drinks ? 'Drink' : 'Meal';
    const ingMeaArray = undefined;
    console.log(ingMeaArray);
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
        <h3 data-testid="recipe-category">
          { currRecipe[LowerType][0].strCategory }
        </h3>
        <ul>
          {}
        </ul>
        <p data-testid="instructions">
          { currRecipe[LowerType][0].strInstructions }
        </p>
        { currRecipe[LowerType][0].strYoutube
          && handleYoutube(currRecipe[LowerType][0].strYoutube) }
      </>
    );
  };

  return (
    <div>
      RecipesDetails
      <p>{ pathname }</p>
      { currRecipe && recipeRender() }
    </div>
  );
}

export default RecipesDetails;
