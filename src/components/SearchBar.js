import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import handleCards from '../helpers/searchBarHelp';
import { fetchIngredient, fetchOption } from '../services/getAPI';

function SearchBar() {
  const [option, setOption] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [recipes, setRecipes] = useState({ meals: [] });

  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.type === 'radio') {
      setOption(target.id);
      if (target.id === 'firstLetter') {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    if (target.id === 'searchInput') {
      setToSearch(target.value);
    }
  };

  useEffect(() => {
    const manageRecipes = (array) => {
      const type = array.drinks ? 'drinks' : 'meals';
      console.log(array[type]);
      if (array[type].length === 1) {
        const typeId = array.drinks
          ? array.drinks[0].idDrink
          : array.meals[0].idMeal;
        history.push(`/${type}/${typeId}`);
      }
    };
    manageRecipes(recipes);
  }, [recipes]);

  const handleSearch = async () => {
    if (option === 'ingredient') {
      const result = await fetchIngredient('food', toSearch);
      console.log(result);
      setRecipes(result);
    } else {
      const result = await fetchOption('food', option, toSearch);
      console.log(result);
      setRecipes(result);
    }
  };

  return (
    <div>

      <fieldset>
        <legend>Opções de busca</legend>
        <label htmlFor="searchInput">
          <input
            id="searchInput"
            data-testid=""
            placeholder="Search Recipe"
            value={ toSearch }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="ingredient">
          Ingrediente
          <input
            type="radio"
            name="searchType"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            name="searchType"
            id="name"
            data-testid="name-search-radio"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="firstLetter">
          1ª letra
          <input
            type="radio"
            name="searchType"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            onClick={ handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Buscar
        </button>
      </fieldset>
      <div>
        { (Object.keys(recipes)[0].length > 1)
          && handleCards(recipes) }
      </div>
    </div>
  );
}

export default SearchBar;
