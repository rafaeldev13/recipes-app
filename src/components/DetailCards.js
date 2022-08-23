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

  useEffect(() => {
    const getRecomended = async () => {
      const currRecomended = await fetchOption(typeOf, 'name', '');
      setRecomended(currRecomended);
    };
    getRecomended();
  }, []);

  const handleRedirect = ({ target }) => {
    const typeTwo = recomended.drinks ? 'drinks' : 'foods';
    history.push(`/${typeTwo}/${target.id}`);
  };

  const recomendedRenderer = (data) => {
    const type = data.drinks ? 'drinks' : 'meals';
    const newArray = data[type].slice(0, SIX);
    const result = newArray.map((recipe, index) => {
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
          data-testid={ `${index}-recomendation-card` }
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
          <p id={ id } data-testid={ `${index}-recomendation-title` }>{ `${name}` }</p>
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
