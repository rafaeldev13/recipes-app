import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { SIX } from '../helpers/magicNumbers';
import { fetchOption } from '../services/getAPI';
import 'react-multi-carousel/lib/styles.css';

function DetailCards({ typeOf }) {
  const history = useHistory();
  const [recomended, setRecomended] = useState(undefined);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      const getRecomended = async () => {
        const currRecomended = await fetchOption(typeOf, 'name', '');
        setRecomended(currRecomended);
      };
      getRecomended();
    }
    return () => setIsMounted(false);
  }, []);

  const handleRedirect = ({ target }) => {
    const typeTwo = recomended.drinks ? 'drinks' : 'foods';
    history.push(`/${typeTwo}/${target.id}`);
  };

  const recomendedRenderer = (data) => {
    const type = data.drinks ? 'drinks' : 'meals';
    const newArray = data[type].slice(0, SIX);
    const result = newArray.map((recipe, index) => {
      const recipeData = recipe.idDrink ? (
        {
          id: recipe.idDrink,
          image: recipe.strDrinkThumb,
          name: recipe.strDrink,
        }
      ) : (
        {
          id: recipe.idMeal,
          image: recipe.strMealThumb,
          name: recipe.strMeal,
        }
      );
      return (
        <div
          key={ recipeData.id }
          id={ recipeData.id }
          role="button"
          tabIndex={ recipeData.id }
          data-testid={ `${index}-recomendation-card` }
          onClick={ handleRedirect }
          onKeyDown={ handleRedirect }
        >
          <img
            src={ recipeData.image }
            alt={ recipeData.name }
            id={ recipeData.id }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <p
            id={ recipeData.id }
            data-testid={ `${index}-recomendation-title` }
          >
            { `${recipeData.name}` }
          </p>
        </div>
      );
    });
    return result;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel responsive={ responsive }>
      { (recomended === undefined) ? <p>loading</p> : recomendedRenderer(recomended) }
    </Carousel>
  );
}

DetailCards.propTypes = {
  typeOf: propTypes.string,
};

DetailCards.defaultProps = {
  typeOf: '',
};

export default DetailCards;
