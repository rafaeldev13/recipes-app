import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

export const recipeContext = createContext();

function RecipesProvider({ children }) {
  const binary = Number(localStorage.getItem('refreshComponent')) === 0;
  const [currType, setCurrType] = useState('Foods');
  const [refreshComponent, setRefreshComponent] = useState(!binary);
  const [currRecipes, setCurrRecipes] = useState({ meals: [] });
  const value = {
    refreshComponent,
    setRefreshComponent,
    currType,
    setCurrType,
    currRecipes,
    setCurrRecipes,
  };

  return (
    <recipeContext.Provider value={ value }>
      {children}
    </recipeContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RecipesProvider;
