import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

export const recipeContext = createContext();

function RecipesProvider({ children }) {
  const [currType, setCurrType] = useState('Foods');
  const [currRecipes, setCurrRecipes] = useState({ meals: [] });
  const value = {
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
