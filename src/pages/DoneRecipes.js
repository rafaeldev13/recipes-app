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
  const [saveId, setSaveId] = useState('');
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
    setSaveId(recipe.id);
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
        {recipesFilter.map((recipe, recipeIndex) => (
          <article key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width="300px"
                data-testid={ `${recipeIndex}-horizontal-image` }
              />
              <h2 data-testid={ `${recipeIndex}-horizontal-name` }>{recipe.name}</h2>
            </Link>
            <div data-testid={ `${recipeIndex}-horizontal-top-text` }>
              { recipe.type === 'food'
                ? (
                  <p>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                )
                : (
                  <>
                    <p>{ recipe.category }</p>
                    <p>{recipe.alcoholicOrNot}</p>
                  </>)}
            </div>
            <p data-testid={ `${recipeIndex}-horizontal-done-date` }>
              {`Done in: ${recipe.doneDate}`}
            </p>
            <p>
              { recipe.tags.map((tagName) => (
                <span
                  key={ tagName }
                  data-testid={ `${recipeIndex}-${tagName}-horizontal-tag` }
                >
                  { ` #${tagName} ` }
                </span>
              ))}
            </p>
            <button type="button" onClick={ () => clipboard(recipe) }>
              <img
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${recipeIndex}-horizontal-share-btn` }
              />
            </button>
            { showMessage && saveId === recipe.id ? <span>Link copied!</span> : ''}
          </article>)) }
      </main>
    </div>
  );
}

export default DoneRecipes;
