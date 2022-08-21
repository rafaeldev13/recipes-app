import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { recipeContext } from '../context/RecipesProvider';
import { fetchIngredient, fetchOption } from '../services/getAPI';

function SearchBar() {
  const [option, setOption] = useState('');
  const [toSearch, setToSearch] = useState('');

  const { currType, setCurrRecipes } = useContext(recipeContext);

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

  const handleSearch = async () => {
    let returned = {};
    if (option === 'ingredient') {
      const result = await fetchIngredient(currType, option, toSearch);
      console.log(result);
      setCurrRecipes(result);
      returned = result;
    } else {
      const result = await fetchOption(currType, option, toSearch);
      console.log(result);
      returned = result;
      setCurrRecipes(result);
    }
    const type = returned.meals ? 'meals' : 'drinks';
    const typeTwo = returned.drinks ? 'drinks' : 'foods';
    if (returned[type].length === 1) {
      const typeId = returned.drinks
        ? returned.drinks[0].idDrink
        : returned.meals[0].idMeal;
      history.push(`/${typeTwo}/${typeId}`);
    }
  };

  return (
    <fieldset>
      <legend>Opções de busca</legend>
      <label htmlFor="searchInput">
        <input
          id="searchInput"
          data-testid="search-input"
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
  );
}

export default SearchBar;
