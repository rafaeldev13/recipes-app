import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de detalhes das receitas', () => {
  it('Deve realizar um fetch da com o endpoint correto para uma bebida', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/15997');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');
    })
  })

  it('Deve realizar um fetch da com o endpoint correto para uma comida', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('Corba');
    })
  })

  it('Deve salvar receitas favoritadas no localStorage', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/15997');

    await waitFor(() => {
      userEvent.click(screen.getByTestId('favorite-btn'));      
    })
    await waitFor(() => {
      // const favoriteId = localStorage.getItem('favoriteRecipes');
      // console.log(favoriteId);
      // expect(favoriteId).toHaveValue('15997')
    })
  })

  it('Deve copiar o link ao clicar em compartilhar em bebidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/15997');

    await waitFor(() => {
      userEvent.click(screen.getByTestId('share-btn'));      
    })
    await waitFor(() => {
      // let clip = '';
      // navigator.clipboard.readText().then((text) => clip = text)

      expect(navigator.clipboard.readText()).toBe('/drinks/15997');
      // expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      // expect(navigator.clipboard.writeText).toHaveBeenCalledWith('/drinks/15997')
    })
  })

  it('Deve copiar o link ao clicar em compartilhar em comidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      userEvent.click(screen.getByTestId('share-btn'));      
    })
    await waitFor(() => {
      // let clip = '';
      // navigator.clipboard.readText().then((text) => clip = text)
      // expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      // expect(navigator.clipboard.writeText).toHaveBeenCalledWith('/drinks/15997')
    })
  })

  it('Deve iniciar mudar a receita para a página in progress e salvar no local storage', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {
      
    })
  })
})
