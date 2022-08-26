import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const localStorageMock = [
  {
    "id": "52977",
    "type": "food",
    "nationality": "Turkish",
    "category": "Side",
    "alcoholicOrNot": "",
    "name": "Corba",
    "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
  },
  {
    "id": "178319",
    "type": "drink",
    "nationality": "",
    "category": "Cocktail",
    "alcoholicOrNot": "Alcoholic",
    "name": "Aquamarine",
    "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
  },
];

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});


describe('Testa a página de favoritos', () => {
  it('Deve mostrar o resultado apropriado ao clicar nos filtros', async () => {
    const {history} = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    history.push('/favorite-recipes');
    await waitFor(() => {
      expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: /food/i }));
    expect(screen.getByRole('link', { name: /corba/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /aquamarine/i })).not.toBeInTheDocument();


    userEvent.click(screen.getByRole('button', { name: /drinks/i }));
    expect(screen.getByRole('link', { name: /aquamarine/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /corba/i })).not.toBeInTheDocument();


    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByRole('link', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /aquamarine/i })).toBeInTheDocument();
  });

  it('Deve redirecionar para a página de detalhes da receita', async () => {
    const {history} = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    history.push('/favorite-recipes');
    await waitFor(() => {
      expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: /corba/i }));
    expect(history.location.pathname).toBe('/foods/52977');

    history.push('/favorite-recipes');

    userEvent.click(screen.getByRole('button', { name: /aquamarine/i }));
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Deve remover dos favoritos', async () => {
    const {history} = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    history.push('/favorite-recipes');
    await waitFor(() => {
      expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(screen.queryByRole('link', { name: /corba/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /aquamarine/i })).toBeInTheDocument();
  });

  it('Testa o botão de compartilhar', async () => {
    const {history} = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    jest.spyOn(navigator.clipboard, "writeText");

    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    history.push('/favorite-recipes');
    await waitFor(() => {
      expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    });
    
    userEvent.click(screen.getAllByRole('button', { name: /share icon/i })[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/foods/52977");

    userEvent.click(screen.getAllByRole('button', { name: /share icon/i })[1]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/drinks/178319");
  });
});