import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa a tela de receitas em progresso', () => {
  it('Deve habilitar o botão finalizar - Comida', async ()=> {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52948');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/52948/in-progress');
    })

    await waitFor(() => {
      expect(screen.queryByText(/Wontons/i)).toBeInTheDocument();
    })

    for (let index = 0; index < 11; index++) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }

    expect(screen.getByTestId('finish-recipe-btn')).not.toBeDisabled();
    
    userEvent.click(screen.getByTestId(`0-ingredient-step`));
    expect(screen.queryByTestId('finish-recipe-btn')).toBeDisabled();
  });

  it('Deve habilitar o botão finalizar - Bebidas', async ()=> {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/13332');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/drinks/13332/in-progress');
    })
    
    await waitFor(() => {
      expect(screen.queryByText(/b-53/i)).toBeInTheDocument();
    })
    
    for (let index = 0; index < 3; index++) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }

    expect(screen.getByTestId('finish-recipe-btn')).not.toBeDisabled();
    

    userEvent.click(screen.queryByTestId('finish-recipe-btn'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    })
  });

  it('Deve favoritar', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52844');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/52844/in-progress');
    })
    
    await waitFor(() => {
      expect(screen.queryByTestId('recipe-title')).toBeInTheDocument();
    })

    userEvent.click(screen.queryByTestId('favorite-btn'));

    history.push('/favorite-recipes');

    await waitFor(() => {
      expect(screen.queryByText(/Lasagne/i)).toBeInTheDocument();
    })
  })
});
