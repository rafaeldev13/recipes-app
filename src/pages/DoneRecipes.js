import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  const [recipesFilter, setRecipesFilter] = useState(getFavoriteOrDoneRecipes(true));
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const filteredRecipes = getFavoriteOrDoneRecipes(true)
      .filter((recipe) => recipe.type.includes(filter));
    setRecipesFilter(filteredRecipes);
  }, [filter]);

  useEffect(() => {
    const messageDuration = 200000;
    setTimeout(() => { setShowMessage(false); }, messageDuration);
  }, [showMessage]);

  function clipboard(recipe) {
    const type = recipe.type === 'food' ? 'foods' : 'drinks';
    copy(`http://localhost:3000/${type}/${recipe.id}`);
    setShowMessage(true);
  }

  return (
    <div className="done-container">
      <Header title="Done Recipes" hideSearchIcon />
      <nav>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </nav>
      { showMessage && <p>Link copied!</p> }
      <main>
        {recipesFilter.map((data, dataIndex) => (
          <article key={ data.id }>
            <img
              src={ data.image }
              alt={ data.name }
              width="300px"
              data-testid={ `${dataIndex}-horizontal-image` }
            />
            <h2 data-testid={ `${dataIndex}-horizontal-name` }>{data.name}</h2>
            <p data-testid={ `${dataIndex}-horizontal-top-text` }>
              {`${data.nationality} - ${data.category}`}
            </p>
            {data.alcoholicOrNot && <p>{data.alcoholicOrNot}</p>}
            <p data-testid={ `${dataIndex}-horizontal-done-date` }>
              {`Done date: ${data.doneDate}`}
            </p>
            <button type="button" onClick={ () => clipboard(data) }>
              <img
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${dataIndex}-horizontal-share-btn` }
              />
            </button>
            <p>
              { data.tags.map((tagName) => (
                <span
                  key={ tagName }
                  data-testid={ `${dataIndex}-${tagName}-horizontal-tag` }
                >
                  { ` #${tagName} ` }
                </span>
              ))}
            </p>
          </article>)) }
      </main>
    </div>
  );
}

export default DoneRecipes;
