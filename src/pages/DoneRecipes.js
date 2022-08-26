import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getFavoriteOrDoneRecipes } from '../helpers/handleLocalStorage';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

/* const mockData = [{
  id: '52771',
  type: 'food',
  nationality: 'French',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Brie wrapped in prosciutto & brioche',
  image: 'https://www.themealdb.com/images/media/meals/qqpwsy1511796276.jpg',
  doneDate: '20/08/2022',
  tags: ['SideDish', 'Treat', 'Baking'],
},
{
  id: '3200',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'Owen\'s Grandmother\'s Revenge',
  image: 'https://www.thecocktaildb.com/images/media/drink/0wt4uo1503565321.jpg',
  doneDate: '20/08/2022',
  tags: [],
}];
localStorage.setItem('doneRecipes', JSON.stringify(mockData)); */

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  const [recipesFilter, setRecipesFilter] = useState(getFavoriteOrDoneRecipes(true));
  const [recipeId, setRecipeId] = useState('');
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
    setRecipeId(recipe.id);
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
      <main>
        {recipesFilter.map((data, dataIndex) => (
          <article key={ data.id }>
            <Link to={ `/${data.type}s/${data.id}` }>
              <img
                src={ data.image }
                alt={ data.name }
                width="300px"
                data-testid={ `${dataIndex}-horizontal-image` }
              />
              <h2 data-testid={ `${dataIndex}-horizontal-name` }>{data.name}</h2>
            </Link>
            <div data-testid={ `${dataIndex}-horizontal-top-text` }>
              { data.type === 'food'
                ? (
                  <p>
                    { `${data.nationality} - ${data.category}` }
                  </p>
                )
                : (
                  <>
                    <p>{ data.category }</p>
                    <p>{data.alcoholicOrNot}</p>
                  </>)}
            </div>
            <p data-testid={ `${dataIndex}-horizontal-done-date` }>
              {`Done in: ${data.doneDate}`}
            </p>
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
            <button type="button" onClick={ () => clipboard(data) }>
              <img
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${dataIndex}-horizontal-share-btn` }
              />
            </button>
            { showMessage && recipeId === data.id ? <span>Link copied!</span> : ''}
          </article>)) }
      </main>
    </div>
  );
}

export default DoneRecipes;
