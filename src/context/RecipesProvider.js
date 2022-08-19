import React, { createContext } from 'react';
import propTypes from 'prop-types';

export const recipeContext = createContext();

function RecipesProvider({ children }) {
  const value = {

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
